// FILE: src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiCpu, FiGrid, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { MdLocalOffer } from 'react-icons/md';
import { motion } from 'framer-motion';
import supabase from '../lib/supabase';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: <FiHome className="h-5 w-5" /> },
  { to: '/iot-data', label: 'IoT Data', icon: <FiCpu className="h-5 w-5" /> },
  { to: '/nfts', label: 'NFT Marketplace', icon: <MdLocalOffer className="h-5 w-5" /> },
  { to: '/projects', label: 'Project Registry', icon: <FiGrid className="h-5 w-5" /> },
  { to: '/profile', label: 'Company Profile', icon: <FiUser className="h-5 w-5" /> },
  { to: '/admin', label: 'Admin Panel', icon: <FiSettings className="h-5 w-5" /> },
];

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
};

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between min-h-screen"
    >
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-16 flex items-center justify-center border-b border-gray-200 px-4"
        >
          <h1 className="text-xl font-bold text-green-800">Carbon Platform</h1>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-sm transition-all duration-200 
                 ${
                   isActive
                     ? 'bg-green-100 text-green-800 font-semibold'
                     : 'text-gray-600 hover:bg-gray-100 hover:translate-x-1'
                 }`
              }
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 w-full"
              >
                {icon}
                <span>{label}</span>
              </motion.div>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.03, x: 5 }}
        whileTap={{ scale: 0.98 }}
        onClick={signOut}
        className="flex items-center px-4 py-3 m-4 text-sm text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
      >
        <FiLogOut className="h-5 w-5" />
        <span className="ml-3 font-medium">Logout</span>
      </motion.button>
    </motion.aside>
  );
};

export default Sidebar;
