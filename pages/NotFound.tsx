
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const NotFound = () => {
  const { currentUser } = useAuth();
  const redirectPath = currentUser ? '/dashboard' : '/';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#221F26]">404</h1>
        <h2 className="text-2xl font-medium text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-6">
          <Link to={redirectPath}>
            {currentUser ? 'Return to Dashboard' : 'Return to Home'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
