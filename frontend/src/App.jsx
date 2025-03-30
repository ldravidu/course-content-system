import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import CoursesPage from './pages/CoursesPage';
// import CourseDetailPage from './pages/CourseDetailPage';
// import ContentUploadPage from './pages/ContentUploadPage';
// import NotFoundPage from './pages/NotFoundPage';

function App() {
  // We'll eventually use context for user authentication
  const [user, setUser] = useState(null);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="login" element={<LoginPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailPage />} />
          <Route path="courses/:courseId/upload" element={<ContentUploadPage />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;