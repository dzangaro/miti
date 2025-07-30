
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AlertActionButtonsProps {
  alertId: number;
  activeTab: 'main' | 'investigation' | 'closed';
  moveToInvestigation: (id: number) => void;
  closeAlert: (id: number) => void;
  reopenAlert: (id: number) => void;
  createCase: (id: number) => void;
}

const AlertActionButtons = ({
  alertId,
  activeTab,
  moveToInvestigation,
  closeAlert,
  reopenAlert,
  createCase
}: AlertActionButtonsProps) => {
  if (activeTab === 'main') {
    return (
      <Button
        size="sm"
        onClick={() => moveToInvestigation(alertId)}
        className="bg-[#221F26] hover:bg-[#221F26]/90"
      >
        Investigate
      </Button>
    );
  }
  
  if (activeTab === 'investigation') {
    return (
      <div className="flex justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => closeAlert(alertId)}
        >
          Close Alert
        </Button>
        <Button
          size="sm"
          className="bg-[#221F26] hover:bg-[#221F26]/90"
          onClick={() => createCase(alertId)}
        >
          Create Case
        </Button>
      </div>
    );
  }
  
  if (activeTab === 'closed') {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => reopenAlert(alertId)}
      >
        Reopen
      </Button>
    );
  }
  
  return null;
};

export default AlertActionButtons;
