
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useAuth, User } from '@/contexts/AuthContext';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
}

interface CustomForm {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
}

interface FormsSettingsProps {
  currentUser: User;
}

const FormsSettings = ({ currentUser }: FormsSettingsProps) => {
  const [forms, setForms] = useState<CustomForm[]>([]);
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [newFormName, setNewFormName] = useState('');
  const [newFormDescription, setNewFormDescription] = useState('');

  const createForm = () => {
    if (!newFormName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name",
        variant: "destructive"
      });
      return;
    }

    const newForm: CustomForm = {
      id: Date.now().toString(),
      name: newFormName,
      description: newFormDescription,
      fields: []
    };

    setForms([...forms, newForm]);
    setNewFormName('');
    setNewFormDescription('');
    setIsCreatingForm(false);
    
    toast({
      title: "Form created",
      description: "New form has been created successfully"
    });
  };

  const deleteForm = (formId: string) => {
    setForms(forms.filter(form => form.id !== formId));
    toast({
      title: "Form deleted",
      description: "Form has been deleted successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Form Management</CardTitle>
          <CardDescription>
            Create and manage custom forms for surveys and assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Custom Forms</h3>
            <Button onClick={() => setIsCreatingForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Form
            </Button>
          </div>

          {isCreatingForm && (
            <Card className="mb-4">
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="formName">Form Name</Label>
                    <Input
                      id="formName"
                      value={newFormName}
                      onChange={(e) => setNewFormName(e.target.value)}
                      placeholder="Enter form name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="formDescription">Description (Optional)</Label>
                    <Textarea
                      id="formDescription"
                      value={newFormDescription}
                      onChange={(e) => setNewFormDescription(e.target.value)}
                      placeholder="Enter form description"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={createForm}>Create</Button>
                    <Button variant="outline" onClick={() => setIsCreatingForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {forms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No forms created yet. Click "Create Form" to get started.
              </div>
            ) : (
              forms.map((form) => (
                <Card key={form.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{form.name}</h4>
                        {form.description && (
                          <p className="text-sm text-gray-600 mt-1">{form.description}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {form.fields.length} field{form.fields.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteForm(form.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormsSettings;
