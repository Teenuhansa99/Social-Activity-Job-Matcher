import { useState } from 'react';

interface ProfileUploaderProps {
    onProfileSubmit: (profile: any) => void;
}

const ProfileUploader = ({ onProfileSubmit }: ProfileUploaderProps) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        try {
            const profileData = JSON.parse(jsonInput);
            setError('');
            onProfileSubmit(profileData);
        } catch (err) {
            setError('Invalid JSON format. Please check your input.');
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result as string;
                    setJsonInput(text);
                    setError('');
                } catch (err) {
                    setError('Error reading file');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Upload Profile</h2>
            <div className="mb-4">
                <textarea
                    className="w-full h-48 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste your JSON profile data here..."
                />
            </div>
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Get Recommendations
                </button>
            </div>
            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}
        </div>
    );
};

export default ProfileUploader;
