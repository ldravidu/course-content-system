import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import CourseCard from "../components/courses/CourseCard";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import EmptyState from "../components/common/EmptyState";
import CreateCourseModal from "../components/courses/CreateCourseModal";
import { courseAPI } from "../services/api";

function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    pageSize: 20,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Helper function to check if user is an instructor
  const isInstructor =
    user?.role === "ROLE_INSTRUCTOR" || user?.role === "ROLE_ADMIN";

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const handleCreateCourse = async (courseData) => {
    try {
      setIsCreating(true);
      const response = await courseAPI.createCourse(courseData);

      // Add the new course to the list
      setCourses((prev) => [response.data, ...prev]);

      // Close the modal
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating course:", err);
      setError(err.response?.data?.message || "Failed to create course");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await courseAPI.getAllCourses({
          page: pagination.currentPage,
          size: pagination.pageSize,
        });
        setCourses(response.data.content || []);
        setPagination({
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          currentPage: response.data.number,
          pageSize: response.data.size,
        });
        console.debug("Fetched courses:", response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.response?.data?.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [pagination.currentPage, pagination.pageSize]);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        {isInstructor && (
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            Add New Course
          </Button>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateCourseModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCourse}
          isLoading={isCreating}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <Loading text="Loading courses..." />
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>

      {courses.length === 0 && !loading && (
        <EmptyState message="No courses available." />
      )}

      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
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
    </div>
  );
}

export default CoursesPage;
