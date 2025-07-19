
// The <BrowserRouter> is removed from this import as it's no longer used here.
import { Routes, Route } from 'react-router-dom';

// --- IMPORT YOUR LAYOUT AND PAGE COMPONENTS ---
// Make sure the paths are correct based on your folder structure.
import DashboardLayout from './pages/DashboardLayout'; // Assuming layout is in components
import DashboardPage from './pages/DashboardPage';
// import NftMarketplacePage from './pages/NftMarketplacePage'; // Example for another page

// --- FONT HELPER (Optional) ---
// It's better to put this CSS in your main index.css file.
const FontEnforcer = () => (
  <style>{`
    body, .font-sans { 
      font-family: 'Helvetica', 'ui-sans-serif', 'system-ui', sans-serif; 
    }
  `}</style>
);


// --- MAIN APP COMPONENT ---
// The <BrowserRouter> has been removed from this component.
// The routing environment likely provides one at a higher level.
function App() {
  return (
    <>
      <FontEnforcer />
      <Routes>
        {/* This is a Layout Route. 
          - The `path="/"` makes it the parent for all main routes.
          - The `element={<DashboardLayout />}` renders your sidebar and main content area.
          - Any nested <Route> components will be rendered inside the <Outlet /> 
            of the DashboardLayout.
        */}
        <Route path="/" element={<DashboardLayout />}>
          
          {/* The 'index' route renders the DashboardPage when the URL is exactly "/" */}
          <Route index element={<DashboardPage />} />

          {/* --- ADD YOUR OTHER ROUTES HERE --- */}
          {/* This example shows how you would add the NFT Marketplace page.
              When the user navigates to "/nfts", the NftMarketplacePage component
              will be rendered inside the DashboardLayout, replacing the DashboardPage.
          */}
          {/* <Route path="nfts" element={<NftMarketplacePage />} /> */}

          {/* You can continue adding more pages that share the same layout */}
          {/* <Route path="projects" element={<ProjectsPage />} /> */}
          {/* <Route path="profile" element={<ProfilePage />} /> */}

        </Route>

        {/* You could also have routes outside the layout, e.g., a login page */}
        {/* <Route path="/login" element={<LoginPage />} /> */}

      </Routes>
    </>
  );
}

export default App;
