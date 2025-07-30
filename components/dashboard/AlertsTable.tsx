import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Generate random alert data
const generateRandomAlerts = (count: number) => {
  const alertTypes = ['Water Leak', 'Smoke Detection', 'Temperature Spike', 'Humidity Anomaly', 'Motion Detection', 'Structural Movement', 'Pressure Anomaly'];
  const locations = ['Los Angeles, CA 90024', 'New York, NY 10001', 'Chicago, IL 60601', 'Houston, TX 77001', 'Miami, FL 33101', 'Seattle, WA 98101'];
  const names = ['John Smith', 'Maria Rodriguez', 'David Johnson', 'Sarah Kim', 'Robert Chen', 'Jennifer Williams', 'Michael Brown'];
  const severities = ['Critical', 'High', 'Medium', 'Low'];
  const sources = ['IoT Sensor Network', 'Smart Building System', 'Property Sensors', 'Environment Monitor', 'Weather Station'];

  return Array.from({ length: count }, (_, i) => ({
    id: Math.floor(Math.random() * 900) + 100,
    severity: severities[Math.floor(Math.random() * severities.length)],
    alertType: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    assignedTo: names[Math.floor(Math.random() * names.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleString(),
    policyNumber: `POL-${Math.floor(Math.random() * 10000000)}`,
    contactPhone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 10000)}`,
    expanded: false
  }));
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'text-red-600';
    case 'high': return 'text-orange-500';
    case 'medium': return 'text-yellow-500';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
};

const AlertsTable = () => {
  const [allAlerts] = useState(generateRandomAlerts(10));
  const [activeFilter, setActiveFilter] = useState<string>('All Alerts');
  const [expandedAlertId, setExpandedAlertId] = useState<number | null>(null);
  
  const filteredAlerts = React.useMemo(() => {
    if (activeFilter === 'All Alerts') {
      return allAlerts;
    } else if (activeFilter === 'Critical Severity') {
      return allAlerts.filter(alert => alert.severity === 'Critical');
    } else if (activeFilter === 'High Severity') {
      return allAlerts.filter(alert => alert.severity === 'High');
    }
    return allAlerts;
  }, [allAlerts, activeFilter]);

  const toggleExpanded = (id: number) => {
    setExpandedAlertId(expandedAlertId === id ? null : id);
  };

  const moveToInvestigation = (id: number) => {
    // This would connect to a backend API in a real application
    toast({
      title: "Alert moved to investigation",
      description: `Alert #${id} has been moved to the investigation channel.`
    });
  };

  const filters = ['All Alerts', 'Critical Severity', 'High Severity'];

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="p-4 border-b flex overflow-x-auto gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className="whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Alert Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Assigned To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <React.Fragment key={alert.id}>
                <TableRow className="hover:bg-gray-50">
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleExpanded(alert.id)}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedAlertId === alert.id ? 'transform rotate-180' : ''}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </TableCell>
                  <TableCell>{alert.alertType}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{alert.location}</TableCell>
                  <TableCell>{alert.assignedTo}</TableCell>
                </TableRow>
                
                {expandedAlertId === alert.id && (
                  <TableRow>
                    <TableCell colSpan={5} className="bg-gray-50 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Alert Details</p>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Severity Level:</span>
                              <span className={`col-span-2 ${getSeverityColor(alert.severity)}`}>{alert.severity}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Alert ID:</span>
                              <span className="col-span-2">{alert.id}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Time:</span>
                              <span className="col-span-2">{alert.timestamp}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Location:</span>
                              <span className="col-span-2">{alert.location}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Alert Source:</span>
                              <span className="col-span-2">{alert.source}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Alert Type:</span>
                              <span className="col-span-2">{alert.alertType}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-1">Insured Information</p>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Policy Number:</span>
                              <span className="col-span-2">{alert.policyNumber}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Insured / Contact:</span>
                              <span className="col-span-2">{alert.assignedTo}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <span className="font-medium text-gray-500">Phone Number:</span>
                              <span className="col-span-2">{alert.contactPhone}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <Button 
                              onClick={() => moveToInvestigation(alert.id)}
                              className="bg-[#221F26] hover:bg-[#221F26]/90"
                            >
                              Move to Investigation
                            </Button>
                            <Button variant="outline">
                              Close as False Positive
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No alerts match the selected filter.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <p className="text-sm text-gray-500">
          Showing {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
          {activeFilter !== 'All Alerts' ? ` with ${activeFilter.toLowerCase()}` : ''}
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
    </div>
  );
};

export default AlertsTable;
