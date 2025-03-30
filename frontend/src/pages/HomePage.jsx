import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/common/Card";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold mb-6 h-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Course Content Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A modern platform for seamless educational content management and
          delivery
        </p>
        {user === null && (
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-12">
        <Card hover={true} className="text-center p-8">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
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
          </div>
          <h3 className="text-xl font-semibold mb-2">Organized Content</h3>
          <p className="text-gray-600">
            Structured course materials for enhanced learning experience
          </p>
        </Card>

        <Card hover={true} className="text-center p-8">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Uploads</h3>
          <p className="text-gray-600">
            Simple and secure content upload for instructors
          </p>
        </Card>

        <Card hover={true} className="text-center p-8">
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
          <p className="text-gray-600">
            Role-based access control for content management
          </p>
        </Card>
      </div>

      {/* Bottom CTA Section */}
      {user === null && (
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Join our platform today and experience modern educational content
            management
          </p>

          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
