import React from 'react';
import { ArrowRight, AlertTriangle, ShieldAlert, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-white/20"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Proactive IoT Risk Intelligence for Insurers
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Transform IoT alerts into actionable insights. Mitigate risks before they become claims and protect your policyholders with real-time monitoring.
            </p>
            <div className="flex justify-center">
              <Button 
                className="bg-white text-[#221F26] hover:bg-white/90 text-base px-6 py-6 font-semibold"
                onClick={scrollToDemo}
              >
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ShieldAlert className="w-6 h-6 text-white mr-2" />
                    <h3 className="text-lg font-bold text-white">Alert Dashboard</h3>
                  </div>
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                    LIVE
                  </span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: AlertTriangle, level: "Critical", device: "Water Sensor", location: "Commercial Property #2347", time: "2 mins ago" },
                    { icon: AlertTriangle, level: "High", device: "Smoke Detector", location: "Residential Unit #1092", time: "5 mins ago" },
                    { icon: Database, level: "Medium", device: "Temperature Sensor", location: "Warehouse #087", time: "12 mins ago" },
                  ].map((alert, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/10 rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${idx === 0 ? 'bg-red-500/30' : idx === 1 ? 'bg-orange-500/30' : 'bg-yellow-500/30'} mr-3`}>
                          <alert.icon className={`h-5 w-5 ${idx === 0 ? 'text-red-400' : idx === 1 ? 'text-orange-400' : 'text-yellow-400'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium text-white">{alert.device}</span>
                            <span className={`text-xs font-medium ${idx === 0 ? 'text-red-300' : idx === 1 ? 'text-orange-300' : 'text-yellow-300'}`}>
                              {alert.level}
                            </span>
                          </div>
                          <div className="text-sm text-white/70">{alert.location}</div>
                          <div className="text-xs text-white/50 mt-1">{alert.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/40 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#221F26]/40 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
