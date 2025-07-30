
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';

const Analytics = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null; // This will be handled by the ProtectedRoute
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={currentUser.role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={currentUser} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Risk Analytics</h1>
            <p className="text-gray-600">
              This is where advanced analytics and reporting tools for risk data will be implemented.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
