
import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  category: 'Water Sensors' | 'Telematics' | 'Temperature Sensors';
  description: string;
  rating: number;
  reviews: number;
  price: string;
  features: string[];
  imageUrl?: string;
}

const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'AquaGuard Pro',
    category: 'Water Sensors',
    description: 'Advanced water leak detection system with real-time alerts and smartphone integration.',
    rating: 4.5,
    reviews: 127,
    price: '$299/unit',
    features: ['Real-time monitoring', 'Mobile alerts', 'Battery backup', 'Easy installation']
  },
  {
    id: '2',
    name: 'FleetTracker Elite',
    category: 'Telematics',
    description: 'Comprehensive vehicle tracking and fleet management solution with driver behavior monitoring.',
    rating: 4.8,
    reviews: 89,
    price: '$45/month per vehicle',
    features: ['GPS tracking', 'Driver scoring', 'Maintenance alerts', 'Route optimization']
  },
  {
    id: '3',
    name: 'TempMaster 360',
    category: 'Temperature Sensors',
    description: 'Industrial-grade temperature monitoring system for cold storage and sensitive environments.',
    rating: 4.3,
    reviews: 203,
    price: '$199/sensor',
    features: ['Wide temperature range', 'Data logging', 'Alarm notifications', 'Cloud dashboard']
  },
  {
    id: '4',
    name: 'HydroSense Smart',
    category: 'Water Sensors',
    description: 'Smart water monitoring solution for commercial properties with predictive analytics.',
    rating: 4.6,
    reviews: 156,
    price: '$450/system',
    features: ['Predictive analytics', 'Multi-zone monitoring', 'Integration ready', 'Professional installation']
  },
];

const Market = () => {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  const categories = ['all', 'Water Sensors', 'Telematics', 'Temperature Sensors'];
  const filteredVendors = selectedCategory === 'all' 
    ? mockVendors 
    : mockVendors.filter(vendor => vendor.category === selectedCategory);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar userRole={currentUser.role} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={currentUser} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">Vendor Marketplace</h1>
              <p className="text-gray-600">Discover and integrate new risk mitigation technologies</p>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Vendor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{vendor.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {vendor.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {renderStars(vendor.rating)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {vendor.rating} ({vendor.reviews} reviews)
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                      <div className="space-y-1">
                        {vendor.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg">{vendor.price}</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Learn More
                        </Button>
                        <Button size="sm">
                          Request Demo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVendors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No vendors found in this category.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Market;
