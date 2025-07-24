# PathFinder Backend

This is the FastAPI backend for **PathFinder**, a job recommendation system based on user-uploaded social media activity downloaded/printed documents (PDFs) and semantic similarity using pre-trained sentence embeddings.

## Features

- Upload a user profile (PDF)
- Automatically extract text from the PDF
- Encode user input with Sentence Transformers
- Compare with precomputed job embeddings
- Return top 5 job recommendations with similarity scores



## 📁 Project Structure

```yaml
.
├── model/
│   ├── job_data.csv     # Job metadata
│   └── job_embeddings.npy  # Precomputed job description embeddings
├── main.py              # Main FastAPI app
├── requirements.txt
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
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run the API

```bash
uvicorn main:app --reload
```

The API will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)



## Test the API

You can test the endpoint using the built-in Swagger UI:

> Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Upload a PDF containing social media activity (e.g., exported LinkedIn data) to `/recommend` endpoint and receive a JSON response with top 5 matched jobs.



## Requirements

Dependencies are managed in `requirements.txt`. Key packages include:

* `fastapi`
* `uvicorn`
* `sentence-transformers`
* `scikit-learn`
* `pymupdf`
* `pandas`
* `numpy`



## Notes

* The sentence-transformers model (`all-MiniLM-L6-v2`) is downloaded during first run. If hosting, consider pre-downloading or caching this to reduce cold start time.
* Only `.pdf` files are accepted for profile input.



## Model Info

* Embedding model: `sentence-transformers/all-MiniLM-L6-v2`
* Similarity metric: Cosine Similarity
* Job titles are filtered to ensure uniqueness in the top recommendations.



## Contact

For issues or contributions, contact [Achira Nadeeshan](mailto:hrachiranadeeshan@gmail.com) or open an issue on GitHub.