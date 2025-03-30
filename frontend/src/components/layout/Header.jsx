import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            Course Content System
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="hover:text-blue-200 transition-colors">
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/courses"
                      className="hover:text-blue-200 transition-colors"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:text-blue-200 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="hover:text-blue-200 transition-colors"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  to="/"
                  className="block py-2 hover:text-blue-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/courses"
                      className="block py-2 hover:text-blue-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 hover:text-blue-200"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 hover:text-blue-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
