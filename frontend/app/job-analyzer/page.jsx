'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles';
import Navbar from '../../components/Navbar';

const JobAnalyzer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setAnalyzing(true);
        // TODO: Replace with actual API call
        // This is a mock response for demonstration
        setTimeout(() => {
            setResults([
                { title: 'Software Engineer', match: '95%' },
                { title: 'Full Stack Developer', match: '90%' },
                { title: 'Frontend Developer', match: '85%' },
            ]);
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#13151a] to-[#090a0f]">
            <Navbar />
            <div className={`${styles.paddings} container mx-auto pt-8`}>
                <h1 className="text-4xl font-bold text-white mb-8">Job Analyzer</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="backdrop-blur-md bg-[#1A232E]/30 p-8 rounded-xl border border-[#ffffff0f] shadow-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5"
                    >
                        <h2 className="text-2xl font-semibold text-white mb-6">Upload Profile</h2>
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="fileInput"
                                accept=".pdf,.doc,.docx"
                            />
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-white px-6 py-3 rounded-lg inline-block transition-all duration-300 border border-white/10 hover:border-white/20"
                            >
                                Choose File
                            </label>
                            {selectedFile && (
                                <p className="mt-4 text-gray-300">Selected: {selectedFile.name}</p>
                            )}
                            <button
                                onClick={handleAnalyze}
                                disabled={!selectedFile || analyzing}
                                className={`mt-6 px-6 py-3 rounded-lg w-full ${!selectedFile || analyzing
                                        ? 'bg-white/10 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90'
                                    } transition-all duration-300 text-white`}
                            >
                                {analyzing ? 'Analyzing...' : 'Analyze Resume'}
                            </button>
                        </div>
                    </motion.div>

                    {/* Results Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="backdrop-blur-md bg-[#1A232E]/30 p-8 rounded-xl border border-[#ffffff0f] shadow-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5"
                    >
                        <h2 className="text-2xl font-semibold text-white mb-6">Job Recommendations</h2>
                        {!results && !analyzing && (
                            <div className="text-center text-gray-400 py-12">
                                Upload and analyze your resume to see job recommendations
                            </div>
                        )}
                        {analyzing && (
                            <div className="text-center text-gray-400 py-12">
                                Analyzing your resume...
                            </div>
                        )}
                        {results && (
                            <div className="space-y-4">
                                {results.map((job, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="backdrop-blur-md bg-[#252D3B]/40 p-4 rounded-lg border border-[#ffffff08] hover:border-[#ffffff15] transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-white font-medium">{job.title}</h3>
                                            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold">{job.match}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default JobAnalyzer;
