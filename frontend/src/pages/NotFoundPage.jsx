import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center py-10">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
