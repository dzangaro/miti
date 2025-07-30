
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import AlertSearch from '@/components/alerts/AlertSearch';
import AlertFilters from '@/components/alerts/AlertFilters';
import AlertList from '@/components/alerts/AlertList';
import AlertPagination from '@/components/alerts/AlertPagination';
import { useAlerts } from '@/hooks/useAlerts';
import { useAuth } from '@/contexts/AuthContext';

const Alerts = () => {
  const { currentUser } = useAuth();
  
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredAlerts,
    expandedAlerts,
    toggleAlertExpanded,
    moveToInvestigation,
    closeAlert,
    reopenAlert,
    createCase
  } = useAlerts();

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
            <AlertSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <AlertFilters 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <AlertList 
                filteredAlerts={filteredAlerts}
                activeTab={activeTab}
                expandedAlerts={expandedAlerts}
                toggleAlertExpanded={toggleAlertExpanded}
                moveToInvestigation={moveToInvestigation}
                closeAlert={closeAlert}
                reopenAlert={reopenAlert}
                createCase={createCase}
              />
              
              <AlertPagination 
                filteredAlertsCount={filteredAlerts.length}
                activeTab={activeTab}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Alerts;
