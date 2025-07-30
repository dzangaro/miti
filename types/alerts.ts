
export type Alert = {
  id: number;
  severity: string;
  alertType: string;
  location: string;
  timestamp: string;
  policyNumber: string;
  assignedTo: string;
  contactPhone: string;
  source: string;
  expanded: boolean;
  status: 'active' | 'investigation' | 'closed';
  notes?: string;
};
