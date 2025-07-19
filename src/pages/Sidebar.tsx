// src/components/Sidebar.tsx
import React from 'react';

// You can use a library like 'heroicons' for SVGs
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const NftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
// ... add other icons as needed

const NavItem = ({ icon, label, isActive = false }: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}) => (
  <a
    href="#"
    className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
      ${isActive
        ? 'bg-green-100 text-green-700'
        : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </a>
);

const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-black">YourLogo</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavItem icon={<DashboardIcon />} label="Dashboard" isActive />
        <NavItem icon={<NftIcon />} label="NFTs" />
        {/* Add other NavItem components for Projects, Profile, etc. */}
      </nav>
    </aside>
  );
};

export default Sidebar;