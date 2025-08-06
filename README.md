# PathFinder: Social Activity Job Matcher

PathFinder is a job recommendation web application that allows users to upload their social media activity documents (such as LinkedIn data exports in PDF format) and receive personalized job suggestions. The system leverages modern web technologies and natural language processing to match user profiles to relevant job roles using semantic similarity.



## Tech Stack

| Layer      | Technology                |
|------------|---------------------------|
| Frontend   | Next.js, React, Tailwind CSS, Axios |
| Backend    | FastAPI, Python           |
| NLP Model  | Sentence Transformers (`all-MiniLM-L6-v2`) |
| Data       | Pandas, Numpy, scikit-learn |
| PDF Parsing| PyMuPDF                   |




## Features

- Upload social media activity documents (PDF)
- Automatic text extraction and encoding
- Semantic similarity matching with precomputed job embeddings
- Top 5 job recommendations with similarity scores
- Responsive, modern UI
- Fetch live job details for the top recommendation using Apify API



## Setup Instructions


### Backend

1. **Clone the repository**
   ```bash
   git clone https://github.com/AchiraNadeeshan/social-activity-job-matcher.git
   cd social-activity-job-matcher/backend
   ```
2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1   # PowerShell
   # or
   .\venv\Scripts\activate.bat   # CMD
   # or
   source venv/bin/activate       # Unix/MacOS
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
4. **Add your Apify API key**
   Create a `.env` file in the backend directory:
   ```
   APIFY_API_TOKEN=your_apify_api_key_here
   ```
   **Do not commit `.env` to version control.**
5. **Run the API**
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000)


### Frontend

1. **Install dependencies**
   ```bash
   cd ../frontend
   npm install
   # or
   yarn install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

### Recommendation Display Structure

- The top recommendation is displayed separately with live job details fetched from Apify.
- The next 4 recommendations are shown in a 2x2 grid below the top result.




## Model Explanation

- **Embedding Model:** `sentence-transformers/all-MiniLM-L6-v2`
- **Similarity Metric:** Cosine Similarity
- **Process:**
  - User PDF is parsed and text extracted
  - Text is encoded into embeddings
  - Compared against precomputed job role embeddings
  - Top 5 jobs returned based on semantic similarity
  - Top job recommendation includes live job data fetched from Apify



<!-- ## Team Roles

| Name            | Registration No | Team Role           |
|-----------------|----------------|---------------------|
| Achira Nadeeshan| 20210001       | Team Lead / Backend |
| Nimal Perera    | 20210002       | Frontend Developer  |
| Sahan Fernando  | 20210003       | Data Scientist      |
| Dilani Silva    | 20210004       | UI/UX Designer      |
| Kasun Jayasuriya| 20210005       | DevOps Engineer     |
| Tharindu Wickramasinghe | 20210006 | QA Engineer        |
| Ishara Gunawardena | 20210007    | NLP Engineer        |
| Chamath Weerasinghe | 20210008   | Full Stack Developer|
| Ruwani Abeysekara | 20210009     | Documentation Lead  |
| Malith Senanayake | 20210010     | Research Analyst    | -->



## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](LICENSE). You are free to use, share, and adapt the code for non-commercial purposes with proper attribution.

---

## Contact

For issues or contributions, contact [Achira Nadeeshan](mailto:hrachiranadeeshan@gmail.com) or open an issue on GitHub.
