"use client";

import { motion } from "framer-motion";
import styles from "../../styles";
import Navbar from "../../components/Navbar";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#13151a] to-[#090a0f]">
      <Navbar />
      <div className={`${styles.paddings} container mx-auto pt-8`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-md bg-[#1A232E]/30 p-6 md:p-8 rounded-xl border border-[#ffffff0f] shadow-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Learn More About PathFinder
          </h1>
          <div className="text-gray-300 text-lg max-w-2xl mx-auto space-y-6">
            <p>
              <span className="font-semibold text-white">PathFinder</span> is an AI-powered job recommendation platform that analyzes your social media activity (such as LinkedIn exports) to match you with the most relevant job opportunities. Our system uses advanced natural language processing and semantic similarity techniques to understand your skills, experience, and career goals.
            </p>
            <p>
              <span className="font-semibold text-white">How It Works:</span><br />
              1. Upload your social media profile (PDF format).<br />
              2. Our backend extracts and encodes your profile using pre-trained sentence embeddings.<br />
              3. We compare your profile against thousands of job descriptions using semantic similarity.<br />
              4. You receive the top 5 job recommendations, plus live job listings for your best match.
            </p>
            <p>
              <span className="font-semibold text-white">Live Job Listings:</span><br />
              For your top recommended job, we fetch real-time job listings from Indeed using the Apify API, so you can apply directly to current openings.
            </p>
            <p>
              <span className="font-semibold text-white">Tech Stack:</span><br />
              Next.js, React, Tailwind CSS, FastAPI, Python, Sentence Transformers, Apify API.
            </p>
            <p>
              <span className="font-semibold text-white">Privacy:</span><br />
              Your uploaded data is processed securely and only used for generating recommendations. We do not store your personal information.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
