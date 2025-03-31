import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import CourseCard from "../components/courses/CourseCard";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import EmptyState from "../components/common/EmptyState";
import { courseAPI } from "../services/api";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    pageSize: 20,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await courseAPI.getAllCourses();
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
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button variant="primary">Add New Course</Button>
      </div>

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
    </div>
  );
}

export default CoursesPage;
