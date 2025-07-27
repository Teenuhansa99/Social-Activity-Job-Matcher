interface ProfileData {
  name: string;
  headline: string;
  location: string;
  industry: string;
  about: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
  }>;
  recent_posts: string[];
}

interface ProfileSummaryProps {
  profile: ProfileData;
}

const ProfileSummary = ({ profile }: ProfileSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Header Section */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
        <p className="text-lg text-gray-600">{profile.headline}</p>
        <div className="flex gap-4 mt-2 text-gray-500">
          <span>{profile.location}</span>
          <span>•</span>
          <span>{profile.industry}</span>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700">{profile.about}</p>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        {profile.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-medium">{edu.degree}</h3>
            <p className="text-gray-600">{edu.institution}</p>
            <p className="text-gray-500 text-sm">{edu.year}</p>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Experience</h2>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-medium">{exp.title}</h3>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-gray-500 text-sm">{exp.duration}</p>
            <p className="text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Certifications Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Certifications</h2>
        {profile.certifications.map((cert, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-medium">{cert.name}</h3>
            <p className="text-gray-600">{cert.issuer}</p>
            <p className="text-gray-500 text-sm">{cert.year}</p>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {profile.projects.map((project, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-gray-700">{project.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Posts Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Posts</h2>
        <div className="space-y-2">
          {profile.recent_posts.map((post, index) => (
            <p key={index} className="text-gray-700 bg-gray-50 p-3 rounded">
              {post}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
