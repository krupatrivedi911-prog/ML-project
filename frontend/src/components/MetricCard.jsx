import React from 'react';

export default function MetricCard({ name, value, unit, description, badge, highlight }) {
  return (
    <div
      className="metric-card"
      style={
        highlight
          ? {
              border: '2px solid var(--color-accent)',
              background: 'linear-gradient(145deg, var(--color-surface) 0%, var(--color-cream) 100%)',
            }
          : {}
      }
    >
      <div>
        <div className="metric-card-top">
          <span className="metric-name">{name}</span>
          {badge && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
                background: 'var(--color-cream)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-chocolate)',
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="metric-val">
          {value}
          {unit && (
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-muted)', marginLeft: '4px' }}>
              {unit}
            </span>
          )}
        </div>
      </div>
      {description && <div className="metric-desc">{description}</div>}
    </div>
  );
}
