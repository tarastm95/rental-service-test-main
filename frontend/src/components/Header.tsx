import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors"
        >
          MyRental
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/apartments"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Apartments
          </Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
