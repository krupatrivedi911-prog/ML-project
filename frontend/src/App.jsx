import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PredictPage from './pages/PredictPage';
import HistoryPage from './pages/HistoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ModelPerformancePage from './pages/ModelPerformancePage';
import FeatureInsightsPage from './pages/FeatureInsightsPage';
import AboutPage from './pages/AboutPage';

import { INITIAL_PREDICTIONS_HISTORY } from './data/mockData';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Navigation & UI State
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dynamic Prediction History (pre-loaded with realistic Week 4 samples)
  const [historyList, setHistoryList] = useState(INITIAL_PREDICTIONS_HISTORY);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Auth Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Prediction History Handlers
  const handleAddPrediction = (newRecord) => {
    setHistoryList((prev) => [newRecord, ...prev]);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your prediction history?')) {
      setHistoryList([]);
    }
  };

  // If not logged in, render the login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Render active dashboard view
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={setActivePage}
            historyList={historyList}
          />
        );
      case 'predict':
        return (
          <PredictPage
            onAddPrediction={handleAddPrediction}
            onNavigateToHistory={() => setActivePage('history')}
          />
        );
      case 'history':
        return (
          <HistoryPage
            historyList={historyList}
            onClearHistory={handleClearHistory}
            onNavigateToPredict={() => setActivePage('predict')}
          />
        );
      case 'analytics':
        return <AnalyticsPage />;
      case 'performance':
        return <ModelPerformancePage />;
      case 'features':
        return <FeatureInsightsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <DashboardPage onNavigate={setActivePage} historyList={historyList} />;
    }
  };

  return (
    <div className="app-container">
      {/* Left Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Navbar
          activePage={activePage}
          setIsSidebarOpen={setIsSidebarOpen}
          onQuickPredict={() => setActivePage('predict')}
        />

        <main className="content-area">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
