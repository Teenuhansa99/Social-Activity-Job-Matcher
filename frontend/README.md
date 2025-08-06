
# PathFinder Frontend

PathFinder is a job recommendation web application that enables users to upload their social media activity documents (such as LinkedIn data exports in PDF format) and receive personalized job suggestions. The frontend is built with Next.js, React, and Tailwind CSS, providing a modern, responsive, and user-friendly interface.


## Features

- Upload social media activity documents (PDF)
- Seamless integration with the FastAPI backend
- Displays top 5 job recommendations with similarity scores
- Responsive design for desktop and mobile
- Clear, actionable results based on semantic similarity
- Fetches live job details for the top recommendation from backend API

## Tech Stack

- **Next.js** (React framework)
- **Tailwind CSS** (Styling)
- **Axios** (API requests)
- **FastAPI** (Backend)
- **Sentence Transformers** (NLP model)

## Project Structure

```
frontend/
├── app/
│   ├── layout.js
│   ├── page.jsx
│   └── job-analyzer/
│       └── page.jsx
├── components/
│   └── Navbar.jsx
├── styles/
│   ├── globals.css
│   └── index.js
├── utils/
│   └── motion.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Getting Started

1. **Install dependencies**
   ```bash
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

3. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.


## Usage

- Upload a PDF containing your social media activity (e.g., LinkedIn export)
- View the top recommendation separately with live job details
- View the next 4 recommendations in a 2x2 grid


## Notes

- Only PDF files are accepted for upload
- The backend uses the `all-MiniLM-L6-v2` model for semantic similarity
- The backend integrates with Apify API to fetch live job details for the top recommendation

## Contact

For issues or contributions, contact [Achira Nadeeshan](mailto:hrachiranadeeshan@gmail.com) or open an issue on GitHub.
