
import { useState } from 'react';
import { Alert } from '@/types/alerts';
import { generateAlerts } from '@/utils/alertUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const useAlerts = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts(50));
  const [activeTab, setActiveTab] = useState<'main' | 'investigation' | 'closed'>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAlerts, setExpandedAlerts] = useState<Record<number, boolean>>({});

  // Filter alerts based on the active tab
  const filteredAlerts = alerts.filter(alert => {
    const matchesTab = 
      (activeTab === 'main' && alert.status === 'active') ||
      (activeTab === 'investigation' && alert.status === 'investigation') ||
      (activeTab === 'closed' && alert.status === 'closed');
    
    // Also filter by search query if present
    const matchesSearch = searchQuery === '' || 
      alert.alertType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const toggleAlertExpanded = (id: number) => {
    setExpandedAlerts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const moveToInvestigation = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'investigation' } : alert
    ));
    
    toast({
      title: "Alert moved to investigation",
      description: `Alert #${id} has been moved to the investigation channel.`
    });
  };

  const closeAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'closed' } : alert
    ));
    
    toast({
      title: "Alert closed",
      description: `Alert #${id} has been closed.`
    });
  };

  const reopenAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'investigation' } : alert
    ));
    
    toast({
      title: "Alert reopened",
      description: `Alert #${id} has been reopened for investigation.`
    });
  };

  const createCase = (id: number) => {
    // In a real app, this would create a case and persist it
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'closed' } : alert
    ));
    
    toast({
      title: "Case created",
      description: `Case created from alert #${id}. Alert has been closed.`
    });
    
    // Navigate to cases page
    navigate('/cases');
  };

  return {
    alerts,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredAlerts,
    expandedAlerts,
    toggleAlertExpanded,
    moveToInvestigation,
    closeAlert,
    reopenAlert,
    createCase
  };
};
