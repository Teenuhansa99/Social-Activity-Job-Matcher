interface JobRecommendation {
  title: string;
  score: number;
}

interface JobRecommendationsProps {
  recommendations: JobRecommendation[];
}

const JobRecommendations = ({ recommendations }: JobRecommendationsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Job Recommendations</h2>
      <div className="grid gap-4">
        {recommendations.map((job, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-medium text-gray-800">{job.title}</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 relative">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3"
                    strokeDasharray={`${job.score}, 100`}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                  {job.score}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;
