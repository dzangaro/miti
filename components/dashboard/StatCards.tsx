
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

// This would come from your backend API in a real app
const generateRandomMetrics = () => {
  return {
    waterLeakAlerts: Math.floor(Math.random() * 500) + 100, 
    temperatureAlerts: Math.floor(Math.random() * 300) + 50,
    smokeAlerts: Math.floor(Math.random() * 100),
    criticalPropertyIssues: Math.floor(Math.random() * 50),
    totalPropertiesMonitored: Math.floor(Math.random() * 10000) + 5000,
    activePropertySensors: Math.floor(Math.random() * 1000) + 500,
    telematicsAlerts: Math.floor(Math.random() * 500) + 100,
    totalAlerts: Math.floor(Math.random() * 1000) + 500
  };
};

const StatCards = () => {
  const metrics = generateRandomMetrics();

  const statCards = [
    {
      title: "Water Sensor Alerts",
      value: metrics.waterLeakAlerts,
      description: "20% from last month"
    },
    {
      title: "Temperature Sensor Alerts",
      value: metrics.temperatureAlerts,
      description: "12% from last month"
    },
    {
      title: "Smoke Sensor Alerts",
      value: metrics.smokeAlerts,
      description: "5% from last hour"
    },
    {
      title: "Critical Property Issues",
      value: metrics.criticalPropertyIssues,
      description: "10% from last week"
    },
    {
      title: "Properties Monitored",
      value: metrics.totalPropertiesMonitored.toLocaleString(),
      description: "5% from last month"
    },
    {
      title: "Active Property Sensors",
      value: metrics.activePropertySensors,
      description: "8% from last week"
    },
    {
      title: "Telematics Alerts",
      value: metrics.telematicsAlerts,
      description: "15% from last month"
    },
    {
      title: "Total Alerts",
      value: metrics.totalAlerts,
      description: "3% from last week"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.slice(0, 8).map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;
