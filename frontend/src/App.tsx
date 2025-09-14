import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { BugTracker } from './components/BugTracker/BugTracker';

function AppContent() {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return <BugTracker />;
}

function App() {
  return <AppContent />;
}

export default App;