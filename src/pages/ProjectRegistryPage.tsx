// =================================================================================
// FILE: src/pages/ProjectRegistryPage.tsx
// =================================================================================
// This page displays an integrated feed from major carbon project registries.

import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
// In a real app, this data would be fetched from the respective registry APIs.
const mockProjects = [
  { id: 'VERRA-987', name: 'Katingan Peatland Restoration', country: 'Indonesia', type: 'Forestry', tonnesCertified: 150000, serialsVerified: '2345-2399', retirementCert: 'VCU-987-2024', registry: 'Verra', url: '#' },
  { id: 'GS-4113', name: 'Basa Magogo Hydropower', country: 'Rwanda', type: 'Renewable Energy', tonnesCertified: 75000, serialsVerified: '8100-8190', retirementCert: 'GS-4113-2024', registry: 'Gold Standard', url: '#' },
  { id: 'ACR-9442', name: 'Delta Blue Carbon', country: 'Pakistan', type: 'Blue Carbon', tonnesCertified: 250000, serialsVerified: '5501-5601', retirementCert: 'ACR-9442-2024', registry: 'ACR', url: '#' },
  { id: 'VERRA-1121', name: 'Mai Ndombe REDD+', country: 'DRC', type: 'Forestry', tonnesCertified: 300000, serialsVerified: '4100-4250', retirementCert: 'VCU-1121-2024', registry: 'Verra', url: '#' },
  { id: 'GS-2056', name: 'Gujarat Wind Power', country: 'India', type: 'Renewable Energy', tonnesCertified: 120000, serialsVerified: '9300-9380', retirementCert: 'GS-2056-2024', registry: 'Gold Standard', url: '#' },
];

// --- TYPE DEFINITIONS ---
type Registry = 'All' | 'Verra' | 'Gold Standard' | 'ACR';
type Project = typeof mockProjects[0];

// --- HELPER & CHILD COMPONENTS ---

// A visual tag for the registry name
const RegistryTag = ({ registry }: { registry: Project['registry'] }) => {
  const colors = {
    Verra: 'bg-cyan-100 text-cyan-800',
    'Gold Standard': 'bg-amber-100 text-amber-800',
    ACR: 'bg-indigo-100 text-indigo-800',
  };
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors[registry]}`}>{registry}</span>;
};

// The main card component for displaying a single project
const ProjectCard = ({ project }: { project: Project }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-lg text-gray-800 pr-4">{project.name}</h3>
      <RegistryTag registry={project.registry} />
    </div>
    <p className="text-sm text-gray-500 mt-1">{project.country} • {project.type}</p>
    
    <div className="mt-4 space-y-2 text-sm text-gray-700 flex-grow border-t pt-4">
      <p><strong>Tonnes Certified:</strong> {project.tonnesCertified.toLocaleString()}</p>
      <p><strong>Verified Serials:</strong> {project.serialsVerified}</p>
      <p className="truncate"><strong>Retirement Certificate:</strong> {project.retirementCert}</p>
    </div>

    <div className="mt-4 flex space-x-2">
      <button 
        onClick={() => alert(`Verifying serials for ${project.id}...`)}
        className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Verify
      </button>
      <a 
        href={project.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1 text-center bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
      >
        View on Registry
      </a>
    </div>
  </div>
);

// Toggle button for filtering registries
const FilterButton = ({ label, isActive, onClick }: { label: Registry, isActive: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
        {label}
    </button>
);

// --- MAIN PROJECT REGISTRY PAGE COMPONENT ---

const ProjectRegistryPage: React.FC = () => {
    const [filter, setFilter] = useState<Registry>('All');

    const filteredProjects = useMemo(() => {
        if (filter === 'All') return mockProjects;
        return mockProjects.filter(project => project.registry === filter);
    }, [filter]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-black">Project Registry</h1>
        <p className="text-gray-600 mt-1">Browse and verify projects from leading carbon credit registries.</p>
      </header>

      {/* Filter controls */}
      <section className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
        <h3 className="text-md font-semibold text-gray-800">Filter by Registry:</h3>
        <div className="flex space-x-2">
            <FilterButton label="All" isActive={filter === 'All'} onClick={() => setFilter('All')} />
            <FilterButton label="Verra" isActive={filter === 'Verra'} onClick={() => setFilter('Verra')} />
            <FilterButton label="Gold Standard" isActive={filter === 'Gold Standard'} onClick={() => setFilter('Gold Standard')} />
            <FilterButton label="ACR" isActive={filter === 'ACR'} onClick={() => setFilter('ACR')} />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
};

export default ProjectRegistryPage;
