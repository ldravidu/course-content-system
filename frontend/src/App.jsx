import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ContentUploadPage from "./pages/ContentUploadPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleSelectionPage from "./pages/RoleSelectionPage";

function App() {
  // We'll eventually use context for user authentication
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<RoleSelectionPage />} />
            <Route path="signup/:role" element={<SignUpPage />} />
            <Route
              path="courses"
              element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="courses/:courseId"
              element={
                <ProtectedRoute>
                  <CourseDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="courses/:courseId/upload"
              element={
                <ProtectedRoute>
                  <ContentUploadPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
