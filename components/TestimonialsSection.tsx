
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, Eye, ShieldOff, TrendingUp, TrendingDown } from 'lucide-react';

const TestimonialsSection = () => {
  const riskOperationsBenefits = [
    {
      icon: <Eye className="h-10 w-10 text-[#221F26]" />,
      title: "Predict",
      description: "Leverage IoT data and advanced analytics to identify potential risks before they materialize, enabling proactive decision-making and resource allocation."
    },
    {
      icon: <ShieldOff className="h-10 w-10 text-[#221F26]" />,
      title: "Prevent",
      description: "Deploy targeted interventions based on predictive insights to stop incidents before they occur, reducing claim frequency and severity."
    },
    {
      icon: <ShieldAlert className="h-10 w-10 text-[#221F26]" />,
      title: "Mitigation",
      description: "Implement rapid response protocols when risks are detected, minimizing damage and limiting the impact of potential claims."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-[#221F26]" />,
      title: "Increased Customer Service",
      description: "Provide policyholders with real-time alerts and personalized recommendations, enhancing satisfaction and fostering long-term loyalty."
    },
    {
      icon: <TrendingDown className="h-10 w-10 text-[#221F26]" />,
      title: "Cost Relief",
      description: "Reduce overall claims expenses through preventative measures, optimizing premiums while maintaining comprehensive coverage."
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Insurance Risk Operations Center</h2>
          <p className="text-lg text-gray-600 mb-8">
            Transform your insurance operations with a centralized approach to risk management.
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-12">
            <h3 className="text-2xl font-bold mb-4 text-[#221F26]">What is a Risk Operations Center?</h3>
            <p className="text-gray-700 mb-4">
              A Risk Operations Center (ROC) is a centralized hub that integrates IoT data, analytics, and 
              automated response systems to revolutionize insurance risk management. It enables carriers to 
              <span className="font-semibold"> predict</span> potential incidents, <span className="font-semibold">prevent</span> claims before they occur, 
              implement real-time <span className="font-semibold">mitigation</span> strategies, deliver 
              <span className="font-semibold"> increased customer service</span>, and achieve significant 
              <span className="font-semibold"> cost relief</span> through reduced claims expenses.
            </p>
            <p className="text-gray-700">
              By transforming traditional reactive insurance models into proactive risk management frameworks, 
              a Risk Operations Center drives operational excellence while creating superior experiences for policyholders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {riskOperationsBenefits.map((benefit, index) => (
            <Card key={index} className="border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-gray-50 rounded-full">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#221F26]">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
