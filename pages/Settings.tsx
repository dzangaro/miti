
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from '@/components/settings/UserManagement';
import GeneralSettings from '@/components/settings/GeneralSettings';
import FormsSettings from '@/components/settings/FormsSettings';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={currentUser.role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={currentUser} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>
            
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="forms">Forms</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <GeneralSettings currentUser={currentUser} />
              </TabsContent>
              
              <TabsContent value="users">
                <UserManagement currentUser={currentUser} />
              </TabsContent>

              <TabsContent value="forms">
                <FormsSettings currentUser={currentUser} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
