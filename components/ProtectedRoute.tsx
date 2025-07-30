
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'analyst' | 'read-only';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Authentication disabled - just render children directly
  return <>{children}</>;
};

export default ProtectedRoute;
