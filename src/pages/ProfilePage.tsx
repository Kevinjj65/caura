// =================================================================================
// FILE: src/pages/ProfilePage.tsx
// =================================================================================
// This page displays the user's or company's overall carbon accounting summary.

import React from 'react';

// --- MOCK DATA ---
// In a real app, this data would be calculated from user-specific records.
const userProfileData = {
  companyName: 'EcoCorp Inc.',
  totalEmissions: 8540.5, // tCO2e from IoT
  totalOffsets: 1500,    // tCO2e from Registry
  nftsMinted: 2104,
  nftsRetired: 604,
  climateImpactScore: 78, // Score out of 100
};

// --- HELPER & CHILD COMPONENTS ---

// A reusable card for displaying a single, key metric.
const InfoCard = ({ title, value, unit, icon }: { title: string; value: string; unit: string; icon: string; }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3">
            <span className="text-2xl">{icon}</span>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-600">{unit}</p>
        </div>
    </div>
);

// A dedicated component for the Climate Impact Score to make it stand out.
const ClimateImpactScoreCard = ({ score }: { score: number }) => {
    const getScoreColor = () => {
        if (score >= 75) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 col-span-1 md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Climate Impact Score</h2>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <p className="text-6xl font-bold text-gray-800">{score}</p>
                    <p className="absolute -bottom-2 right-0 text-xl font-semibold text-gray-500">/ 100</p>
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-gray-600 mb-2">Your score reflects your company's commitment to offsetting emissions. Higher is better.</p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                            className={`h-4 rounded-full transition-all duration-500 ${getScoreColor()}`}
                            style={{ width: `${score}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PROFILE PAGE COMPONENT ---

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-black">{userProfileData.companyName} - Profile</h1>
        <p className="text-gray-600 mt-1">A summary of your climate action and carbon accounting activities.</p>
      </header>

      {/* Main grid for metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard 
            title="Total Emissions Generated" 
            value={userProfileData.totalEmissions.toLocaleString()} 
            unit="tCO₂e (from IoT)"
            icon="💨"
        />
        <InfoCard 
            title="Total Offsets Purchased" 
            value={userProfileData.totalOffsets.toLocaleString()} 
            unit="tCO₂e (from Registry)"
            icon="🌍"
        />
        <InfoCard 
            title="Total NFTs Minted" 
            value={userProfileData.nftsMinted.toLocaleString()} 
            unit="tokens"
            icon="✨"
        />
        <InfoCard 
            title="Total NFTs Retired" 
            value={userProfileData.nftsRetired.toLocaleString()} 
            unit="tokens"
            icon="♻️"
        />
      </section>

      {/* Section for the Climate Impact Score */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClimateImpactScoreCard score={userProfileData.climateImpactScore} />
      </section>
    </div>
  );
};

export default ProfilePage;
