
import React, { Fragment } from 'react';
import { Alert } from '@/types/alerts';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table';
import AlertRow from './AlertRow';
import AlertDetails from './AlertDetails';

interface AlertListProps {
  filteredAlerts: Alert[];
  activeTab: 'main' | 'investigation' | 'closed';
  expandedAlerts: Record<number, boolean>;
  toggleAlertExpanded: (id: number) => void;
  moveToInvestigation: (id: number) => void;
  closeAlert: (id: number) => void;
  reopenAlert: (id: number) => void;
  createCase: (id: number) => void;
}

const AlertList = ({
  filteredAlerts,
  activeTab,
  expandedAlerts,
  toggleAlertExpanded,
  moveToInvestigation,
  closeAlert,
  reopenAlert,
  createCase,
}: AlertListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Alert Type</TableHead>
          <TableHead>Policy Number</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <Fragment key={alert.id}>
              <AlertRow
                alert={alert}
                expanded={!!expandedAlerts[alert.id]}
                activeTab={activeTab}
                toggleAlertExpanded={toggleAlertExpanded}
                moveToInvestigation={moveToInvestigation}
                closeAlert={closeAlert}
                reopenAlert={reopenAlert}
                createCase={createCase}
              />
              
              {expandedAlerts[alert.id] && (
                <TableRow>
                  <TableCell colSpan={6} className="bg-gray-50 p-4">
                    <AlertDetails
                      alert={alert}
                      activeTab={activeTab}
                      moveToInvestigation={moveToInvestigation}
                      closeAlert={closeAlert}
                      reopenAlert={reopenAlert}
                      createCase={createCase}
                    />
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No alerts found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AlertList;
