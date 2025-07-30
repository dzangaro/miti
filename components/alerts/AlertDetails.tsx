
import React from 'react';
import { Alert } from '@/types/alerts';
import { getSeverityColor } from '@/utils/alertUtils';
import { Button } from '@/components/ui/button';
import AlertActionButtons from './AlertActionButtons';

interface AlertDetailsProps {
  alert: Alert;
  activeTab: 'main' | 'investigation' | 'closed';
  moveToInvestigation: (id: number) => void;
  closeAlert: (id: number) => void;
  reopenAlert: (id: number) => void;
  createCase: (id: number) => void;
}

const AlertDetails = ({
  alert,
  activeTab,
  moveToInvestigation,
  closeAlert,
  reopenAlert,
  createCase
}: AlertDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-medium mb-1">Alert Details</p>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Severity Level:</span>
            <span className={`col-span-2 ${getSeverityColor(alert.severity)}`}>{alert.severity}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Alert ID:</span>
            <span className="col-span-2">{alert.id}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Time:</span>
            <span className="col-span-2">{alert.timestamp}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Location:</span>
            <span className="col-span-2">{alert.location}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Alert Source:</span>
            <span className="col-span-2">{alert.source}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Alert Type:</span>
            <span className="col-span-2">{alert.alertType}</span>
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-1">Insured Information</p>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Policy Number:</span>
            <span className="col-span-2">{alert.policyNumber}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Insured / Contact:</span>
            <span className="col-span-2">{alert.assignedTo}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-500">Phone Number:</span>
            <span className="col-span-2">{alert.contactPhone}</span>
          </div>
        </div>
        
        {alert.notes && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Notes</p>
            <p className="text-sm text-gray-700 p-2 bg-gray-100 rounded">{alert.notes}</p>
          </div>
        )}
        
        <div className="mt-4 flex space-x-2 justify-end">
          <AlertActionButtons
            alertId={alert.id}
            activeTab={activeTab}
            moveToInvestigation={moveToInvestigation}
            closeAlert={closeAlert}
            reopenAlert={reopenAlert}
            createCase={createCase}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;
