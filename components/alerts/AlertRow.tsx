
import React from 'react';
import { Alert } from '@/types/alerts';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { getSeverityColor } from '@/utils/alertUtils';

interface AlertRowProps {
  alert: Alert;
  expanded: boolean;
  activeTab: 'main' | 'investigation' | 'closed';
  toggleAlertExpanded: (id: number) => void;
  moveToInvestigation: (id: number) => void;
  closeAlert: (id: number) => void;
  reopenAlert: (id: number) => void;
  createCase: (id: number) => void;
}

const AlertRow = ({
  alert,
  expanded,
  activeTab,
  toggleAlertExpanded,
  moveToInvestigation,
  closeAlert,
  reopenAlert,
  createCase
}: AlertRowProps) => {
  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell>
        <Button
          variant="ghost" 
          size="icon"
          onClick={() => toggleAlertExpanded(alert.id)}
        >
          <ChevronDown 
            className={`h-4 w-4 transition-transform ${expanded ? 'transform rotate-180' : ''}`} 
          />
        </Button>
      </TableCell>
      <TableCell>
        <span className={`font-medium ${getSeverityColor(alert.severity)}`}>
          {alert.severity}
        </span>
      </TableCell>
      <TableCell>{alert.alertType}</TableCell>
      <TableCell>{alert.policyNumber}</TableCell>
      <TableCell className="max-w-[200px] truncate">{alert.location}</TableCell>
      <TableCell>{alert.timestamp}</TableCell>
    </TableRow>
  );
};

export default AlertRow;
