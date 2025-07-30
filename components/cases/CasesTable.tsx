
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface Case {
  id: string;
  sensorType: string;
  riskType: string;
  severity: string;
  location: string;
  policyNumber: string;
  createdAt: string;
  status: string;
  assignedTo: string;
}

interface CasesTableProps {
  cases: Case[];
  onCaseClick: (caseData: Case) => void;
}

const CasesTable = ({ cases, onCaseClick }: CasesTableProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Sensor Type</TableHead>
            <TableHead>Risk Type</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Policy Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((caseItem) => (
            <TableRow key={caseItem.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{caseItem.id}</TableCell>
              <TableCell>{caseItem.sensorType}</TableCell>
              <TableCell>{caseItem.riskType}</TableCell>
              <TableCell>
                <Badge className={getSeverityColor(caseItem.severity)}>
                  {caseItem.severity}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">{caseItem.location}</TableCell>
              <TableCell>{caseItem.policyNumber}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(caseItem.status)}>
                  {caseItem.status}
                </Badge>
              </TableCell>
              <TableCell>{caseItem.assignedTo}</TableCell>
              <TableCell>{caseItem.createdAt}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCaseClick(caseItem)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CasesTable;
