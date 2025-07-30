
// User type definition
export type User = {
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'analyst' | 'read-only';
};

// Check if a user has a specific permission based on their role
export const hasPermission = (user: User | null, permission: 'manage_users' | 'edit_data' | 'view_data'): boolean => {
  if (!user) return false;
  
  const rolePermissions = {
    'admin': ['manage_users', 'edit_data', 'view_data'],
    'analyst': ['edit_data', 'view_data'],
    'read-only': ['view_data']
  };
  
  return rolePermissions[user.role].includes(permission);
};

// Check if current user exists and is authenticated
export const isAuthenticated = (): boolean => {
  const userJson = localStorage.getItem('currentUser');
  return !!userJson;
};

// Get the current user from localStorage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Initialize admin user if no users exist yet
export const initializeDefaultAdminIfNeeded = (): void => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (users.length === 0) {
    const adminUser = {
      name: 'System Administrator',
      username: 'admin',
      email: 'admin@example.com',
      password: 'Admin123!',
      role: 'admin',
    };
    
    localStorage.setItem('users', JSON.stringify([adminUser]));
  }
};

// Check if user is admin
export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

// Update first user to admin if they aren't already
export const ensureFirstUserIsAdmin = (): void => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (users.length === 1 && users[0].role !== 'admin') {
    users[0].role = 'admin';
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user if it's the same person
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email === users[0].email) {
      currentUser.role = 'admin';
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }
};
