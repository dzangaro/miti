
import React from 'react';
import { Button } from '@/components/ui/button';

interface AlertPaginationProps {
  filteredAlertsCount: number;
  activeTab: 'main' | 'investigation' | 'closed';
}

const AlertPagination = ({
  filteredAlertsCount,
  activeTab,
}: AlertPaginationProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <p className="text-sm text-gray-500">
        Showing {filteredAlertsCount} {activeTab === 'main' ? 'active' : activeTab} alerts
      </p>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
};

export default AlertPagination;
