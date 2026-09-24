import React from 'react';

export default function ChartCard({ title, subtitle, action, caption, children, height = '360px' }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div style={{ position: 'relative', width: '100%', height, minHeight: '260px' }}>
        {children}
      </div>

      {caption && (
        <div
          style={{
            marginTop: '1rem',
            paddingTop: '0.8rem',
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.82rem',
            color: 'var(--color-text-muted)',
            lineHeight: '1.5',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
