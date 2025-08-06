'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { slideIn, staggerContainer, textVariant } from '../utils/motion';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-[#13151a] to-[#090a0f] min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className={`${styles.paddings} relative z-10`}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto flex flex-col`}
        >
          <div className="flex flex-col items-center justify-center text-center gap-8">
            <motion.h1
              variants={textVariant(1.1)}
              className="font-bold text-[64px] text-white leading-tight"
            >
              Transform Your Career with
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"> AI-Powered </span>
              Job Matching
            </motion.h1>

            <motion.p
              variants={textVariant(1.2)}
              className="text-lg text-gray-300 max-w-2xl"
            >
              Upload your LinkedIn or other social media profile, and let our advanced AI analyze your skills, experience, and potential to find your perfect job match..
            </motion.p>

            <motion.div
              variants={slideIn('up', 'tween', 1.3, 1)}
              className="flex gap-4"
            >
              <a
                href="/job-analyzer"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Analyze My Profile
              </a>
              <a
                href="/learn-more"
                className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="grid md:grid-cols-3 gap-8 mt-20"
            id="features"
          >
            <motion.div
              variants={slideIn('left', 'tween', 0.2, 1)}
              className="backdrop-blur-md bg-[#1A232E]/30 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn Profile Analysis</h3>
              <p className="text-gray-400">Our AI analyzes your LinkedIn profile to understand your skills, experience, and career trajectory.</p>
            </motion.div>

            <motion.div
              variants={slideIn('left', 'tween', 0.4, 1)}
              className="backdrop-blur-md bg-[#1A232E]/30 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Job Matching</h3>
              <p className="text-gray-400">Get personalized job recommendations based on your skills, experience level, and career goals.</p>
            </motion.div>

            <motion.div
              variants={slideIn('left', 'tween', 0.6, 1)}
              className="backdrop-blur-md bg-[#1A232E]/30 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Career Growth Insights</h3>
              <p className="text-gray-400">Get insights into skill gaps and learning opportunities to enhance your career prospects.</p>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="flex justify-center gap-12 mt-20"
          >
            <motion.div
              variants={textVariant(0.2)}
              className="text-center"
            >
              <h4 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">98%</h4>
              <p className="text-gray-400">Match Accuracy</p>
            </motion.div>
            <motion.div
              variants={textVariant(0.4)}
              className="text-center"
            >
              <h4 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">50K+</h4>
              <p className="text-gray-400">Job Matches</p>
            </motion.div>
            <motion.div
              variants={textVariant(0.6)}
              className="text-center"
            >
              <h4 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">24/7</h4>
              <p className="text-gray-400">AI Analysis</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
