// App.tsx
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './pages/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import IotDataPage from './pages/IotDataPage.tsx';
import NftMarketplacePage from './pages/NftMarketplacePage';
import ProjectRegistryPage from './pages/ProjectRegistryPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';
import LoginPage from './pages/LoginPage.tsx';

const FontEnforcer = () => (
  <style>{`body, .font-sans { font-family: 'Helvetica', 'ui-sans-serif', 'system-ui', sans-serif; }`}</style>
);

function App() {
  return (
    <>
      <FontEnforcer />
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard Route with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="iot-data" element={<IotDataPage />} />
          <Route path="nfts" element={<NftMarketplacePage />} />
          <Route path="projects" element={<ProjectRegistryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<AdminPanelPage />} />
        </Route>
      </Routes>
        <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            border: '1px solid #e5e7eb', // Tailwind border-gray-200
            padding: '12px 16px',
            color: '#111827', // Tailwind text-gray-900
            fontSize: '0.875rem',
          },
          success: {
            style: {
              backgroundColor: '#dcfce7', // green-100
              borderColor: '#22c55e', // green-500
              color: '#166534', // green-700
            },
            iconTheme: {
              primary: '#22c55e', // green-500
              secondary: '#f0fdf4', // green-50
            },
          },
          error: {
            style: {
              backgroundColor: '#fee2e2', // red-100
              borderColor: '#ef4444', // red-500
              color: '#991b1b', // red-700
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fef2f2',
            },
          },
        }}
      />
    </>
  );
}

export default App;
