import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="text-white/90 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Course Content System
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            {user ? (
              <>
                <NavLink to="/courses">Courses</NavLink>
                <button
                  onClick={logout}
                  className="text-white/90 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-1">
            <NavLink to="/">Home</NavLink>
            {user ? (
              <>
                <NavLink to="/courses">Courses</NavLink>
                <button
                  onClick={logout}
                  className="block w-full text-left text-white/90 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
