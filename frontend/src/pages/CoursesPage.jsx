import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import CourseCard from "../components/courses/CourseCard";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import EmptyState from "../components/common/EmptyState";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For now, mock data is used
  useEffect(() => {
    // This would be replaced with an actual API call
    const mockCourses = [
      {
        id: 1,
        title: "Introduction to React",
        description: "Learn the basics of React",
        instructor: "Jane Doe",
      },
      {
        id: 2,
        title: "Advanced Spring Boot",
        description: "Master Spring Boot development",
        instructor: "John Smith",
      },
      {
        id: 3,
        title: "Database Design",
        description: "Learn how to design efficient databases",
        instructor: "Alice Johnson",
      },
    ];

    // Simulate API request
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 800);
  }, []);

  if (error) {
    return <Error message={error.message} />;
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
