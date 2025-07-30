
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, Home, Bell, FileText } from 'lucide-react';

type SidebarProps = {
  userRole?: 'admin' | 'analyst' | 'read-only';
};

const DashboardSidebar: React.FC<SidebarProps> = ({ userRole = 'read-only' }) => {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white">
      <div className="flex items-center h-16 px-6">
        <NavLink to="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-[#221F26] font-extrabold">miti</span>
          </span>
        </NavLink>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          <SidebarLink to="/dashboard" icon={<Home className="h-5 w-5" />} text="Dashboard" />
          <SidebarLink to="/alerts" icon={<Bell className="h-5 w-5" />} text="Alerts" />
          <SidebarLink to="/cases" icon={<FileText className="h-5 w-5" />} text="Cases" />
        </nav>
      </div>
    </aside>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'text-[#221F26] bg-gray-100'
            : 'text-gray-600 hover:text-[#221F26] hover:bg-gray-50'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className="mr-3">{icon}</span>
          <span className="flex-1">{text}</span>
          {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
        </>
      )}
    </NavLink>
  );
};

export default DashboardSidebar;
