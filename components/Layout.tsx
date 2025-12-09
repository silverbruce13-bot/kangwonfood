
import React, { ReactNode } from 'react';
import { ChefHat, LayoutDashboard, PlusCircle, PieChart, ScanLine, Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  labels: {
    headerTitle: string;
    headerSubtitle: string;
    nav: {
      dashboard: string;
      add: string;
      scan: string;
      reports: string;
      settings: string;
    }
  }
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, labels }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative">
      {/* Header */}
      <header className="bg-primary text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-2">
          <ChefHat size={28} />
          <div>
            <h1 className="text-xl font-bold tracking-tight">{labels.headerTitle}</h1>
            <p className="text-xs text-orange-100 opacity-90">{labels.headerSubtitle}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 p-4 scroll-smooth">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-200 fixed bottom-0 w-full max-w-md z-20 pb-safe">
        <div className="flex justify-around items-center h-16">
          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => onTabChange('dashboard')} 
            icon={<LayoutDashboard size={24} />} 
            label={labels.nav.dashboard} 
          />
          <NavButton 
            active={activeTab === 'add'} 
            onClick={() => onTabChange('add')} 
            icon={<PlusCircle size={24} />} 
            label={labels.nav.add} 
          />
           <NavButton 
            active={activeTab === 'scan'} 
            onClick={() => onTabChange('scan')} 
            icon={<ScanLine size={24} />} 
            label={labels.nav.scan} 
          />
          <NavButton 
            active={activeTab === 'reports'} 
            onClick={() => onTabChange('reports')} 
            icon={<PieChart size={24} />} 
            label={labels.nav.reports} 
          />
          <NavButton 
            active={activeTab === 'settings'} 
            onClick={() => onTabChange('settings')} 
            icon={<Settings size={24} />} 
            label={labels.nav.settings} 
          />
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
      active ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    <div className={`mb-1 transition-transform ${active ? 'scale-110' : ''}`}>{icon}</div>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
