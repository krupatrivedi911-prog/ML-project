import React from 'react';

export default function ToggleField({
  id,
  name,
  label,
  description,
  checked,
  onChange,
  icon: Icon,
}) {
  const handleClick = () => {
    onChange({
      target: {
        name,
        type: 'checkbox',
        checked: !checked,
      },
    });
  };

  return (
    <div
      className="toggle-row"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {Icon && (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: checked ? 'var(--color-accent-light)' : 'rgba(0,0,0,0.04)',
              color: checked ? 'var(--color-accent)' : 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <Icon size={17} />
          </div>
        )}
        <div className="toggle-info">
          <span className="toggle-title">{label}</span>
          {description && <span className="toggle-desc">{description}</span>}
        </div>
      </div>

      <div className={`switch-track ${checked ? 'active' : ''}`}>
        <div className="switch-thumb" />
      </div>
    </div>
  );
}
