// =================================================================================
// FILE: src/pages/IotDataPage.tsx
// =================================================================================
// This page displays live data from connected IoT devices.

import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
// In a real application, this would come from your API.
const mockDevices = [
  { id: 'IOT-001', location: 'Factory A, Boiler 1', status: 'Active', lastSync: '2025-07-20T08:55:12Z', temp: 450.5, co2: 12.3, fuel: 85.2, hash: '0x1a2b...c3d4' },
  { id: 'IOT-002', location: 'Factory A, Boiler 2', status: 'Active', lastSync: '2025-07-20T08:55:14Z', temp: 452.1, co2: 12.8, fuel: 87.1, hash: '0x5e6f...g7h8' },
  { id: 'IOT-003', location: 'Transport Fleet, Truck 5', status: 'Inactive', lastSync: '2025-07-19T18:30:00Z', temp: 55.0, co2: 2.1, fuel: 45.0, hash: '0x9i0j...k1l2' },
  { id: 'IOT-004', location: 'Factory B, Generator', status: 'Active', lastSync: '2025-07-20T08:54:59Z', temp: 600.7, co2: 15.6, fuel: 91.5, hash: '0x3m4n...o5p6' },
];

// --- TYPE DEFINITIONS ---
type DeviceStatus = 'All' | 'Active' | 'Inactive';
type Device = typeof mockDevices[0];

// --- HELPER & CHILD COMPONENTS ---

// Card for displaying the status of a single IoT device
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
      <p className="text-xs text-gray-400 mt-2">Last sync: {new Date(device.lastSync).toLocaleTimeString()}</p>
    </div>
  );
};

// Toggle button for filtering devices
const FilterButton = ({ label, isActive, onClick }: { label: DeviceStatus, isActive: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
        {label}
    </button>
);

// --- MAIN IOT DATA PAGE COMPONENT ---

const IotDataPage: React.FC = () => {
    const [filter, setFilter] = useState<DeviceStatus>('All');
    const [selectedDevice, setSelectedDevice] = useState<Device>(mockDevices[0]);

    const filteredDevices = useMemo(() => {
        if (filter === 'All') return mockDevices;
        return mockDevices.filter(device => device.status === filter);
    }, [filter]);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-black">IoT Device Data</h1>
                <p className="text-gray-600 mt-1">Monitor live data streams from your connected devices.</p>
            </header>

            {/* Box 1: Device Status */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Device Status</h2>
                    <div className="flex space-x-2">
                        <FilterButton label="All" isActive={filter === 'All'} onClick={() => setFilter('All')} />
                        <FilterButton label="Active" isActive={filter === 'Active'} onClick={() => setFilter('Active')} />
                        <FilterButton label="Inactive" isActive={filter === 'Inactive'} onClick={() => setFilter('Inactive')} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredDevices.map(device => (
                        <DeviceStatusCard 
                            key={device.id} 
                            device={device}
                            isSelected={selectedDevice.id === device.id}
                            onClick={() => setSelectedDevice(device)}
                        />
                    ))}
                </div>
            </section>

            {/* Box 2 & 3: Live Readings and Hash Proof */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Raw Readings Box */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Raw Readings for <span className="text-blue-600">{selectedDevice.id}</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Temperature</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{selectedDevice.temp.toFixed(1)} °C</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">CO₂ Emission</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{selectedDevice.co2.toFixed(1)} kg/hr</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Fuel Usage</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{selectedDevice.fuel.toFixed(1)}%</p>
                        </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-4">Measurement Timestamp: {new Date(selectedDevice.lastSync).toLocaleString()}</p>
                </div>

                {/* Hash Proof Box */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Hash Proof</h2>
                    <p className="text-sm text-gray-600 mb-4">This hash represents the batch of data including the latest reading, stored on-chain for transparency.</p>
                    <div className="bg-gray-100 p-3 rounded-lg break-words">
                        <p className="font-mono text-xs text-gray-700">{selectedDevice.hash}</p>
                    </div>
                    <button 
                        onClick={() => alert('This would link to a block explorer like Etherscan.')}
                        className="w-full mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        View on Block Explorer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IotDataPage;
