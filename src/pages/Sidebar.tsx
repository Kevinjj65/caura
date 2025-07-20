// FILE: src/components/Sidebar.tsx
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiCpu, FiGrid, FiUser, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { MdLocalOffer } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome className="h-6 w-6" /> },
  { to: '/dashboard/iot-data', label: 'IoT Data', icon: <FiCpu className="h-6 w-6" /> },
  { to: '/dashboard/nfts', label: 'NFT Marketplace', icon: <MdLocalOffer className="h-6 w-6" /> },
  { to: '/dashboard/projects', label: 'Project Registry', icon: <FiGrid className="h-6 w-6" /> },
  { to: '/dashboard/profile', label: 'Company Profile', icon: <FiUser className="h-6 w-6" /> },
  { to: '/dashboard/admin', label: 'Admin Panel', icon: <FiSettings className="h-6 w-6" /> },
];

const signOut = async () => {
  toast.promise(
    supabase.auth.signOut(),
    {
      loading: 'Signing out...',
      success: () => {
        window.location.href = '/';
        return 'Signed out successfully!';
      },
      error: (error) => `Sign out failed: ${error.message}`,
    },
    {
      position: 'top-right',
      duration: 4000,
    }
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Floating icon-only navbar for mobile
  const mobileNav = (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center bg-white rounded-full shadow-lg px-3 py-2 gap-2 md:hidden border border-gray-200">
      {navLinks.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          aria-label={label}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center p-2 rounded-full transition-colors duration-200 ${
              (isActive || location.pathname === to)
                ? 'bg-green-100 text-green-700'
                : 'text-gray-500 hover:bg-gray-100'
            }`
          }
        >
          {icon}
        </NavLink>
      ))}
      <button
        onClick={signOut}
        aria-label="Logout"
        className="flex flex-col items-center justify-center p-2 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
      >
        <FiLogOut className="h-6 w-6" />
      </button>
    </nav>
  );

  // Sidebar content for desktop
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold text-green-800">Carbon Platform</h1>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-green-100 text-green-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:translate-x-1'
                }`
              }
            >
              <div className="flex items-center gap-3 w-full">
                {icon}
                {!isCollapsed && <span>{label}</span>}
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Logout Button */}
      <button
        onClick={signOut}
        className="flex items-center px-4 py-3 m-4 text-sm text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
      >
        <FiLogOut className="h-5 w-5" />
        {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
      </button>
    </div>
  );

  return (
    <>
      {/* Floating icon-only navbar for mobile */}
      {mobileNav}
      {/* Desktop sidebar (collapsible) */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 64 : 256 }}
        className="hidden md:flex flex-col justify-between bg-white border-r border-gray-200 min-h-screen transition-all duration-300"
        style={{ width: isCollapsed ? 64 : 256 }}
      >
        {/* Collapse/Expand button */}
        <button
          className="absolute top-4 right-[-18px] bg-green-600 text-white p-1 rounded-full shadow-md focus:outline-none hidden md:block"
          style={{ zIndex: 30 }}
          onClick={() => setIsCollapsed((c) => !c)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <FiMenu size={18} /> : <FiX size={18} />}
        </button>
        {sidebarContent}
      </motion.aside>
    </>
  );
};

export default Sidebar;
