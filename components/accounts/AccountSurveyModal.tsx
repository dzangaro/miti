import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, Clock, BarChart3, Paperclip, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

interface AccountSurveyModalProps {
  survey: Survey;
  onClose: () => void;
  onBack?: () => void;
}

const AccountSurveyModal = ({ survey, onClose, onBack }: AccountSurveyModalProps) => {
  const [editableData, setEditableData] = useState({
    underwriter: survey.underwriter,
    agent: survey.agent,
    insured: survey.insured,
  });
  const [recommendations, setRecommendations] = useState('');
  const [timeEntry, setTimeEntry] = useState('');
  const [timeEntries, setTimeEntries] = useState<Array<{id: string, description: string, hours: number}>>([]);

  const handleSaveContact = () => {
    toast({
      title: "Contact information updated",
      description: "Contact details have been saved successfully."
    });
  };

  const handleAddRecommendation = () => {
    if (recommendations.trim()) {
      toast({
        title: "Recommendation added",
        description: "Your recommendation has been saved."
      });
      setRecommendations('');
    }
  };

  const handleAddTimeEntry = () => {
    if (timeEntry.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        description: timeEntry,
        hours: 1 // Default to 1 hour, could be made configurable
      };
      setTimeEntries([...timeEntries, newEntry]);
      setTimeEntry('');
      toast({
        title: "Time entry added",
        description: "Time has been tracked successfully."
      });
    }
  };

  const handleFileAttach = () => {
    // File attachment logic would go here
    toast({
      title: "File attachment",
      description: "File attachment functionality would be implemented here."
    });
  };

  const handleRunReport = () => {
    toast({
      title: "Report generated",
      description: "Survey report has been generated successfully."
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={onBack}
                  className="h-8 w-8 p-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <DialogTitle>Survey Dashboard - {survey.surveyNumber}</DialogTitle>
            </div>
            <Badge variant={survey.status === 'open' ? 'default' : 'secondary'}>
              {survey.status}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="time">Time Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Survey Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Survey Type</Label>
                    <p className="text-sm capitalize">{survey.surveyType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Assigned To</Label>
                    <p className="text-sm">{survey.assignedTo}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <p className="text-sm">{survey.dueDate}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button onClick={handleFileAttach} variant="outline" className="w-full justify-start">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach Files
                  </Button>
                  <Button onClick={handleRunReport} variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Run Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="underwriter">Underwriter</Label>
                    <Input
                      id="underwriter"
                      value={editableData.underwriter}
                      onChange={(e) => setEditableData({...editableData, underwriter: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agent">Agent</Label>
                    <Input
                      id="agent"
                      value={editableData.agent}
                      onChange={(e) => setEditableData({...editableData, agent: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="insured">Insured</Label>
                    <Input
                      id="insured"
                      value={editableData.insured}
                      onChange={(e) => setEditableData({...editableData, insured: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveContact}>Save Contact Information</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="recommendations">Add Recommendation</Label>
                  <Textarea
                    id="recommendations"
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    placeholder="Enter your recommendations here..."
                    rows={4}
                  />
                </div>
                <Button onClick={handleAddRecommendation}>Add Recommendation</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>File Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Button onClick={handleFileAttach}>
                      Choose Files to Upload
                    </Button>
                    <p className="mt-2 text-sm text-gray-500">
                      Attach forms, documents, or other relevant files
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Time Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="timeEntry">Task Description</Label>
                  <Input
                    id="timeEntry"
                    value={timeEntry}
                    onChange={(e) => setTimeEntry(e.target.value)}
                    placeholder="Describe the work performed..."
                  />
                </div>
                <Button onClick={handleAddTimeEntry}>Add Time Entry</Button>
                
                {timeEntries.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Time Entries</h4>
                    <div className="space-y-2">
                      {timeEntries.map((entry) => (
                        <div key={entry.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">{entry.description}</span>
                          <Badge variant="outline">{entry.hours}h</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSurveyModal;
