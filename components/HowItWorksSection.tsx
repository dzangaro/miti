
import React from 'react';
import { CheckCircle, AlertTriangle, ShieldAlert, Database, Smartphone, Siren } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "IoT Device Monitoring",
      description: "Connect IoT devices from homes, businesses, and industrial properties to our platform."
    },
    {
      icon: AlertTriangle,
      title: "Alert Processing",
      description: "Our system processes thousands of alerts per second, filtering out noise and identifying critical issues."
    },
    {
      icon: Database,
      title: "Risk Analysis",
      description: "Machine learning algorithms analyze alerts against historical data to determine risk levels."
    },
    {
      icon: ShieldAlert,
      title: "Intelligent Escalation",
      description: "High-risk alerts are automatically prioritized for immediate intervention."
    },
    {
      icon: Siren,
      title: "Run the Playbook",
      description: "Trigger automated responses or notify teams for manual intervention based on alert severity."
    },
    {
      icon: CheckCircle,
      title: "Risk Mitigation",
      description: "Prevent claims by addressing potential incidents before they cause damage or harm."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How miti Works</h2>
          <p className="text-lg text-gray-600">
            Our platform transforms IoT data into actionable intelligence through a comprehensive workflow that prioritizes proactive risk management.
          </p>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                <div className="md:w-12 flex justify-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  {/* Decorative empty div to maintain layout */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
