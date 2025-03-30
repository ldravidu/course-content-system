function HomePage() {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Course Content System</h1>
        <p className="text-lg mb-4">
          This platform allows instructors to manage and share course materials with students.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">For Instructors</h2>
            <p className="mb-4">Upload and manage your course materials including PDFs, videos, and images.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Upload Content
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">For Students</h2>
            <p className="mb-4">Access all course materials provided by your instructors in one place.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default HomePage;