
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useAuth, User } from '@/contexts/AuthContext';

interface GeneralSettingsProps {
  currentUser: User;
}

const GeneralSettings = ({ currentUser }: GeneralSettingsProps) => {
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const { currentUser: authUser } = useAuth();

  const handleSaveChanges = () => {
    if (!authUser) return;
    
    // Get all users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find and update current user
    const updatedUsers = users.map((user: any) => {
      if (user.id === authUser.id) {
        return {
          ...user,
          name,
          email
        };
      }
      return user;
    });
    
    // Update users in localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update currentUser in context (would be through API in real app)
    const updatedCurrentUser = {
      ...authUser,
      name,
      email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    
    toast({
      title: "Settings saved",
      description: "Your profile changes have been saved successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
            disabled
          />
        </div>
        
        <Button onClick={handleSaveChanges} className="mt-4">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
