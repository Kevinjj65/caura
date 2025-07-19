
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same folder

// 2. The component signature is changed. It no longer accepts a `children` prop.
const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* The Sidebar component remains unchanged */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {/* 3. Use the <Outlet /> component here. React Router will automatically
            render the matching child route (like <DashboardPage />) in this exact spot.
            This replaces the need for the `children` prop.
        */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
