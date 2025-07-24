from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import fitz  # PyMuPDF
import pandas as pd
import numpy as np
import uvicorn
import io

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

job_embeddings = np.load("model/job_embeddings.npy")
job_data = pd.read_csv("model/job_data.csv")


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

    for i in top_indices:
        title = job_data["title"][i]
        if title not in seen_titles:
            seen_titles.add(title)
            recommendations.append({
                "title": title,
                "match_score": round(float(similarities[i]), 4)
            })
        if len(recommendations) >= 5:
            break

    return {"recommendations": recommendations}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
