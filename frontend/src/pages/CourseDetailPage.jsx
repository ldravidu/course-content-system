import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data - would be replaced with API calls
    const mockCourse = {
      id: courseId,
      title: "Introduction to React",
      description:
        "A comprehensive introduction to React development, covering components, state, props, and hooks.",
      instructor: "Jane Doe",
      createdAt: "2025-01-15",
    };

    const mockContent = [
      {
        id: 1,
        title: "React Basics Slides",
        description: "Introduction to React fundamentals",
        fileType: "PDF",
        createdAt: "2025-01-20",
      },
      {
        id: 2,
        title: "Component Tutorial",
        description: "Video walkthrough of component creation",
        fileType: "video",
        createdAt: "2025-01-25",
      },
      {
        id: 3,
        title: "Hooks Diagram",
        description: "Visual explanation of React hooks",
        fileType: "image",
        createdAt: "2025-02-05",
      },
    ];

    // Simulate API request
    setTimeout(() => {
      setCourse(mockCourse);
      setContent(mockContent);
      setLoading(false);
    }, 800);
  }, [courseId]);

  if (loading) {
    return <div className="text-center py-10">Loading course details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Error: {error.message}
      </div>
    );
  }

  if (!course) {
    return <div className="text-center py-10">Course not found.</div>;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
          <p>Instructor: {course.instructor}</p>
          <p>Created on: {new Date(course.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Content</h2>
        <Link
          to={`/courses/${courseId}/upload`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Upload New Content
        </Link>
      </div>

      {content.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">
            No content available for this course yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {content.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center"
            >
              <div className="mr-4">
                {item.fileType === "PDF" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
                {item.fileType === "video" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {item.fileType === "image" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <button className="ml-4 text-blue-600 hover:text-blue-800">
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseDetailPage;
