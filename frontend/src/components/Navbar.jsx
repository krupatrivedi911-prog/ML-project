import React from 'react';
import { Menu, Calendar, Sparkles, BrainCircuit } from 'lucide-react';

export default function Navbar({ activePage, setIsSidebarOpen, onQuickPredict }) {
  const pageMeta = {
    dashboard: {
      title: 'Chocolate Paan Sales Dashboard',
      subtitle: 'AI-powered insights for smarter sales decisions.',
    },
    predict: {
      title: 'Predict Chocolate Paan Sales',
      subtitle: "Enter today's business conditions to estimate expected boxes sold.",
    },
    history: {
      title: 'Prediction History',
      subtitle: 'Logged model forecasts and business conditions audit trail.',
    },
    analytics: {
      title: 'Model Evaluation & Analytics',
      subtitle: 'Week 4 regression performance metrics, fit status, and error breakdown.',
    },
    performance: {
      title: 'Model Performance Visualizations',
      subtitle: 'Actual vs Predicted scatter plot and residual variance diagnostics.',
    },
    features: {
      title: 'Model Feature Weights',
      subtitle: 'Trained regression coefficients and directional impact analysis.',
    },
    about: {
      title: 'About The Machine Learning Project',
      subtitle: 'System objectives, methodology, dataset characteristics, and viva notes.',
    },
  };

  const current = pageMeta[activePage] || {
    title: 'Chocolate Paan Sales Prediction System',
    subtitle: 'Machine Learning Analytics Platform',
  };

  // Format today's date
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <header className="top-navbar">
      <div className="nav-left">
        <button
          className="menu-toggle-btn"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>
        <div className="page-title-group">
          <h1>{current.title}</h1>
          <p>{current.subtitle}</p>
        </div>
      </div>

      <div className="nav-right">
        <div className="model-pill">
          <span className="status-indicator"></span>
          <span>Linear Regression (R² 0.945)</span>
        </div>

        <div className="date-badge">
          <Calendar size={16} />
          <span>{today}</span>
        </div>

        {activePage !== 'predict' && (
          <button
            className="btn btn-accent"
            style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            onClick={onQuickPredict}
          >
            <Sparkles size={16} />
            <span>New Prediction</span>
          </button>
        )}
      </div>
    </header>
  );
}
