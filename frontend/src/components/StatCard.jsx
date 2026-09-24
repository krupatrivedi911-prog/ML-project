import React from 'react';

export default function StatCard({ title, value, unit, icon: Icon, pillText, pillType = 'growth', subtitle }) {
  return (
    <div className="stat-card">
      {Icon && (
        <div className="stat-icon-wrapper">
          <Icon size={26} />
        </div>
      )}
      <div className="stat-content">
        <div className="stat-label">{title}</div>
        <div className="stat-value">
          {value}
          {unit && <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-muted)', marginLeft: '4px' }}>{unit}</span>}
        </div>
        <div className="stat-footer">
          {pillText && (
            <span className={`stat-pill ${pillType === 'growth' ? 'pill-growth' : 'pill-fit'}`}>
              {pillText}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
