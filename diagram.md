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
    end

    subgraph Frontend[Next.js Frontend]
        K[User Uploads PDF]
        K --> L[Send to Backend API]
        L --> E
        J --> M[Display Recommendations]
    end

    %% Communication
    K -.->|HTTP POST /recommend| E
    J -.->|JSON Response| M

    %% Data Flow
    D -.->|Load on Startup| H
```

**Legend:**
- **Model Training:** Data preparation and embedding generation.
- **Backend:** Handles PDF upload, text extraction, encoding, similarity computation, and response.
- **Frontend:** User interface for upload and displaying recommendations.
- **Dashed arrows** represent communication between components.

---

This diagram provides a clear overview of how data and requests flow through the PathFinder system, from initial model training to user interaction and job recommendation delivery.
