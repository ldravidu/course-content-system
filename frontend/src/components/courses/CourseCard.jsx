import { Link } from "react-router-dom";
import Card from "../common/Card";

function CourseCard({ course }) {
  return (
    <Card>
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
    </Card>
  );
}

export default CourseCard;
