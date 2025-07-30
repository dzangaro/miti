
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth, User as AuthUser } from '@/contexts/AuthContext';

interface DashboardHeaderProps {
  user: AuthUser;
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
    });
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 w-full">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="font-bold">Dashboard</span>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 px-3 py-2">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg border rounded-md p-2 min-w-[120px]">
                  <div className="flex flex-col">
                    <Link 
                      to="/accounts" 
                      className="px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      Survey
                    </Link>
                    <Link 
                      to="/alerts" 
                      className="px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      Alerts
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link 
            to="/market" 
            className="text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Market
          </Link>
        </div>

        <div className="flex items-center ml-auto">
          <div className="relative mx-4">
            <Search className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search the site..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#221F26] focus:border-transparent"
            />
          </div>

          <Button variant="ghost" size="icon" className="mr-2">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 focus:ring-0">
                <span className="hidden md:inline-block">{user.name}</span>
                <Avatar className="h-8 w-8 bg-[#221F26] text-white">
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 mt-1">@{user.username}</p>
                <p className="text-xs text-gray-500 mt-1 capitalize">Role: {user.role}</p>
              </div>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
