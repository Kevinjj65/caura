// =================================================================================
// FILE: src/pages/DashboardPage.tsx
// =================================================================================
// The main dashboard, with detailed metrics and graphs.
import React from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const emissionsData = [ { name: 'Jan', emissions: 40, offsets: 24 }, { name: 'Feb', emissions: 30, offsets: 13 }, { name: 'Mar', emissions: 20, offsets: 68 }, { name: 'Apr', emissions: 27, offsets: 39 }, { name: 'May', emissions: 18, offsets: 48 }, { name: 'Jun', emissions: 23, offsets: 38 }, { name: 'Jul', emissions: 34, offsets: 43 }, ];
const tokenData = [ { name: 'Jan', minted: 24 }, { name: 'Feb', minted: 13 }, { name: 'Mar', minted: 68 }, { name: 'Apr', minted: 39 }, { name: 'May', minted: 48 }, { name: 'Jun', minted: 38 }, { name: 'Jul', minted: 43 }, ];

const InfoCard = ({ title, value, unit, color }: { title: string, value: string, unit: string, color: string }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <div className="mt-2 flex items-baseline space-x-2">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-gray-600">{unit}</p>
        </div>
    </div>
);

const DashboardPage = () => (
  <div className="space-y-8">
    <header><h1 className="text-3xl font-bold text-black">Dashboard</h1></header>
    
    <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Net Emissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard title="Direct Emissions (Today)" value="12.5" unit="tCO₂e" color="text-red-500" />
            <InfoCard title="Verified Offsets (Total)" value="1,500" unit="tCO₂e" color="text-green-500" />
            <InfoCard title="Net Balance" value="-1,487.5" unit="tCO₂e" color="text-yellow-500" />
        </div>
    </section>

    <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard title="NFTs Minted" value="2,104" unit="tokens" color="text-blue-500" />
            <InfoCard title="NFTs Retired" value="604" unit="tokens" color="text-gray-500" />
            <InfoCard title="CO₂ Unaccounted For" value="8,400" unit="tCO₂e" color="text-red-600" />
        </div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Emissions vs. Offsets</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emissionsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="emissions" stroke="#ef4444" name="Emissions" />
                        <Line type="monotone" dataKey="offsets" stroke="#22c55e" name="Offsets" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Token Minting Timeline</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tokenData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="minted" fill="#3b82f6" name="NFTs Minted" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </section>
  </div>
);

export default DashboardPage;
