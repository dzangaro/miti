
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AlertSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AlertSearch = ({
  searchQuery,
  setSearchQuery
}: AlertSearchProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">Risk Alerts</h1>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="h-4 w-4 absolute top-2.5 left-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Button onClick={() => navigate('/cases')}>View Cases</Button>
      </div>
    </div>
  );
};

export default AlertSearch;
