
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import CasesTable from '@/components/cases/CasesTable';
import CaseModal from '@/components/cases/CaseModal';
import { useAuth } from '@/contexts/AuthContext';
import { useCases } from '@/hooks/useCases';

const Cases = () => {
  const { currentUser } = useAuth();
  const { cases, selectedCase, setSelectedCase, addNote, updateNote, deleteNote } = useCases();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!currentUser) {
    return null;
  }

  const handleCaseClick = (caseData: any) => {
    setSelectedCase(caseData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={currentUser.role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={currentUser} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Risk Cases</h1>
            <p className="text-gray-600 mb-6">
              IoT sensor alerts requiring investigation and mitigation actions.
            </p>
            
            <CasesTable cases={cases} onCaseClick={handleCaseClick} />
          </div>
        </main>
      </div>

      {selectedCase && (
        <CaseModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          caseData={selectedCase}
          onAddNote={addNote}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
        />
      )}
    </div>
  );
};

export default Cases;
