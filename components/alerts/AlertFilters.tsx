
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface AlertFiltersProps {
  activeTab: 'main' | 'investigation' | 'closed';
  setActiveTab: (tab: 'main' | 'investigation' | 'closed') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AlertFilters = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}: AlertFiltersProps) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="inline-flex bg-white border rounded-lg p-1">
        <Button
          variant={activeTab === 'main' ? 'default' : 'ghost'}
          className={`rounded-md ${activeTab === 'main' ? '' : 'text-gray-600'}`}
          onClick={() => setActiveTab('main')}
        >
          Main Channel
        </Button>
        <Button
          variant={activeTab === 'investigation' ? 'default' : 'ghost'}
          className={`rounded-md ${activeTab === 'investigation' ? '' : 'text-gray-600'}`}
          onClick={() => setActiveTab('investigation')}
        >
          Investigation Channel
        </Button>
        <Button
          variant={activeTab === 'closed' ? 'default' : 'ghost'}
          className={`rounded-md ${activeTab === 'closed' ? '' : 'text-gray-600'}`}
          onClick={() => setActiveTab('closed')}
        >
          Closed Alerts
        </Button>
      </div>
    </div>
  );
};

export default AlertFilters;
