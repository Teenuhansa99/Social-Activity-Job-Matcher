# PathFinder System Architecture

```mermaid
flowchart TD
    subgraph Model_Training[Model Training]
        A[Import Job Data 'CSV'] --> B[Train Sentence Transformer Model]
        B --> C[Generate Job Embeddings 'npy']
        C --> D[Save Embeddings & Metadata]
    end

    subgraph Backend[FastAPI Backend]
        E[Receive PDF Upload]
        E --> F[Extract Text 'PyMuPDF']
        F --> G[Encode User Profile 'Sentence Transformers']
        G --> H[Load Precomputed Job Embeddings]
        H --> I[Compute Cosine Similarity]
        I --> J[Return Top 5 Job Recommendations]
        J --> N[Fetch Live Job Listings 'Apify Indeed Scraper API']
        N --> O[Return Live Job Data for Top Recommendation]
    end

    subgraph Frontend[Next.js Frontend]
        K[User Uploads PDF]
        K --> L[Send to Backend API]
        L --> E
        J --> M[Display Recommendations]
        O --> P[Display Live Job Listings for Top Recommendation]
    end

    %% Communication
    K -.->|HTTP POST /recommend| E
    J -.->|JSON Response| M
    M -.->|HTTP GET /live_jobs?position=...| N
    O -.->|JSON Response| P

    %% Data Flow
    D -.->|Load on Startup| H
```


**Legend:**
- **Model Training:** Data preparation and embedding generation.
- **Backend:** Handles PDF upload, text extraction, encoding, similarity computation, job recommendation, and live job data fetching via Apify API.
- **Frontend:** User interface for upload, displaying recommendations, and asynchronously fetching/displaying live job listings for the top recommendation.
- **Dashed arrows** represent communication between components.

---

This diagram provides a clear overview of how data and requests flow through the PathFinder system, including integration with the Apify Indeed Scraper API for live job listings, from initial model training to user interaction and job recommendation delivery.
