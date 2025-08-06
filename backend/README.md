# PathFinder Backend

This is the FastAPI backend for **PathFinder**, a job recommendation system based on user-uploaded social media activity downloaded/printed documents (PDFs) and semantic similarity using pre-trained sentence embeddings.


## Features

- Upload a user profile (PDF)
- Automatically extract text from the PDF
- Encode user input with Sentence Transformers
- Compare with precomputed job embeddings
- Return top 5 job recommendations with similarity scores
- Fetch live job details for the top recommendation using Apify API



## 📁 Project Structure

```yaml
.
├── model/
│   ├── job_data.csv     # Job metadata
│   └── job_embeddings.npy  # Precomputed job description embeddings
├── main.py              # Main FastAPI app
├── requirements.txt
├── .env                # API keys (not committed)
└── README.md
```



## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AchiraNadeeshan/social-activity-job-matcher.git
cd social-activity-job-matcher/backend
```

### 2. Install dependencies

It is recommended to use a virtual environment.

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows PowerShell:
.\venv\Scripts\Activate.ps1
# For Windows Command Prompt (cmd.exe):
.\venv\Scripts\activate.bat
# For Unix/Linux/MacOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Add your Apify API key

Create a `.env` file in the backend directory:

```
APIFY_API_TOKEN=your_apify_api_key_here
```

**Do not commit `.env` to version control.**

### 4. Run the API

```bash
uvicorn main:app --reload
```

The API will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)



## Test the API

You can test the endpoint using the built-in Swagger UI:

> Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)


Upload a PDF containing social media activity (e.g., exported LinkedIn data) to `/recommend` endpoint and receive a JSON response with:

- `top_recommendation`: Best matched job
- `recommendations`: Next 4 matched jobs

To fetch live job listings for the top recommendation, call the `/live_jobs?position=<job_title>` endpoint. This allows the frontend to display model predictions immediately and load live job data asynchronously.



## Requirements

Dependencies are managed in `requirements.txt`. Key packages include:

- `fastapi`
- `uvicorn`
- `sentence-transformers`
- `scikit-learn`
- `pymupdf`
- `pandas`
- `numpy`
- `apify-client`
- `python-dotenv`



## Notes

- The sentence-transformers model (`all-MiniLM-L6-v2`) is downloaded during first run. If hosting, consider pre-downloading or caching this to reduce cold start time.
- Only `.pdf` files are accepted for profile input.
- `.env` file is required for Apify API integration and should not be committed.



## Model Info

* Embedding model: `sentence-transformers/all-MiniLM-L6-v2`
* Similarity metric: Cosine Similarity
* Job titles are filtered to ensure uniqueness in the top recommendations.
* Top job recommendation includes live job data fetched from Apify.



## Contact

For issues or contributions, contact [Achira Nadeeshan](mailto:hrachiranadeeshan@gmail.com) or open an issue on GitHub.