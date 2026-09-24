import React from 'react';
import { SlidersHorizontal, Info, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { FEATURE_COEFFICIENTS, MODEL_CONFIG } from '../data/mockData';

export default function FeatureInsightsPage() {
  return (
    <div className="fade-in">
      {/* Educational Notice Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-cream) 0%, #FFFFFF 100%)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.4rem 1.8rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          <Info size={22} />
        </div>
        <div>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
            Understanding Linear Regression Weights
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            A positive coefficient indicates that increasing the feature is associated with an increase in the predicted target (Boxes_Sold), while a negative coefficient indicates the opposite, holding other features constant.
          </p>
          <div style={{ marginTop: '0.6rem', fontSize: '0.82rem', color: 'var(--color-chocolate)', fontWeight: 600 }}>
            Note: Raw coefficient magnitudes reflect unstandardized feature units (e.g. ₹ Marketing Budget vs Binary Festival Flag), not normalized percentage importance.
          </div>
        </div>
      </div>

      {/* Intercept Card */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          background: 'var(--color-surface)',
          borderLeft: '4px solid var(--color-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
            Model Constant Term
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
            Intercept (β₀): +{MODEL_CONFIG.intercept.toFixed(4)}
          </div>
        </div>
        <div style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', maxWidth: '480px' }}>
          Represents baseline expected boxes sold when continuous marketing features are at zero baseline levels and no active promotional campaigns are activated.
        </div>
      </div>

      {/* Model Coefficients Table / Card List */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <SlidersHorizontal size={20} color="var(--color-accent)" />
              <span>Model Coefficients (Trained Weights)</span>
            </h3>
            <p className="card-subtitle">
              Calculated via Ordinary Least Squares (OLS) on 8,000 training observations.
            </p>
          </div>
        </div>

        <div className="coef-list">
          {FEATURE_COEFFICIENTS.map((item) => (
            <div key={item.key} className="coef-item">
              <div className="coef-name-group">
                {item.positive ? (
                  <TrendingUp size={18} color="#1B5E20" />
                ) : (
                  <TrendingDown size={18} color="#C62828" />
                )}
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {item.feature}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Feature Column: <code>{item.key}</code> • Unit: {item.unit}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="coef-pill-type">{item.type}</span>
                <span
                  className={`coef-val-pill ${item.positive ? 'coef-pos' : 'coef-neg'}`}
                >
                  {item.positive ? `+${item.coef.toFixed(4)}` : `${item.coef.toFixed(4)}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
