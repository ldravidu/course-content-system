import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import ContentItem from "../components/content/ContentItem";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import EmptyState from "../components/common/EmptyState";

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
    return <Loading text="Loading course details..." />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (!course) {
    return <EmptyState message="Course not found." />;
  }

  return (
    <div>
      <Card className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
          <p>Instructor: {course.instructor}</p>
          <p>Created on: {new Date(course.createdAt).toLocaleDateString()}</p>
        </div>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Content</h2>
        <Link to={`/courses/${courseId}/upload`}>
          <Button variant="primary">Upload New Content</Button>
        </Link>
      </div>

      {content.length === 0 ? (
        <Card className="text-center py-10">
          <p className="text-gray-500">
            No content available for this course yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {content.map((item) => (
            <ContentItem key={item.id} item={item} onDownload={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseDetailPage;
