"use client";

import { motion } from "framer-motion";
import styles from "../../styles";
import Navbar from "../../components/Navbar";

const InfoSection = ({ title, children, delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="mb-12"
  >
    <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
      {title}
    </h2>
    <div className="text-gray-300 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.section>
);

const CodeBlock = ({ children }) => (
  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
    {children}
  </div>
);

const ProcessStep = ({ step, title, description }) => (
  <div className="flex gap-4 mb-6">
    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
      {step}
    </div>
    <div>
      <h4 className="font-medium text-white mb-2">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#13151a] to-[#090a0f]">
      <Navbar />
      
      <div className={`${styles.paddings} container mx-auto pt-8`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Page Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              About PathFinder
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              PathFinder is an AI-powered job recommendation system that analyzes your professional profile 
              to match you with relevant job opportunities using advanced natural language processing techniques.
            </p>
          </motion.div>

          <div className="backdrop-blur-md bg-[#1A232E]/30 p-8 rounded-xl border border-[#ffffff0f] shadow-xl">
            
            {/* Overview */}
            <InfoSection title="Overview" delay={0.1}>
              <p>
                PathFinder leverages machine learning and semantic similarity algorithms to understand your 
                professional background and preferences. By analyzing your uploaded profile (such as LinkedIn exports), 
                the system extracts key information about your skills, experience, and career trajectory to 
                provide personalized job recommendations.
              </p>
            </InfoSection>

            {/* How It Works */}
            <InfoSection title="How It Works" delay={0.2}>
              <p className="mb-6">
                The recommendation process follows these steps:
              </p>
              
              <ProcessStep 
                step="1"
                title="Profile Upload & Parsing"
                description="Upload your professional profile in PDF format. The system extracts text content and parses relevant information such as work experience, skills, education, and career objectives."
              />
              
              <ProcessStep 
                step="2"
                title="Text Embedding Generation"
                description="Using pre-trained sentence transformer models, your profile text is converted into high-dimensional numerical representations (embeddings) that capture semantic meaning."
              />
              
              <ProcessStep 
                step="3"
                title="Similarity Computation"
                description="Your profile embeddings are compared against a database of job descriptions using cosine similarity. This identifies jobs that best match your background and preferences."
              />
              
              <ProcessStep 
                step="4"
                title="Results & Live Listings"
                description="The top 5 most similar job matches are returned. For the best match, real-time job listings are fetched from Indeed using the Apify API for immediate application opportunities."
              />
            </InfoSection>

            {/* Technical Implementation */}
            <InfoSection title="Technical Implementation" delay={0.3}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Backend Architecture</h4>
                  <ul className="text-gray-400 text-sm space-y-1 ml-4">
                    <li>• FastAPI server for handling requests and file processing</li>
                    <li>• PDF text extraction using PyPDF2 or similar libraries</li>
                    <li>• Sentence-BERT models for generating text embeddings</li>
                    <li>• Cosine similarity calculation for job matching</li>
                    <li>• Apify API integration for real-time job scraping</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Frontend Components</h4>
                  <ul className="text-gray-400 text-sm space-y-1 ml-4">
                    <li>• Next.js application with React components</li>
                    <li>• File upload interface with drag-and-drop support</li>
                    <li>• Results visualization and job listing display</li>
                    <li>• Responsive design with Tailwind CSS</li>
                    <li>• Smooth animations using Framer Motion</li>
                  </ul>
                </div>
              </div>
            </InfoSection>

            {/* Machine Learning Details */}
            <InfoSection title="Machine Learning Details" delay={0.4}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Embedding Model</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    PathFinder uses pre-trained sentence transformer models to convert text into embeddings:
                  </p>
                  <CodeBlock>
                    from sentence_transformers import SentenceTransformer<br/>
                    model = SentenceTransformer('all-MiniLM-L6-v2')<br/>
                    embeddings = model.encode(profile_text)
                  </CodeBlock>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Similarity Calculation</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Cosine similarity measures how similar two vectors are, regardless of their magnitude:
                  </p>
                  <CodeBlock>
                    from sklearn.metrics.pairwise import cosine_similarity<br/>
                    similarities = cosine_similarity([profile_embedding], job_embeddings)<br/>
                    top_matches = similarities.argsort()[-5:][::-1]
                  </CodeBlock>
                </div>
              </div>
            </InfoSection>

            {/* Data Privacy */}
            <InfoSection title="Data Privacy & Security" delay={0.5}>
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2">🔒 Privacy Protection</h4>
                <ul className="text-green-200/80 text-sm space-y-1">
                  <li>• Uploaded files are processed in memory and not permanently stored</li>
                  <li>• No personal information is retained after processing</li>
                  <li>• All data processing occurs server-side with secure connections</li>
                  <li>• No tracking or analytics on uploaded content</li>
                  <li>• Temporary files are automatically cleaned up after processing</li>
                </ul>
              </div>
            </InfoSection>

            {/* Technology Stack */}
            <InfoSection title="Technology Stack" delay={0.6}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Frontend</h4>
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-700/50 rounded text-sm">Next.js</span>
                    <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-700/50 rounded text-sm ml-2">React</span>
                    <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-700/50 rounded text-sm">Tailwind CSS</span>
                    <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-700/50 rounded text-sm ml-2">Framer Motion</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3">Backend</h4>
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded text-sm">FastAPI</span>
                    <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded text-sm ml-2">Python</span>
                    <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded text-sm">Sentence Transformers</span>
                    <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 border border-purple-700/50 rounded text-sm ml-2">Apify API</span>
                  </div>
                </div>
              </div>
            </InfoSection>

            {/* Supported Formats */}
            <InfoSection title="Supported File Formats" delay={0.7}>
              <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Accepted Input Formats</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• <strong>PDF files:</strong> LinkedIn profile exports, resumes, CVs</li>
                  <li>• <strong>File size limit:</strong> Maximum 10MB per file</li>
                  <li>• <strong>Content requirements:</strong> Text-based PDFs (not image-only)</li>
                  <li>• <strong>Language support:</strong> English language profiles recommended</li>
                </ul>
              </div>
            </InfoSection>

            {/* Limitations */}
            <InfoSection title="Current Limitations" delay={0.8}>
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-300 mb-2">⚠️ Known Limitations</h4>
                <ul className="text-yellow-200/80 text-sm space-y-1">
                  <li>• Job database is pre-loaded and may not include the most recent postings</li>
                  <li>• Matching accuracy depends on profile completeness and clarity</li>
                  <li>• Real-time job listings are limited to Indeed search results</li>
                  <li>• Processing time varies based on profile length and complexity</li>
                  <li>• Best results achieved with detailed, well-structured profiles</li>
                </ul>
              </div>
            </InfoSection>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
