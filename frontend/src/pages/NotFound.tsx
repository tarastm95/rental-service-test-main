import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page not found</p>
      <Link
        to="/"
        className="px-5 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}
