import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import ContentItem from "../components/content/ContentItem";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import EmptyState from "../components/common/EmptyState";
import { courseAPI, contentAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";

function CourseDetailPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    pageSize: 20,
  });

  const fetchContent = async (page = 0) => {
    try {
      const contentResponse = await courseAPI.getCourseContent(courseId, {
        page,
        size: pagination.pageSize,
      });

      setContent(contentResponse.data.content || []);
      setPagination({
        totalPages: contentResponse.data.totalPages,
        totalElements: contentResponse.data.totalElements,
        currentPage: contentResponse.data.number,
        pageSize: contentResponse.data.size,
      });
    } catch (err) {
      console.error("Error fetching course content:", err);
      setError(err.response?.data?.message || "Failed to load course content");
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const [courseResponse] = await Promise.all([
          courseAPI.getCourseById(courseId),
          fetchContent(0),
        ]);

        setCourse(courseResponse.data);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError(err.response?.data?.message || "Failed to load course data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleDownload = async (contentItem) => {
    try {
      const response = await contentAPI.downloadContent(contentItem.id);
      // Create a blob from the response data
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", contentItem.title);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading content:", err);
      // TODO: show error message
    }
  };

  const handlePageChange = (newPage) => {
    fetchContent(newPage);
  };

  if (loading) {
    return <Loading text="Loading course details..." />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (!course) {
    return <EmptyState message="Course not found." />;
  }

  const isInstructor =
    user?.role === "ROLE_INSTRUCTOR" || user?.role === "ROLE_ADMIN";

  return (
    <div>
      <Card className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500">
          <p>Instructor: {course.instructorName}</p>
          <p>Created on: {new Date(course.createdAt).toLocaleDateString()}</p>
        </div>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Content</h2>
        {isInstructor && (
          <Link to={`/courses/${courseId}/upload`}>
            <Button variant="primary">Upload New Content</Button>
          </Link>
        )}
      </div>

      {content.length === 0 ? (
        <Card className="text-center py-10">
          <p className="text-gray-500">
            No content available for this course yet.
          </p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {content.map((item) => (
              <ContentItem
                key={item.id}
                item={item}
                onDownload={() => handleDownload(item)}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="secondary"
                disabled={pagination.currentPage === 0}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                Previous
              </Button>
              <span className="mx-4">
                Page {pagination.currentPage + 1} of {pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                disabled={pagination.currentPage === pagination.totalPages - 1}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CourseDetailPage;
