import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  History,
  BarChart3,
  LineChart,
  SlidersHorizontal,
  Info,
  LogOut,
  X,
  TrendingUp
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'predict', label: 'Predict Sales', icon: Sparkles },
    { id: 'history', label: 'Prediction History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'performance', label: 'Model Performance', icon: LineChart },
    { id: 'features', label: 'Feature Insights', icon: SlidersHorizontal },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 95,
          }}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-badge">🍫</div>
          <div className="logo-text">
            <h2>ChocoPaan AI</h2>
            <span>Sales Prediction System</span>
          </div>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              style={{
                marginLeft: 'auto',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-cream)',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
              >
                <Icon />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-mini-card">
            <div className="user-avatar">ML</div>
            <div className="user-info">
              <div className="user-name">BTech Project Team</div>
              <div className="user-role">Student Analyst</div>
            </div>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
