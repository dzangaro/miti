
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Droplets, Thermometer, Car, Home } from 'lucide-react';

interface CasePlaybookProps {
  riskType: string;
  sensorType: string;
}

const CasePlaybook = ({ riskType, sensorType }: CasePlaybookProps) => {
  const getPlaybookSteps = () => {
    switch (riskType.toLowerCase()) {
      case 'water leak':
        return {
          icon: <Droplets className="h-6 w-6 text-blue-500" />,
          title: 'Water Leak Response Playbook',
          steps: [
            {
              step: 1,
              title: 'Locate the Leak',
              description: 'Identify the source of the water. Is it a pipe, appliance, or roof? What room is the sensor locating to? Is the water visible?',
              priority: 'critical'
            },
            {
              step: 2,
              title: 'Shut Off the Water Supply',
              description: 'If the leak is from the plumbing system, shut off the main water valve to the house. CONTAINMENT activities need fleshed out.',
              priority: 'critical'
            },
            {
              step: 3,
              title: 'Prevent Further Damage',
              description: 'Place buckets or towels under the leak to catch water. Contact a plumber to fix the leak ASAP (insurance should consider a low limit to eat these costs).',
              priority: 'high'
            },
            {
              step: 4,
              title: 'Turn Off Power',
              description: 'If the basement is flooding, consider turning off the electricity to prevent damage.',
              priority: 'high'
            },
            {
              step: 5,
              title: 'Document Damage',
              description: 'Take photos of the affected area and any damaged items for insurance claims.',
              priority: 'medium'
            },
            {
              step: 6,
              title: 'Contact Insurance',
              description: 'Notify the insurance company and begin the claims process.',
              priority: 'medium'
            }
          ]
        };
      
      case 'temperature anomaly':
        return {
          icon: <Thermometer className="h-6 w-6 text-red-500" />,
          title: 'Temperature Anomaly Response Playbook',
          steps: [
            {
              step: 1,
              title: 'Assess HVAC System',
              description: 'Check if heating or cooling systems are functioning properly. Verify thermostat settings.',
              priority: 'high'
            },
            {
              step: 2,
              title: 'Check for Insulation Issues',
              description: 'Inspect doors, windows, and insulation for gaps that could cause temperature fluctuations.',
              priority: 'medium'
            },
            {
              step: 3,
              title: 'Prevent Pipe Freezing',
              description: 'If temperature is below freezing, ensure pipes are protected to prevent bursting.',
              priority: 'critical'
            },
            {
              step: 4,
              title: 'Monitor Energy Usage',
              description: 'Track energy consumption to identify efficiency issues or system malfunctions.',
              priority: 'low'
            }
          ]
        };
      
      case 'vehicle impact':
        return {
          icon: <Car className="h-6 w-6 text-orange-500" />,
          title: 'Vehicle Impact Response Playbook',
          steps: [
            {
              step: 1,
              title: 'Assess Safety',
              description: 'Ensure area is safe and no immediate danger to occupants or passersby.',
              priority: 'critical'
            },
            {
              step: 2,
              title: 'Check for Injuries',
              description: 'Verify if anyone was injured and call emergency services if needed.',
              priority: 'critical'
            },
            {
              step: 3,
              title: 'Document the Scene',
              description: 'Take photos of vehicle damage, property damage, and the accident scene.',
              priority: 'high'
            },
            {
              step: 4,
              title: 'Secure the Vehicle',
              description: 'Arrange for vehicle removal if it poses a hazard or blocks access.',
              priority: 'medium'
            }
          ]
        };
      
      default:
        return {
          icon: <Home className="h-6 w-6 text-gray-500" />,
          title: 'General Property Risk Response Playbook',
          steps: [
            {
              step: 1,
              title: 'Assess the Situation',
              description: 'Evaluate the immediate risk and determine if emergency services are needed.',
              priority: 'high'
            },
            {
              step: 2,
              title: 'Secure the Area',
              description: 'Make the area safe and prevent further damage if possible.',
              priority: 'high'
            },
            {
              step: 3,
              title: 'Document Everything',
              description: 'Take photos and notes of the damage and conditions.',
              priority: 'medium'
            }
          ]
        };
    }
  };

  const playbook = getPlaybookSteps();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {playbook.icon}
          {playbook.title}
        </CardTitle>
        <CardDescription>
          Follow these steps to mitigate the risk identified by the {sensorType} sensor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {playbook.steps.map((step) => (
            <div
              key={step.step}
              className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(step.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-gray-700 mt-1">{step.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full capitalize ${
                    step.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    step.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    step.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {step.priority} Priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CasePlaybook;
