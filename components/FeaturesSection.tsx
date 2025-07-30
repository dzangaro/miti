import React from 'react';
import { ShieldAlert, Database, Wifi, Bell, CloudLightning, Key } from 'lucide-react';
const FeaturesSection = () => {
  const features = [{
    icon: ShieldAlert,
    title: "Risk Identification",
    description: "Automatically identify potential risks from IoT device alerts before they become claims."
  }, {
    icon: Bell,
    title: "Smart Escalation",
    description: "Intelligently escalate alerts based on severity, patterns, and historical data."
  }, {
    icon: Database,
    title: "Unified Data Platform",
    description: "Consolidate data from thousands of IoT sensors and devices into a single, actionable view."
  }, {
    icon: Wifi,
    title: "Device Integration",
    description: "Connect with any IoT ecosystem across residential, commercial, and industrial properties."
  }, {
    icon: CloudLightning,
    title: "Predictive Analytics",
    description: "Leverage AI to predict potential incidents before they occur based on sensor data patterns."
  }, {
    icon: Key,
    title: "Secure Architecture",
    description: "Enterprise-grade security with end-to-end encryption and compliance with insurance regulations."
  }];
  return <section id="features" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming IoT Data into Proactive Risk Management</h2>
          <p className="text-lg text-gray-600">miti gives insurance carriers the tools to prevent claims before they happen and protect policyholders in real-time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <div key={index} className="feature-card group">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default FeaturesSection;