from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

import fitz  # PyMuPDF
import pandas as pd
import numpy as np
import uvicorn
import io
import os
from apify_client import ApifyClient
from dotenv import load_dotenv


load_dotenv()
APIFY_API_TOKEN = os.getenv("APIFY_API_TOKEN")
apify_client = ApifyClient(APIFY_API_TOKEN) if APIFY_API_TOKEN else None
app = FastAPI()

# CORS if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and embeddings once on startup
model = SentenceTransformer('all-MiniLM-L6-v2')

# Get the absolute path to the current file's directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Build absolute paths to the model files
embeddings_path = os.path.join(BASE_DIR, "model", "job_embeddings.npy")
data_path = os.path.join(BASE_DIR, "model", "job_data.csv")

# Load files
job_embeddings = np.load(embeddings_path)
job_data = pd.read_csv(data_path)

@app.post("/recommend")
async def recommend(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return {"error": "Please upload a PDF file."}

    # Read PDF content from the uploaded file
    contents = await file.read()
    pdf = fitz.open("pdf", contents)

    user_profile = ""
    for page in pdf:
        user_profile += page.get_text()

    # Clean the text
    user_profile = user_profile.strip().replace("\n", " ")

    # Generate embedding for user profile
    user_embedding = model.encode(user_profile, convert_to_tensor=False)

    # Calculate cosine similarity
    similarities = cosine_similarity([user_embedding], job_embeddings)[0]
    top_indices = similarities.argsort()[::-1]  # Sorted all



    seen_titles = set()
    recommendations = []
    top_title = None
    top_recommendation = None

    for i in top_indices:
        title = job_data["title"][i]
        if title not in seen_titles:
            seen_titles.add(title)
            if not top_title:
                top_title = title
                top_recommendation = {
                    "title": title,
                    "match_score": round(float(similarities[i]), 4)
                }
            recommendations.append({
                "title": title,
                "match_score": round(float(similarities[i]), 4)
            })
        if len(recommendations) >= 5:
            break

    return {
        "top_recommendation": top_recommendation,
        "recommendations": recommendations[1:5]  # next 4
    }


@app.get("/live_jobs")
async def live_jobs(position: str):
    job_details = []
    if apify_client and position:
        try:
            run_input = {
                "position": position,
                "maxItems": 5,
                "parseCompanyDetails": False,
                "saveOnlyUniqueItems": True,
                "followApplyRedirects": False,
            }
            run = apify_client.actor("hMvNSpz3JnHgl5jkh").call(run_input=run_input)
            for item in apify_client.dataset(run["defaultDatasetId"]).iterate_items():
                job_details.append(item)
        except Exception as e:
            job_details = [{"error": str(e)}]
    return {"jobs": job_details}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
