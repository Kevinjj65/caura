import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- TYPE DEFINITIONS ---
// Defines the structure for a single data point in our charts
type EmissionDataPoint = {
  name: string;
  emissions: number; // in tonnes of CO2e
  credits: number; // in tonnes of CO2e
};

// --- MOCK DATA ---
// In a real application, this data would be fetched from your backend API.
const generateMockData = (period: 'daily' | 'weekly' | 'monthly') => {
  let data: EmissionDataPoint[] = [];
  const now = new Date();
  switch (period) {
    case 'daily':
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        data.push({
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          emissions: Math.floor(Math.random() * 50 + 10), // Random emissions between 10 and 60
          credits: Math.floor(Math.random() * 30 + 5),   // Random credits generated/bought
        });
      }
      break;
    case 'weekly':
      for (let i = 3; i >= 0; i--) {
        data.push({
          name: `Week ${4 - i}`,
          emissions: Math.floor(Math.random() * 300 + 100),
          credits: Math.floor(Math.random() * 200 + 50),
        });
      }
      break;
    case 'monthly':
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(now.getMonth() - i);
        data.push({
          name: date.toLocaleDateString('en-US', { month: 'short' }),
          emissions: Math.floor(Math.random() * 1200 + 500),
          credits: Math.floor(Math.random() * 800 + 200),
        });
      }
      break;
  }
  return data;
};

const EMISSION_LIMIT = 45; // Daily limit in tonnes of CO2e for alert purposes

// --- HELPER COMPONENTS ---

// A reusable card component for displaying key metrics
const MetricCard: React.FC<{ title: string; value: string; unit: string; change?: string; changeType?: 'increase' | 'decrease' }> = ({ title, value, unit, change, changeType }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1">
    <p className="text-sm text-gray-500">{title}</p>
    <div className="flex items-baseline space-x-2 mt-2">
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-lg text-gray-600">{unit}</p>
    </div>
    {change && (
      <p className={`text-xs mt-1 ${changeType === 'increase' ? 'text-red-500' : 'text-green-500'}`}>
        {change}
      </p>
    )}
  </div>
);

// A reusable button for the time period toggle
const TimeFrameButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-blue-500 text-white shadow-md'
        : 'bg-white text-gray-600 hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);


// --- MAIN DASHBOARD COMPONENT ---

const Home: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [chartData, setChartData] = useState<EmissionDataPoint[]>([]);

  // Effect to update chart data when the time frame changes
  useEffect(() => {
    // Simulating an API call
    setChartData(generateMockData(timeFrame));
  }, [timeFrame]);

  // useMemo to calculate metrics only when data changes, improving performance
  const { netBalance, emissionsExceeded, latestEmission } = useMemo(() => {
    if (chartData.length === 0) {
      return { netBalance: 0, emissionsExceeded: false, latestEmission: 0 };
    }
    const totalEmissions = chartData.reduce((acc, item) => acc + item.emissions, 0);
    const totalCredits = chartData.reduce((acc, item) => acc + item.credits, 0);
    const latestEmissionValue = chartData[chartData.length - 1].emissions;

    return {
      netBalance: totalCredits - totalEmissions,
      emissionsExceeded: timeFrame === 'daily' && latestEmissionValue > EMISSION_LIMIT,
      latestEmission: latestEmissionValue,
    };
  }, [chartData, timeFrame]);


  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Company Dashboard</h1>
          <p className="text-md text-gray-500 mt-1">Welcome back, here's your carbon credit overview.</p>
        </header>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard 
            title="Net Balance" 
            value={netBalance.toLocaleString()} 
            unit="Credits" 
            change={netBalance > 0 ? `+${netBalance}` : `${netBalance}`}
            changeType={netBalance > 0 ? 'decrease' : 'increase'}
          />
          <MetricCard 
            title="Total Credits Owned" 
            value="12,450" 
            unit="Credits"
          />
          <MetricCard 
            title="Estimated Portfolio Value" 
            value="$249,000" 
            unit="USD"
            change="+2.5% this month"
            changeType="decrease"
          />
        </div>

        {/* Live Net Emissions Chart Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Live Net Emissions</h2>
              <p className="text-sm text-gray-500">Track your company's emissions vs. credits acquired.</p>
            </div>
            <div className="flex space-x-2 mt-4 sm:mt-0 bg-gray-100 p-1 rounded-lg">
              <TimeFrameButton label="Daily" isActive={timeFrame === 'daily'} onClick={() => setTimeFrame('daily')} />
              <TimeFrameButton label="Weekly" isActive={timeFrame === 'weekly'} onClick={() => setTimeFrame('weekly')} />
              <TimeFrameButton label="Monthly" isActive={timeFrame === 'monthly'} onClick={() => setTimeFrame('monthly')} />
            </div>
          </div>

          {/* Emission Limit Alert */}
          {emissionsExceeded && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
              <p className="font-bold">Alert: Emissions Limit Exceeded!</p>
              <p>Today's emissions of <span className="font-semibold">{latestEmission} tonnes</span> have surpassed the set limit of {EMISSION_LIMIT} tonnes.</p>
            </div>
          )}
          
          {/* Chart */}
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    backdropFilter: 'blur(5px)',
                    border: '1px solid #e0e0e0',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="emissions" name="Emissions (tCO₂e)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="credits" name="Credits Acquired (tCO₂e)" stroke="#84cc16" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default export for the main App component
export default Home;
