
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import { useAuth, User } from '@/contexts/AuthContext';

interface UserManagementProps {
  currentUser: User;
}

const UserManagement = ({ currentUser }: UserManagementProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'analyst' | 'read-only'>('read-only');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { currentUser: authUser } = useAuth();
  
  // Load users from localStorage filtering by tenant
  useEffect(() => {
    if (authUser) {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const tenantUsers = allUsers.filter((user: any) => user.tenantId === authUser.tenantId);
      setUsers(tenantUsers);
    }
  }, [authUser]);
  
  const handleInviteUser = () => {
    if (!firstName || !lastName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if email domain matches tenant (for multi-tenant security)
    if (authUser) {
      const domain = email.split('@')[1];
      const userDomain = authUser.email.split('@')[1];
      
      if (domain !== userDomain) {
        toast({
          title: "Domain mismatch",
          description: "You can only invite users from your organization's domain.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Get all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (allUsers.some((u: any) => u.email === email)) {
      toast({
        title: "User already exists",
        description: "A user with this email already exists.",
        variant: "destructive",
      });
      return;
    }
    
    // Create temporary password (in a real app, this would be a secure random string)
    const tempPassword = Math.random().toString(36).substring(2, 10);
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: `${firstName} ${lastName}`,
      username: email.split('@')[0],
      email,
      role,
      password: tempPassword,
      tenantId: authUser ? authUser.tenantId : '',
    };
    
    // Add user to users array
    allUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(allUsers));
    
    // Add user to local state
    setUsers([...users, newUser]);
    
    toast({
      title: "User invited",
      description: `${firstName} ${lastName} has been invited as a ${role}.`,
    });
    
    // Reset form
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('read-only');
    setInviteOpen(false);
  };
  
  const handleEditUser = () => {
    if (!editingUser) return;
    
    // Get all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Update user in localStorage
    const updatedAllUsers = allUsers.map((user: any) => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          name: editingUser.name,
          role: editingUser.role
        };
      }
      return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedAllUsers));
    
    // Update local state
    const updatedUsers = users.map(user => {
      if (user.id === editingUser.id) {
        return editingUser;
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    toast({
      title: "User updated",
      description: `${editingUser.name} has been updated.`,
    });
    
    setEditOpen(false);
    setEditingUser(null);
  };
  
  const handleRemoveUser = (userToRemove: User) => {
    // Don't allow removing yourself
    if (userToRemove.id === currentUser.id) {
      toast({
        title: "Cannot remove yourself",
        description: "You cannot remove your own account.",
        variant: "destructive",
      });
      return;
    }
    
    // Get all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Remove user from localStorage
    const updatedAllUsers = allUsers.filter((user: any) => user.id !== userToRemove.id);
    localStorage.setItem('users', JSON.stringify(updatedAllUsers));
    
    // Remove user from local state
    const updatedUsers = users.filter(user => user.id !== userToRemove.id);
    setUsers(updatedUsers);
    
    toast({
      title: "User removed",
      description: `${userToRemove.name} has been removed.`,
    });
  };
  
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditOpen(true);
  };
  
  // Check if current user is an admin
  if (currentUser.role !== 'admin') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            You need administrator privileges to manage users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please contact your administrator for user management.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage users and their permissions
            </CardDescription>
          </div>
          <Button onClick={() => setInviteOpen(true)} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Invite User
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditModal(user)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveUser(user)}
                      disabled={user.id === currentUser.id}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    No users found. Invite some users to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invite User Sheet */}
      <Sheet open={inviteOpen} onOpenChange={setInviteOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Invite New User</SheetTitle>
            <SheetDescription>
              Invite a new user to your organization. They will receive an email with instructions to set up their account.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <RadioGroup value={role} onValueChange={(val) => setRole(val as 'admin' | 'analyst' | 'read-only')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="read-only" id="read-only" />
                  <Label htmlFor="read-only">Read Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="analyst" id="analyst" />
                  <Label htmlFor="analyst">Analyst</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <SheetFooter>
            <Button onClick={handleInviteUser}>Send Invitation</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit User Sheet */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit User</SheetTitle>
            <SheetDescription>
              Update user information and permissions.
            </SheetDescription>
          </SheetHeader>
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Full Name</Label>
                <Input
                  id="editName"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editingUser.email}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <RadioGroup 
                  value={editingUser.role} 
                  onValueChange={(val) => setEditingUser({...editingUser, role: val as 'admin' | 'analyst' | 'read-only'})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="read-only" id="edit-read-only" />
                    <Label htmlFor="edit-read-only">Read Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="analyst" id="edit-analyst" />
                    <Label htmlFor="edit-analyst">Analyst</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="edit-admin" />
                    <Label htmlFor="edit-admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
          <SheetFooter>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserManagement;
