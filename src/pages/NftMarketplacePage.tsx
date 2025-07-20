// =================================================================================
// FILE: src/pages/NftMarketplacePage.tsx
// =================================================================================
// This page displays the NFT marketplace and vault.

import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
// In a real app, this would come from a smart contract or backend API.
const mockNfts = [
  { id: '1001', tonnes: 2.02, iotSource: 'IOT-002', registrySerial: 'VERRA-71394', status: 'Available', owner: '0x87fd10...a4b2', isIotVerified: true, isRegistryCertified: true },
  { id: '1000', tonnes: 4.40, iotSource: 'IOT-001', registrySerial: 'VERRA-71393', status: 'Retired', owner: '0x06b210...c5d3', isIotVerified: true, isRegistryCertified: true },
  { id: '1002', tonnes: 1.23, iotSource: 'IOT-004', registrySerial: null, status: 'Owned', owner: 'YOUR_WALLET', isIotVerified: true, isRegistryCertified: false },
  { id: '1003', tonnes: 10.00, iotSource: null, registrySerial: 'GS-4113', status: 'Available', owner: '0x3e4f5g...h6i7', isIotVerified: false, isRegistryCertified: true },
  { id: '1004', tonnes: 5.50, iotSource: 'IOT-007', registrySerial: null, status: 'Owned', owner: 'YOUR_WALLET', isIotVerified: true, isRegistryCertified: false },
  { id: '1005', tonnes: 3.15, iotSource: 'IOT-008', registrySerial: 'ACR-9442', status: 'Retired', owner: '0x9j0k1l...m2n3', isIotVerified: true, isRegistryCertified: true },
];

// --- TYPE DEFINITIONS ---
type NftStatus = 'All' | 'Available' | 'Owned' | 'Retired';
type Nft = typeof mockNfts[0];

// --- HELPER & CHILD COMPONENTS ---

// A reusable visual badge for NFT verification status
const NftTag = ({ text, color }: { text: string; color: 'blue' | 'green' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
  };
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorClasses[color]}`}>{text}</span>;
};

// The main card component for displaying a single NFT
const NftCard = ({ nft }: { nft: Nft }) => {
  const getActionButtons = () => {
    switch (nft.status) {
      case 'Available':
        return <button className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Buy NFT</button>;
      case 'Owned':
        return (
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Sell</button>
            <button className="flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Transfer</button>
            <button className="flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">Retire</button>
          </div>
        );
      case 'Retired':
        return <button className="w-full bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed">Retired</button>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-xl text-gray-800">NFT-{nft.id}</h3>
        <div className="flex flex-col items-end space-y-2">
            {nft.isIotVerified && <NftTag text="IoT Verified" color="blue" />}
            {nft.isRegistryCertified && <NftTag text="Registry Certified" color="green" />}
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-gray-700 flex-grow">
        <p className="text-2xl font-bold text-black">{nft.tonnes.toFixed(2)} <span className="text-lg font-medium text-gray-600">tCO₂e</span></p>
        <p><strong>IoT Source:</strong> {nft.iotSource || 'N/A'}</p>
        <p><strong>Registry Serial:</strong> {nft.registrySerial || 'N/A'}</p>
      </div>
      <div className="mt-4 text-sm border-t pt-4">
        <p><strong>Status:</strong> <span className="font-semibold">{nft.status}</span></p>
        <p className="truncate"><strong>Owner:</strong> <span className="font-mono text-xs">{nft.owner}</span></p>
      </div>
      <div className="mt-4">
        {getActionButtons()}
      </div>
    </div>
  );
};

// Toggle button for filtering NFTs
const FilterButton = ({ label, isActive, onClick }: { label: NftStatus, isActive: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
        {label}
    </button>
);

// --- MAIN NFT MARKETPLACE PAGE COMPONENT ---

const NftMarketplacePage: React.FC = () => {
    const [filter, setFilter] = useState<NftStatus>('All');

    const filteredNfts = useMemo(() => {
        if (filter === 'All') return mockNfts;
        return mockNfts.filter(nft => nft.status === filter);
    }, [filter]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-black">NFT Marketplace & Vault</h1>
        <p className="text-gray-600 mt-1">Buy, sell, and manage your carbon credit NFTs.</p>
      </header>

      {/* Filter controls */}
      <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
        <h3 className="text-md font-semibold text-gray-800">Filter by:</h3>
        <div className="flex space-x-2">
            <FilterButton label="All" isActive={filter === 'All'} onClick={() => setFilter('All')} />
            <FilterButton label="Available" isActive={filter === 'Available'} onClick={() => setFilter('Available')} />
            <FilterButton label="Owned" isActive={filter === 'Owned'} onClick={() => setFilter('Owned')} />
            <FilterButton label="Retired" isActive={filter === 'Retired'} onClick={() => setFilter('Retired')} />
        </div>
      </section>

      {/* NFT Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNfts.map(nft => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </section>
    </div>
  );
};

export default NftMarketplacePage;
