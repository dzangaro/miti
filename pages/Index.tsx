
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FooterSection from '@/components/FooterSection';
import RequestDemoForm from '@/components/RequestDemoForm';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        
        {/* Call to Action Section */}
        <section id="demo-section" className="section-padding bg-primary text-white">
          <div className="container mx-auto container-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Risk Management?</h2>
                <p className="text-lg mb-8 text-white/90 max-w-xl">
                  Join the leading insurance carriers who are using Miti to prevent claims before they happen and provide a superior experience for their policyholders.
                </p>
                <div className="space-y-4">
                  {[
                    "Reduce claims with proactive risk monitoring",
                    "Improve policyholder satisfaction and retention",
                    "Decrease operational costs through automated risk response",
                    "Enhance risk pricing models with real-time IoT data"
                  ].map((point, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <ArrowRight className="h-5 w-5 text-accent" />
                      </div>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <RequestDemoForm />
            </div>
          </div>
        </section>
      </main>
      
      <FooterSection />
    </div>
  );
};

export default Index;
