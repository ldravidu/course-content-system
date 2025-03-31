import { useState } from "react";
import Button from "../common/Button";

function ContentUploadModal({ courseId, onClose, onSubmit, isUploading }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [error, setError] = useState(null);

  const allowedTypes = {
    "application/pdf": [".pdf"],
    "video/mp4": [".mp4"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  };

  const allowedExtensions = Object.values(allowedTypes).flat().join(", ");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      const fileExtension = `.${file.name.split(".").pop().toLowerCase()}`;

      const isAllowedType = Object.entries(allowedTypes).some(
        ([mimeType, extensions]) =>
          mimeType === fileType && extensions.includes(fileExtension),
      );

      if (!isAllowedType) {
        setError(`Invalid file type. Allowed types are: ${allowedExtensions}`);
        e.target.value = ""; // Reset file input
        return;
      }

      setError(null);
      setFormData((prev) => ({ ...prev, file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      // Add content metadata as a Blob instead of JSON string
      const contentMetadata = new Blob(
        [
          JSON.stringify({
            title: formData.title,
            description: formData.description,
            courseId: courseId,
          }),
        ],
        { type: "application/json" },
      );
      data.append("content", contentMetadata);
      data.append("file", formData.file);

      await onSubmit(data);
      onClose();
    } catch (err) {
      setError("An error occurred while uploading content. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <h2 className="text-2xl font-bold mb-6">Upload Course Content</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              accept={Object.entries(allowedTypes)
                .map(
                  ([mimeType, extensions]) =>
                    `${mimeType},${extensions.join(",")}`,
                )
                .join(",")}
              required
            />
            <div className="mt-2 text-sm text-gray-500">
              <p className="font-medium">Accepted file types:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Documents: PDF</li>
                <li>Videos: MP4</li>
                <li>Images: JPG, JPEG, PNG</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Content"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContentUploadModal;
