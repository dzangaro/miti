
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CasePlaybook from './CasePlaybook';
import CaseNotes from './CaseNotes';

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: any;
  onAddNote: (caseId: string, note: string) => void;
  onUpdateNote: (caseId: string, noteId: string, note: string) => void;
  onDeleteNote: (caseId: string, noteId: string) => void;
}

const CaseModal = ({ isOpen, onClose, caseData, onAddNote, onUpdateNote, onDeleteNote }: CaseModalProps) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Case {caseData.id}
            <Badge className={getSeverityColor(caseData.severity)}>
              {caseData.severity}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Case Details</TabsTrigger>
            <TabsTrigger value="playbook">Playbook</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Sensor Type:</span>
                    <span className="col-span-2">{caseData.sensorType}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Risk Type:</span>
                    <span className="col-span-2">{caseData.riskType}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Location:</span>
                    <span className="col-span-2">{caseData.location}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Detected:</span>
                    <span className="col-span-2">{caseData.createdAt}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Policy Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Policy Number:</span>
                    <span className="col-span-2">{caseData.policyNumber}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Insured:</span>
                    <span className="col-span-2">{caseData.insuredName}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Coverage:</span>
                    <span className="col-span-2">{caseData.coverage}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Underwriter:</span>
                    <span className="col-span-2">{caseData.underwriter}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-gray-500">Agent:</span>
                    <span className="col-span-2">{caseData.agent}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="playbook">
            <CasePlaybook riskType={caseData.riskType} sensorType={caseData.sensorType} />
          </TabsContent>

          <TabsContent value="notes">
            <CaseNotes
              caseId={caseData.id}
              notes={caseData.notes || []}
              onAddNote={onAddNote}
              onUpdateNote={onUpdateNote}
              onDeleteNote={onDeleteNote}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CaseModal;
