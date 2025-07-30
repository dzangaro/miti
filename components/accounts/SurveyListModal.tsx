
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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

interface Account {
  id: string;
  policyNumber: string;
  insuredName: string;
  address: string;
  diaryDate: number;
}

interface SurveyListModalProps {
  account: Account;
  surveys: Survey[];
  onClose: () => void;
  onSurveyClick: (survey: Survey) => void;
}

const SurveyListModal = ({ account, surveys, onClose, onSurveyClick }: SurveyListModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Surveys for {account.insuredName}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p><strong>Policy Number:</strong> {account.policyNumber}</p>
            <p><strong>Address:</strong> {account.address}</p>
          </div>

          {surveys.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No surveys found for this account
            </div>
          ) : (
            <div className="grid gap-3">
              {surveys.map((survey) => (
                <Card 
                  key={survey.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                  onClick={() => onSurveyClick(survey)}
                >
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-lg">{survey.surveyNumber}</h4>
                          <Badge variant={survey.status === 'open' ? 'default' : 'secondary'}>
                            {survey.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><strong>Type:</strong> {survey.surveyType}</p>
                            <p><strong>Assigned to:</strong> {survey.assignedTo}</p>
                          </div>
                          <div>
                            <p><strong>Underwriter:</strong> {survey.underwriter}</p>
                            <p><strong>Due Date:</strong> {survey.dueDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyListModal;
