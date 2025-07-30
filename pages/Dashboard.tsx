
import React, { useEffect, useCallback } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import StatCards from '@/components/dashboard/StatCards';
import AlertsTable from '@/components/dashboard/AlertsTable';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ConfiguredDashboard = () => {
  return (
    <>
      <StatCards />
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Risk Alerts</h2>
        <AlertsTable />
      </div>
    </>
  );
};

const DataSourcePrompt = ({ onConfigure }: { onConfigure: () => void }) => {
  return (
    <Card>
      <CardContent className="py-10 text-center">
        <CardTitle className="mb-4">Welcome to Miti</CardTitle>
        <p className="text-gray-600 mb-6">
          To get started, configure your data sources to begin monitoring your risks.
        </p>
        <Button onClick={onConfigure}>Configure Data Sources</Button>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { currentUser, hasConfiguredDataSource, setHasConfiguredDataSource } = useAuth();

  const handleConfigureDataSource = useCallback(() => {
    setHasConfiguredDataSource(true);
  }, [setHasConfiguredDataSource]);

  useEffect(() => {
    if (currentUser) {
      console.log(`Logged in as ${currentUser.email} (Role: ${currentUser.role})`);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={currentUser.role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={currentUser} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            
            {hasConfiguredDataSource ? (
              <ConfiguredDashboard />
            ) : (
              <DataSourcePrompt onConfigure={handleConfigureDataSource} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
