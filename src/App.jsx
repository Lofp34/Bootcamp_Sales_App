import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ProspectionHub from './components/ProspectionHub';
import SalesGuide from './components/SalesGuide';
import SuiviHub from './components/SuiviHub';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'prospection', 'sales'

  const renderView = () => {
    switch (currentView) {
      case 'prospection':
        return <ProspectionHub onBack={() => setCurrentView('home')} />;
      case 'sales':
        return <SalesGuide onBack={() => setCurrentView('home')} />;
      case 'suivi':
        return <SuiviHub onBack={() => setCurrentView('home')} />;
      default:
        return <HomeScreen onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="full-height">
      {renderView()}
    </div>
  );
}

export default App;
