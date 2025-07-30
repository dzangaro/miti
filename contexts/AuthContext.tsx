import React, { createContext, useContext, useEffect, useState } from 'react';

// Define user type
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'read-only';
  tenantId: string; // This will be derived from email domain or explicitly set
  username: string; // Add username property
};

// Define tenant type
export type Tenant = {
  id: string;
  name: string;
  domain: string;
};

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasConfiguredDataSource: boolean;
  setHasConfiguredDataSource: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasConfiguredDataSource, setHasConfiguredDataSource] = useState(false);

  // On mount, check for existing user session
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    // Check if tenant has configured data source
    const dataSourceConfigured = localStorage.getItem('hasConfiguredDataSource');
    if (dataSourceConfigured) {
      setHasConfiguredDataSource(JSON.parse(dataSourceConfigured));
    }
    
    setLoading(false);
  }, []);

  // Helper to get tenant ID from email domain
  const getTenantIdFromEmail = (email: string): string => {
    const domain = email.split('@')[1];
    return domain;
  };

  // Helper to get username from email
  const getUsernameFromEmail = (email: string): string => {
    return email.split('@')[0];
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching email and password
      const user = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Set current user
      const loggedInUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as 'admin' | 'analyst' | 'read-only',
        tenantId: user.tenantId || getTenantIdFromEmail(user.email),
        username: user.username || getUsernameFromEmail(user.email),
      };
      
      setCurrentUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

      // Check if tenant has configured data source
      const tenants = JSON.parse(localStorage.getItem('tenants') || '[]');
      const userTenant = tenants.find((t: Tenant) => t.id === loggedInUser.tenantId);
      if (userTenant && userTenant.hasConfiguredDataSource) {
        setHasConfiguredDataSource(true);
        localStorage.setItem('hasConfiguredDataSource', JSON.stringify(true));
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Get tenantId from email domain
      const tenantId = getTenantIdFromEmail(email);
      
      // Check if this is the first user in this tenant
      const tenantUsers = users.filter((u: any) => 
        getTenantIdFromEmail(u.email) === tenantId
      );
      
      // Determine role - first user in tenant is Admin
      const role: 'admin' | 'analyst' | 'read-only' = tenantUsers.length === 0 ? 'admin' : 'read-only';
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this would be hashed
        role,
        tenantId,
        username: getUsernameFromEmail(email),
      };
      
      // Add user to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // If this is the first user in the tenant, create the tenant
      if (tenantUsers.length === 0) {
        const tenants = JSON.parse(localStorage.getItem('tenants') || '[]');
        const domain = email.split('@')[1];
        const newTenant = {
          id: tenantId,
          name: domain.split('.')[0],
          domain,
          hasConfiguredDataSource: false
        };
        tenants.push(newTenant);
        localStorage.setItem('tenants', JSON.stringify(tenants));
      }
      
      // Log in the new user
      const loggedInUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        tenantId: newUser.tenantId,
        username: newUser.username,
      };
      
      setCurrentUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Effect to update hasConfiguredDataSource in localStorage
  useEffect(() => {
    localStorage.setItem('hasConfiguredDataSource', JSON.stringify(hasConfiguredDataSource));
  }, [hasConfiguredDataSource]);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    hasConfiguredDataSource,
    setHasConfiguredDataSource,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
