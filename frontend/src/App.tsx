import { useState } from 'react';
import './App.css';
import ProfileUploader from './components/ProfileUploader';
import ProfileSummary from './components/ProfileSummary';
import JobRecommendations from './components/JobRecommendations';

function App() {
  const [profile, setProfile] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProfileSubmit = async (profileData: any) => {
    setLoading(true);
    setError("");
    setProfile(profileData);
    // Simulate network delay
    setTimeout(() => {
      // Mocked recommendations
      setRecommendations([
        { title: "Python Developer", score: 80.0 },
        { title: "AI Engineer", score: 60.0 },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Job Recommendation System
        </h1>

        {/* Profile Uploader Component */}
        <div className="mb-8">
          <ProfileUploader onProfileSubmit={handleProfileSubmit} />
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Profile Summary and Recommendations */}
        {profile && !loading && (
          <div>
            <ProfileSummary profile={profile} />
            {recommendations.length > 0 && (
              <JobRecommendations recommendations={recommendations} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
