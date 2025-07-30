
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AccountSurveyModal from '@/components/accounts/AccountSurveyModal';
import SurveyListModal from '@/components/accounts/SurveyListModal';

interface Account {
  id: string;
  policyNumber: string;
  insuredName: string;
  address: string;
  diaryDate: number;
}

interface Survey {
  id: string;
  accountId: string;
  surveyNumber: string;
  status: 'open' | 'closed';
  assignedTo: string;
  surveyType: 'onsite' | 'virtual' | 'assessment' | 'review' | 'consulting';
  underwriter: string;
  agent: string;
  insured: string;
  dueDate: string;
}

const mockAccounts: Account[] = [
  {
    id: '1',
    policyNumber: 'POL-2024-001',
    insuredName: 'ABC Manufacturing Corp',
    address: '123 Industrial Blvd, Springfield, IL 62701',
    diaryDate: 5
  },
  {
    id: '2',
    policyNumber: 'POL-2024-002',
    insuredName: 'XYZ Logistics Inc',
    address: '456 Commerce St, Chicago, IL 60601',
    diaryDate: 2
  },
  {
    id: '3',
    policyNumber: 'POL-2024-003',
    insuredName: 'Global Tech Solutions',
    address: '789 Tech Park Dr, Austin, TX 78701',
    diaryDate: 10
  }
];

const mockSurveys: Survey[] = [
  {
    id: '1',
    accountId: '1',
    surveyNumber: 'SUR-2024-001',
    status: 'open',
    assignedTo: 'John Smith',
    surveyType: 'onsite',
    underwriter: 'Jane Doe',
    agent: 'Mike Johnson',
    insured: 'ABC Manufacturing Corp',
    dueDate: '2024-07-15'
  },
  {
    id: '2',
    accountId: '2',
    surveyNumber: 'SUR-2024-002',
    status: 'closed',
    assignedTo: 'Sarah Wilson',
    surveyType: 'virtual',
    underwriter: 'Bob Brown',
    agent: 'Lisa Davis',
    insured: 'XYZ Logistics Inc',
    dueDate: '2024-07-20'
  },
  {
    id: '3',
    accountId: '1',
    surveyNumber: 'SUR-2024-003',
    status: 'open',
    assignedTo: 'Mike Johnson',
    surveyType: 'assessment',
    underwriter: 'Jane Doe',
    agent: 'Mike Johnson',
    insured: 'ABC Manufacturing Corp',
    dueDate: '2024-07-25'
  }
];

const Accounts = () => {
  const { currentUser } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showSurveyListModal, setShowSurveyListModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
    setShowSurveyListModal(true);
  };

  const handleSurveyClick = (survey: Survey) => {
    setSelectedSurvey(survey);
    setShowSurveyListModal(false);
    setShowSurveyModal(true);
  };

  const handleBackFromSurvey = () => {
    setShowSurveyModal(false);
    setSelectedSurvey(null);
    setShowSurveyListModal(true);
  };

  const handleCloseSurveyList = () => {
    setShowSurveyListModal(false);
    setSelectedAccount(null);
  };

  const handleCloseSurveyModal = () => {
    setShowSurveyModal(false);
    setSelectedSurvey(null);
    setSelectedAccount(null);
  };

  const getAccountSurveys = (accountId: string) => {
    return mockSurveys.filter(survey => survey.accountId === accountId);
  };

  const sortedAccounts = [...mockAccounts].sort((a, b) => a.diaryDate - b.diaryDate);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={currentUser.role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={currentUser} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Accounts</h1>
            
            {/* Full width Account List with buffers */}
            <div className="px-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account List</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Policy #</TableHead>
                        <TableHead>Insured Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Diary</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedAccounts.map((account) => (
                        <TableRow 
                          key={account.id}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => handleAccountClick(account)}
                        >
                          <TableCell className="font-medium">{account.policyNumber}</TableCell>
                          <TableCell>{account.insuredName}</TableCell>
                          <TableCell className="max-w-xs truncate">{account.address}</TableCell>
                          <TableCell>
                            <Badge variant={account.diaryDate <= 3 ? "destructive" : account.diaryDate <= 7 ? "default" : "secondary"}>
                              {account.diaryDate}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Survey List Modal */}
      {showSurveyListModal && selectedAccount && (
        <SurveyListModal
          account={selectedAccount}
          surveys={getAccountSurveys(selectedAccount.id)}
          onClose={handleCloseSurveyList}
          onSurveyClick={handleSurveyClick}
        />
      )}

      {/* Survey Dashboard Modal */}
      {showSurveyModal && selectedSurvey && (
        <AccountSurveyModal
          survey={selectedSurvey}
          onClose={handleCloseSurveyModal}
          onBack={handleBackFromSurvey}
        />
      )}
    </div>
  );
};

export default Accounts;
