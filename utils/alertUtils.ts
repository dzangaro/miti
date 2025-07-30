
export const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'text-red-600';
    case 'high': return 'text-orange-500';
    case 'medium': return 'text-yellow-500';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
};

// Generate random alert data
export const generateAlerts = (count: number): Alert[] => {
  const alertTypes = [
    'Water Leak', 
    'Smoke Detection', 
    'Temperature Spike', 
    'Humidity Anomaly', 
    'Motion Detection', 
    'Structural Movement', 
    'Pressure Anomaly',
    'Natural Gas Detection',
    'Carbon Monoxide',
    'Freezing Condition'
  ];
  const locations = [
    'Los Angeles, CA 90024', 
    'New York, NY 10001', 
    'Chicago, IL 60601', 
    'Houston, TX 77001', 
    'Miami, FL 33101', 
    'Seattle, WA 98101',
    'Boston, MA 02108',
    'Denver, CO 80202'
  ];
  const names = [
    'John Smith', 
    'Maria Rodriguez', 
    'David Johnson', 
    'Sarah Kim', 
    'Robert Chen', 
    'Jennifer Williams', 
    'Michael Brown',
    'Lisa Garcia',
    'James Wilson'
  ];
  const severities = ['Critical', 'High', 'Medium', 'Low'];
  const sources = [
    'Smart Water Sensor', 
    'Temperature Monitor', 
    'Smoke Detector', 
    'Humidity Sensor', 
    'Motion Detector',
    'Structural Monitor',
    'Pressure Sensor',
    'Gas Detector'
  ];
  const statuses = ['active', 'investigation', 'closed'] as const;

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
    expanded: false,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    notes: Math.random() > 0.5 ? 'Additional investigation required due to suspicious sensor readings.' : undefined
  }));
};

import { Alert } from '@/types/alerts';
