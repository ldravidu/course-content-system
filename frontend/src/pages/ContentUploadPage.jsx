import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ContentUploadPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files.length > 0) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    try {
      // This would be the actual API call to upload the content
      console.log("Uploading content:", formData);

      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On success, navigate back to course detail page
      navigate(`/courses/${courseId}`);
    } catch (err) {
      setError("An error occurred while uploading content. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Course Content</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="w-full"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Accepted file types: PDF, video, image
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(`/courses/${courseId}`)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors ${
              isUploading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Content"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContentUploadPage;
