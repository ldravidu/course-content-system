import { useState, useEffect } from "react";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function SignUpPage() {
  const { role } = useParams();
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: role || "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Validate role parameter
  if (!["student", "instructor"].includes(role)) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Sign up as {role.charAt(0).toUpperCase() + role.slice(1)}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline focus:outline-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline focus:outline-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-700 font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline focus:outline-blue-500"
            required
          />
        </div>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition-colors"
          } text-white py-2 px-4 rounded-md font-medium`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="text-sm mt-4 text-center">
        <Link to="/signup" className="text-blue-600 hover:underline mr-2">
          ← Change Role
        </Link>
        <span className="text-gray-500">|</span>
        <Link to="/login" className="text-blue-600 hover:underline ml-2">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
