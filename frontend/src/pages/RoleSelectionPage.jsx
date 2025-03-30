import { Link } from "react-router-dom";
import Card from "../components/common/Card";

function RoleSelectionPage() {
  const roles = [
    {
      type: "student",
      title: "I'm a Student",
      description: "Access course materials and track your learning progress",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-blue-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      type: "instructor",
      title: "I'm an Instructor",
      description: "Create and manage courses, upload content for students",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">Choose Your Role</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {roles.map((role) => (
          <Link key={role.type} to={`/signup/${role.type}`}>
            <Card className="hover:shadow-lg transition-shadow text-center">
              <div className="flex justify-center">{role.icon}</div>
              <h2 className="text-xl font-semibold mb-3">{role.title}</h2>
              <p className="text-gray-600 mb-4">{role.description}</p>
              <span
                className={`text-${
                  role.type === "student" ? "blue" : "green"
                }-600 font-medium`}
              >
                Sign up as{" "}
                {role.type.charAt(0).toUpperCase() + role.type.slice(1)}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RoleSelectionPage;
