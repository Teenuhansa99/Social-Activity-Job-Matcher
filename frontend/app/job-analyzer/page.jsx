'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles';
import Navbar from '../../components/Navbar';

const JobAnalyzer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;
        setAnalyzing(true);
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('http://localhost:8000/recommend', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to analyze resume');

            const data = await response.json();
            setResults(
                data.recommendations.map((job) => ({
                    title: job.title,
                    match: `${Math.round(job.match_score * 100)}%`,
                }))
            );
        } catch (err) {
            console.error(err);
            alert('Failed to analyze resume. Please try again.');
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
                        <label
                            htmlFor="fileInput"
                            className="cursor-pointer bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-white px-6 py-3 rounded-lg inline-block transition-all duration-300 border border-white/10 hover:border-white/20"
                        >
                            Choose File
                        </label>
                        {selectedFile && (
                            <p className="mt-4 text-gray-300 break-all">
                                Selected: {selectedFile.name}
                            </p>
                        )}
                        <button
                            onClick={handleAnalyze}
                            disabled={!selectedFile || analyzing}
                            className={`mt-6 px-6 py-3 rounded-lg w-full md:w-auto ${!selectedFile || analyzing
                                    ? 'bg-white/10 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90'
                                } transition-all duration-300 text-white`}
                        >
                            {analyzing ? 'Analyzing...' : 'Analyze Resume'}
                        </button>
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
                            Upload and analyze your resume to see job recommendations
                        </div>
                    )}
                    {analyzing && (
                        <div className="text-center text-gray-400 py-8">
                            Analyzing your resume...
                        </div>
                    )}
                    {results && (
                        <div className="space-y-4">
                            {results.map((job, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-white/10"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <h3 className="text-lg md:text-xl text-white">{job.title}</h3>
                                        <span className="text-green-400 font-semibold mt-2 sm:mt-0">
                                            {job.match}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default JobAnalyzer;
