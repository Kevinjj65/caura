// App.tsx
import { Routes, Route } from 'react-router-dom';

import DashboardLayout from './pages/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import IotDataPage from './pages/IotDataPage.tsx';
import NftMarketplacePage from './pages/NftMarketplacePage';
import ProjectRegistryPage from './pages/ProjectRegistryPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';

const FontEnforcer = () => (
  <style>{`body, .font-sans { font-family: 'Helvetica', 'ui-sans-serif', 'system-ui', sans-serif; }`}</style>
);

function App() {
  return (
    <>
      <FontEnforcer />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="iot-data" element={<IotDataPage />} />
          <Route path="nfts" element={<NftMarketplacePage />} />
          <Route path="projects" element={<ProjectRegistryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="admin" element={<AdminPanelPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
