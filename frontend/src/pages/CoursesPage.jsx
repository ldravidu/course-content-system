import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    return (
      <div className="text-center py-10 text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Add New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div class="mx-auto w-full max-w rounded-lg shadow-md p-6 bg-white">
            <div class="flex animate-pulse space-x-4">
              <div class="flex-1 space-y-4 py-4">
                <div class="space-y-6">
                  <div class="grid grid-cols-5 gap-4 items-center mb-6">
                    <div class="size-10 rounded-full bg-gray-200"></div>
                    <div class="col-span-4 h-2 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div class="h-2 rounded bg-gray-200"></div>
                <div class="h-2 rounded bg-gray-200"></div>
                <div class="h-2 rounded bg-gray-200"></div>
                <div class="space-y-6">
                  <div class="grid grid-cols-5 gap-4 mt-8">
                    <div class="col-span-4 h-2 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Instructor: {course.instructor}
                </p>
                <Link
                  to={`/courses/${course.id}`}
                  className="text-blue-600 hover:underline block text-center"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {courses.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          No courses available.
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
