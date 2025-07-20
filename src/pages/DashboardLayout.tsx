// =================================================================================
// FILE: src/components/DashboardLayout.tsx
// =================================================================================
// The main layout with the sidebar. Uses <Outlet /> to render the active page.

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
