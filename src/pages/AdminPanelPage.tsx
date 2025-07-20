// =================================================================================
// FILE: src/pages/AdminPanelPage.tsx
// =================================================================================
// This page provides tools for administrators and auditors to manage the platform.

import React from 'react';

// --- MOCK DATA ---
// In a real app, this would be live data from your backend, filtered for pending actions.
const pendingReadings = [
  { id: 'READING-001', deviceId: 'IOT-009', tonnes: 1.5, timestamp: '2025-07-20T10:05:00Z' },
  { id: 'READING-002', deviceId: 'IOT-012', tonnes: 0.8, timestamp: '2025-07-20T10:02:00Z' },
];

const pendingRetirements = [
  { id: 'RETIRE-001', projectId: 'VERRA-987', nftId: '1000', serials: '2345-2346', user: '0x06b210...' },
];

const auditTrail = [
  { id: 'LOG-001', user: '0x87fd10...', action: 'BOUGHT_NFT', details: 'NFT-1001 for 2.02 ETH', timestamp: '2025-07-20T09:30:15Z', hash: '0xabc...' },
  { id: 'LOG-002', user: 'YOUR_WALLET', action: 'MINTED_NFT', details: 'NFT-1002 from IOT-004 data', timestamp: '2025-07-19T11:45:00Z', hash: '0xdef...' },
  { id: 'LOG-003', user: '0x06b210...', action: 'RETIRED_NFT', details: 'NFT-1000', timestamp: '2025-07-18T15:00:00Z', hash: '0xghi...' },
];

// --- HELPER & CHILD COMPONENTS ---

// A generic container for a section on the page
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

// Card for a pending IoT reading
const PendingReadingCard = ({ reading }: { reading: typeof pendingReadings[0] }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
        <div>
            <p className="font-semibold text-gray-800">{reading.deviceId} - {reading.tonnes} tCO₂e</p>
            <p className="text-sm text-gray-500">Timestamp: {new Date(reading.timestamp).toLocaleString()}</p>
        </div>
        <div className="flex space-x-2">
            <button className="bg-green-500 text-white font-bold px-4 py-1.5 rounded-md hover:bg-green-600 text-sm">Approve</button>
            <button className="bg-red-500 text-white font-bold px-4 py-1.5 rounded-md hover:bg-red-600 text-sm">Reject</button>
        </div>
    </div>
);

// Card for a pending retirement confirmation
const PendingRetirementCard = ({ retirement }: { retirement: typeof pendingRetirements[0] }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
        <div>
            <p className="font-semibold text-gray-800">Retirement: {retirement.projectId} (NFT {retirement.nftId})</p>
            <p className="text-sm text-gray-500 truncate">User: {retirement.user}</p>
        </div>
        <button className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded-md hover:bg-blue-700 text-sm">Confirm</button>
    </div>
);

// Row for an audit trail log
const AuditTrailItem = ({ log }: { log: typeof auditTrail[0] }) => (
    <div className="border-b border-gray-200 py-3 grid grid-cols-4 gap-4 text-sm">
        <p className="text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
        <p className="font-mono text-gray-800 truncate">{log.user}</p>
        <p className="font-semibold text-gray-800">{log.action}</p>
        <p className="text-gray-600 truncate">{log.details}</p>
    </div>
);

// Card for a bonus feature
const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: string }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 flex items-center"><span className="mr-2">{icon}</span> {title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
);

// --- MAIN ADMIN PANEL PAGE COMPONENT ---

const AdminPanelPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-black">Admin & Auditor Panel</h1>
        <p className="text-gray-600 mt-1">Manage platform integrity and review all activities.</p>
      </header>

      {/* Pending Actions */}
      <Section title="Pending Actions">
        <div>
            <h3 className="font-semibold text-gray-700 mb-2">IoT Readings to Approve for Minting</h3>
            {pendingReadings.map(r => <PendingReadingCard key={r.id} reading={r} />)}
        </div>
        <div>
            <h3 className="font-semibold text-gray-700 mb-2">Registry Retirements to Confirm</h3>
            {pendingRetirements.map(r => <PendingRetirementCard key={r.id} retirement={r} />)}
        </div>
      </Section>

      {/* Audit Trail */}
      <Section title="Full Audit Trail">
        <div className="grid grid-cols-4 gap-4 text-sm font-bold text-gray-500 border-b pb-2">
            <p>Timestamp</p><p>User</p><p>Action</p><p>Details</p>
        </div>
        {auditTrail.map(log => <AuditTrailItem key={log.id} log={log} />)}
      </Section>

      {/* Bonus Features */}
      <Section title="Smart Features & Integrations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard title="Notifications" description="Configure alerts for events like emission overages." icon="🔔" />
            <FeatureCard title="API Access" description="Manage API keys for companies to connect new IoT devices." icon="🔑" />
            <FeatureCard title="Wallet Connect" description="View and manage connected company and buyer wallets." icon="🔗" />
            <FeatureCard title="Certificate Generator" description="Auto-generate PDF reports for ESG and compliance." icon="📄" />
        </div>
      </Section>
    </div>
  );
};

export default AdminPanelPage;
