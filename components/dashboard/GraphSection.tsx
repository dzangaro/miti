
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const generateRandomData = (points: number) => {
  const data = [];
  
  for (let i = 0; i < points; i++) {
    data.push({
      name: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 10) + 1
    });
  }
  
  return data;
};

const generateTimeSeriesData = (points: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      value: Math.floor(Math.random() * 1000)
    });
  }
  
  return data;
};

const GraphSection = () => {
  const alertData = generateRandomData(10);
  const trafficData = generateTimeSeriesData(14);
  
  const chartConfig = {
    alerts: {
      label: "Property Alerts",
      color: "#9b87f5" // Using a purple from the palette
    },
    readings: {
      label: "Sensor Readings",
      color: "#33c3f0" // Using a blue from the palette
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800">Graphs</h2>
        <div className="flex space-x-2">
          <Input 
            type="text" 
            placeholder="Search for a metric" 
            className="max-w-xs"
          />
          <Button variant="outline">Sort By</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <CardHeader className="pb-0 pt-3">
            <CardTitle className="text-sm font-medium">Water Leak Alerts Per Month</CardTitle>
          </CardHeader>
          <CardContent className="p-3 h-56">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={alertData}
                  margin={{ top: 5, right: 10, left: 5, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11 }}
                    height={30}
                    tickMargin={10}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    width={30}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '10px' }}
                    verticalAlign="top"
                    height={18}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent>
                            <div className="text-sm font-medium">
                              {payload[0].payload.name}
                            </div>
                            <div className="text-xs">
                              Value: {payload[0].value}
                            </div>
                          </ChartTooltipContent>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    name="Water Leak Alerts"
                    type="monotone" 
                    dataKey="value" 
                    stroke="#9b87f5" 
                    fill="#e5deff" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-0 pt-3">
            <CardTitle className="text-sm font-medium">Temperature Anomalies</CardTitle>
          </CardHeader>
          <CardContent className="p-3 h-56">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={trafficData}
                  margin={{ top: 5, right: 10, left: 5, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 11 }}
                    height={30}
                    tickMargin={10}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }}
                    width={30}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '10px' }}
                    verticalAlign="top"
                    height={18}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent>
                            <div className="text-sm font-medium">
                              {payload[0].payload.date}
                            </div>
                            <div className="text-xs">
                              Value: {payload[0].value}
                            </div>
                          </ChartTooltipContent>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    name="Temperature Readings"
                    type="monotone" 
                    dataKey="value" 
                    stroke="#33c3f0" 
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mt-2">
        <Button variant="outline" size="sm">
          View More
        </Button>
      </div>
    </div>
  );
};

export default GraphSection;
