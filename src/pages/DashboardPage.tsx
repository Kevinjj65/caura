import React, { useEffect, useState } from 'react';
import {
  LineChart, BarChart, Line, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import supabase from '../lib/supabase';

const InfoCard = ({ title, value, unit, color }: { title: string, value: string | number, unit: string, color: string }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <p className="text-sm text-gray-500 dark:text-gray-300 font-medium">{title}</p>
    <div className="mt-2 flex items-baseline space-x-2">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{unit}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [emissions, setEmissions] = useState<number>(0);
  const [offsets, setOffsets] = useState<number>(0);
  const [netBalance, setNetBalance] = useState<number>(0);
  const [nftsMinted, setNftsMinted] = useState<number>(0);
  const [nftsRetired, setNftsRetired] = useState<number>(0);
  const [unaccounted, setUnaccounted] = useState<number>(0);
  const [emissionsData, setEmissionsData] = useState<any[]>([]);
  const [tokenData, setTokenData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('User not authenticated');

        // Match by wallet/email
        const { data: userData, error: userDataError } = await supabase
          .from('users')
          .select('id, company_name, wallet_address')
          .eq('user_id', user.id) // assuming wallet address is user email (adjust if needed)
          .single();
        if (userDataError || !userData) throw new Error('User profile not found');

        setCompanyName(userData.company_name || '');

        const vendorId = userData.id;

        // Get devices owned by vendor
        const { data: devices, error: devicesError } = await supabase
          .from('iot_devices')
          .select('*')
          .eq('vendor_id', vendorId);
        if (devicesError) throw new Error('Failed to fetch IoT devices');

        // Get NFTs for vendor
        const { data: nfts, error: nftsError } = await supabase
        .from('nfts')
        .select('*')
        .eq('owner', userData.wallet_address);
      
        if (nftsError) throw new Error('Failed to fetch NFTs');

        // Aggregate CO₂
        const totalEmissions = devices.reduce((sum, d) => sum + (d.co2 || 0), 0);
        setEmissions(totalEmissions);

        // Tonnes offset
        const totalOffsets = nfts.reduce((sum, n) => sum + (n.tonnes || 0), 0);
        setOffsets(totalOffsets);

        setNetBalance(totalOffsets - totalEmissions);
        setUnaccounted(Math.max(totalEmissions - totalOffsets, 0));
        setNftsMinted(nfts.length);
        setNftsRetired(nfts.filter((n: any) => n.status === 'Retired').length);

        // Placeholder chart data — replace with monthly SQL grouping if needed
        setEmissionsData([
          { name: 'Jan', emissions: 40, offsets: 24 },
          { name: 'Feb', emissions: 30, offsets: 13 },
          { name: 'Mar', emissions: 20, offsets: 68 },
          { name: 'Apr', emissions: 27, offsets: 39 },
          { name: 'May', emissions: 18, offsets: 48 },
          { name: 'Jun', emissions: 23, offsets: 38 },
          { name: 'Jul', emissions: 34, offsets: 43 },
        ]);

        setTokenData([
          { name: 'Mon', minted: 24 },
          { name: 'Tues', minted: 13 },
          { name: 'Wed', minted: 68 },
          { name: 'Thu', minted: 39 },
          { name: 'Fri', minted: 48 },
          { name: 'Sat', minted: 38 },
          { name: 'Sun', minted: 43 },
        ]);

      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-lg text-gray-600 dark:text-gray-300">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-black dark:text-white">{companyName} Dashboard</h1>
      </header>
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Live Net Emissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="Direct Emissions (Total)" value={emissions.toLocaleString()} unit="tCO₂e" color="text-red-500" />
          <InfoCard title="Verified Offsets" value={offsets.toLocaleString()} unit="tCO₂e" color="text-green-500" />
          <InfoCard title="Net Balance" value={netBalance.toLocaleString()} unit="tCO₂e" color="text-yellow-500" />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Company Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="NFTs Minted" value={nftsMinted.toLocaleString()} unit="tokens" color="text-blue-500" />
          <InfoCard title="NFTs Retired" value={nftsRetired.toLocaleString()} unit="tokens" color="text-gray-500" />
          <InfoCard title="CO₂ Unaccounted" value={unaccounted.toLocaleString()} unit="tCO₂e" color="text-red-600" />
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Emissions vs. Offsets</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-80">
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Token Minting Timeline</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-80">
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
};

export default DashboardPage;
