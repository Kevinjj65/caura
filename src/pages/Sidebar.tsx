// =================================================================================
// FILE: src/components/Sidebar.tsx
// =================================================================================
// The sidebar now includes NavLinks for all the new pages.
import React from 'react';
import { NavLink } from 'react-router-dom';

// Icons for the sidebar
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const IotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a7.5 7.5 0 0110.607 0M5.47 8.47a.5.5 0 01.708 0L12 14.292l5.823-5.823a.5.5 0 01.707.707L12.707 15l-6.528-6.529a.5.5 0 010-.707z" /></svg>;
const NftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const ProjectsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string; }) => {
  const activeClass = 'bg-green-100 text-green-800 font-semibold';
  const inactiveClass = 'text-gray-600 hover:bg-gray-200';
  return (
    <NavLink to={to} end className={({ isActive }) => `flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}>
      {icon}<span className="ml-3">{label}</span>
    </NavLink>
  );
};

const Sidebar = () => (
  <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
    <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
      <h1 className="text-xl font-bold text-green-800">Carbon Platform</h1>
    </div>
    <nav className="flex-1 p-4 space-y-1.5">
      <NavItem to="/" icon={<DashboardIcon />} label="Dashboard" />
      <NavItem to="/iot-data" icon={<IotIcon />} label="IoT Data" />
      <NavItem to="/nfts" icon={<NftIcon />} label="NFT Marketplace" />
      <NavItem to="/projects" icon={<ProjectsIcon />} label="Project Registry" />
      <NavItem to="/profile" icon={<ProfileIcon />} label="Company Profile" />
      <NavItem to="/admin" icon={<AdminIcon />} label="Admin Panel" />
    </nav>
  </aside>
);

export default Sidebar;
