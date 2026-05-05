import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, LogIn } from 'lucide-react';

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF5EE] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-serif font-bold text-primary">404</h1>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          {isAuthenticated ? (
            <Link
              to="../"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors"
            >
              <Home size={18} />
              Go to Dashboard
            </Link>
          ) : (
            <button
              onClick={() => navigate('../login')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors"
            >
              <LogIn size={18} />
              Go to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
