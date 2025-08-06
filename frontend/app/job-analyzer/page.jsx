"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles";
import Navbar from "../../components/Navbar";

const JobAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [topRecommendation, setTopRecommendation] = useState(null);
  const [topJobDetails, setTopJobDetails] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze");

      const data = await response.json();
      setTopRecommendation({
        title: data.top_recommendation.title,
        match: `${Math.round(data.top_recommendation.match_score * 100)}%`,
      });
      setResults(
        data.recommendations.map((job) => ({
          title: job.title,
          match: `${Math.round(job.match_score * 100)}%`,
        }))
      );
      // Fetch live jobs for top recommendation
      setLoadingJobs(true);
      fetch(
        `http://localhost:8000/live_jobs?position=${encodeURIComponent(
          data.top_recommendation.title
        )}`
      )
        .then((res) => res.json())
        .then((jobsData) => {
          setTopJobDetails(jobsData.jobs || []);
        })
        .catch(() => setTopJobDetails([]))
        .finally(() => setLoadingJobs(false));
    } catch (err) {
      console.error(err);
      alert("Failed to analyze. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#13151a] to-[#090a0f]">
      <Navbar />

      <div className={`${styles.paddings} container mx-auto pt-8`}>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
          Job Analyzer
        </h1>

        {/* --- File Picker on Top --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-md bg-[#1A232E]/30 p-6 md:p-8 rounded-xl border border-[#ffffff0f] shadow-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Upload Profile
          </h2>
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 md:p-8 text-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              accept=".pdf"
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-white px-6 py-3 rounded-lg inline-block transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                Choose File
              </label>
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || analyzing}
                className={`px-6 py-3 rounded-lg w-full md:w-auto ${
                  !selectedFile || analyzing
                    ? "bg-white/10 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                } transition-all duration-300 text-white`}
              >
                {analyzing ? "Analyzing..." : "Analyze Profile"}
              </button>
            </div>
            {selectedFile && (
              <p className="mt-4 text-gray-300 break-all">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
        </motion.div>

        {/* --- Results Below --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-md bg-[#1A232E]/30 p-6 md:p-8 rounded-xl border border-[#ffffff0f] shadow-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5"
        >
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Job Recommendations
          </h2>

          {!results && !analyzing && (
            <div className="text-center text-gray-400 py-8">
              Upload and analyze your profile to see job recommendations
            </div>
          )}
          {analyzing && (
            <div className="text-center text-gray-400 py-8">
              Analyzing your profile...
            </div>
          )}
          {topRecommendation && (
            <div>
              {/* Top Recommendation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-lg border border-white/20 mb-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h3 className="text-2xl md:text-3xl text-white font-bold">
                    {topRecommendation.title}
                  </h3>
                  <span className="text-green-400 font-semibold mt-2 sm:mt-0 text-xl">
                    {topRecommendation.match}
                  </span>
                </div>
              </motion.div>

              {/* Next 4 Recommendations in 2x2 Grid */}
              {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((job, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-white/10"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="text-lg md:text-xl text-white">
                          {job.title}
                        </h3>
                        <span className="text-green-400 font-semibold mt-2 sm:mt-0">
                          {job.match}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Live Job Listings for Top Recommendation */}
              <div className="mt-6">
                <h4 className="text-lg text-white font-semibold mb-2">
                  Live Job Listings for Top Recommendation
                </h4>
                {loadingJobs && (
                  <div className="text-gray-400">Loading job details...</div>
                )}
                {!loadingJobs && topJobDetails.length === 0 && (
                  <div className="text-gray-400">No job details found.</div>
                )}
                <div className="grid gap-4">
                  {topJobDetails.map((job, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg border border-white/10"
                    >
                      {job.error ? (
                        <span className="text-red-400">{job.error}</span>
                      ) : (
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <h3 className="text-xl text-white font-semibold">
                              {job.positionName ||
                                job.title ||
                                job.position ||
                                "No Title"}
                            </h3>
                            <div className="text-gray-300 text-sm mt-2">
                              {job.company || job.companyName || ""}
                            </div>
                            {(job.externalApplyLink || job.url) && (
                              <a
                                href={job.externalApplyLink || job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white rounded-lg transition-all duration-300"
                              >
                                Apply Now
                              </a>
                            )}
                          </div>
                          <div className="w-[300px] grid grid-cols-1 gap-2">
                            <div className="flex items-center">
                              <div className="w-20 text-gray-400">Location:</div>
                              <div className="text-gray-300 flex-1">
                                {job.location || "Not specified"}
                              </div>
                            </div>
                            {job.jobType &&
                              Array.isArray(job.jobType) &&
                              job.jobType.length > 0 && (
                                <div className="flex items-center">
                                  <div className="w-20 text-gray-400">Type:</div>
                                  <div className="text-gray-300 flex-1">
                                    {job.jobType.join(", ")}
                                  </div>
                                </div>
                            )}
                            {job.salary && (
                              <div className="flex items-center">
                                <div className="w-20 text-gray-400">Salary:</div>
                                <div className="text-gray-300 flex-1">
                                  {job.salary}
                                </div>
                              </div>
                            )}
                            {job.rating && (
                              <div className="flex items-center">
                                <div className="w-20 text-gray-400">Rating:</div>
                                <div className="text-gray-300 flex-1">
                                  {job.rating} ({job.reviewsCount} reviews)
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JobAnalyzer;
