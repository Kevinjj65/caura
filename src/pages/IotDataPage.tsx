import React, { useEffect, useMemo, useState } from 'react';
import supabase from '../lib/supabase';

type DeviceStatus = 'All' | 'Active' | 'Inactive';

type Device = {
  id: string;
  location: string;
  status: 'Active' | 'Inactive';
  last_sync: string;
  temp: number;
  co2: number;
  fuel: number;
  hash: string;
};

const DeviceStatusCard = ({ device, isSelected, onClick }: { device: Device, isSelected: boolean, onClick: () => void }) => {
  const statusColor = device.status === 'Active' ? 'text-green-500' : 'text-gray-500';
  const borderColor = isSelected ? 'border-blue-500' : 'border-gray-200';

  return (
    <div onClick={onClick} className={`bg-white p-4 rounded-lg shadow-sm border-2 ${borderColor} cursor-pointer transition-all hover:shadow-md hover:border-blue-400`}>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-800">{device.id}</h3>
        <span className={`text-sm font-semibold ${statusColor}`}>{device.status}</span>
      </div>
      <p className="text-sm text-gray-600 mt-2">{device.location}</p>
      <p className="text-xs text-gray-400 mt-2">Last sync: {new Date(device.last_sync).toLocaleTimeString()}</p>
    </div>
  );
};

const FilterButton = ({ label, isActive, onClick }: { label: DeviceStatus, isActive: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
    {label}
  </button>
);

const IotDataPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<DeviceStatus>('All');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('iot_devices')
        .select('*');

      if (error) {
        console.error('Supabase error:', error.message);
        setError('Failed to load IoT devices');
      } else if (data) {
        setDevices(data);
        setSelectedDevice(data[0] || null);
      }

      setLoading(false);
    };

    fetchDevices();
  }, []);

  const filteredDevices = useMemo(() => {
    if (filter === 'All') return devices;
    return devices.filter(device => device.status === filter);
  }, [devices, filter]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading IoT data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (devices.length === 0) {
    return <div className="text-center text-gray-600">No IoT devices found.</div>;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-black">IoT Device Data</h1>
        <p className="text-gray-600 mt-1">Monitor live data streams from your connected devices.</p>
      </header>

      {/* Device Status */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Device Status</h2>
          <div className="flex space-x-2">
            {(['All', 'Active', 'Inactive'] as DeviceStatus[]).map(label => (
              <FilterButton key={label} label={label} isActive={filter === label} onClick={() => setFilter(label)} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices.map(device => (
            <DeviceStatusCard
              key={device.id}
              device={device}
              isSelected={selectedDevice?.id === device.id}
              onClick={() => setSelectedDevice(device)}
            />
          ))}
        </div>
      </section>

      {/* Live Data & Hash */}
      {selectedDevice && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Raw Readings */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Raw Readings for <span className="text-blue-600">{selectedDevice.id}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{selectedDevice.temp?.toFixed(1) ?? '—'} °C</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">CO₂ Emission</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{selectedDevice.co2?.toFixed(1) ?? '—'} kg/hr</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Fuel Usage</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{selectedDevice.fuel?.toFixed(1) ?? '—'}%</p>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">Measurement Timestamp: {new Date(selectedDevice.last_sync).toLocaleString()}</p>
          </div>

          {/* Hash Proof */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Hash Proof</h2>
            <p className="text-sm text-gray-600 mb-4">This hash represents the batch of data including the latest reading, stored on-chain for transparency.</p>
            <div className="bg-gray-100 p-3 rounded-lg break-words">
              <p className="font-mono text-xs text-gray-700">{selectedDevice.hash ?? 'No hash recorded'}</p>
            </div>
            <button
              onClick={() => alert('This would link to a block explorer like Etherscan.')}
              className="w-full mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              View on Block Explorer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IotDataPage;
