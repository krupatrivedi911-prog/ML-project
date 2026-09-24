import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Sliders,
  Scale,
  Award,
  AlertCircle
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { MODEL_METRICS } from '../data/mockData';

export default function AnalyticsPage() {
  return (
    <div className="fade-in">
      {/* Overview Notice on R² */}
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
          <Award size={22} />
        </div>
        <div>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
            Week 4 Model Evaluation Benchmark
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            {MODEL_METRICS.r2Explanation}
          </p>
        </div>
      </div>

      {/* 4 Key Evaluation Metric Cards */}
      <div className="metrics-grid">
        <MetricCard
          name="Mean Absolute Error (MAE)"
          value={MODEL_METRICS.mae.toFixed(2)}
          unit="Boxes"
          badge="Average Error"
          description="On average, predicted chocolate paan sales deviate by ~7.71 boxes from true sales volume."
        />

        <MetricCard
          name="Mean Squared Error (MSE)"
          value={MODEL_METRICS.mse.toFixed(2)}
          badge="Squared Loss"
          description="Average squared distance between true sales and linear model predictions."
        />

        <MetricCard
          name="Root Mean Squared Error (RMSE)"
          value={MODEL_METRICS.rmse.toFixed(2)}
          unit="Boxes"
          badge="Standard Error"
          description="Square root of MSE (8.93 boxes), penalizing larger outliers more heavily than MAE."
        />

        <MetricCard
          name="Coefficient of Determination (R²)"
          value={MODEL_METRICS.r2Score.toFixed(4)}
          highlight
          badge="94.49% Fit"
          description="Measures goodness of fit (0.9449). Not binary percentage accuracy."
        />
      </div>

      {/* Training vs Testing R² Comparison (Model Fit Diagnostic) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Scale size={20} color="var(--color-accent)" />
              <span>Train vs Test Fit Diagnosis</span>
            </h3>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                background: '#E8F5E9',
                color: '#2E7D32',
                border: '1px solid #A5D6A7',
              }}
            >
              Model is Well Fitted
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-chocolate)' }}>Training R² Score</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Computed on 80% train partition (8,000 samples)</div>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {MODEL_METRICS.trainScore.toFixed(4)}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-chocolate)' }}>Testing R² Score</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Computed on 20% test partition (2,000 samples)</div>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {MODEL_METRICS.testScore.toFixed(4)}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-chocolate)' }}>Absolute Difference</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>|Train R² - Test R²| (Threshold: &le; 0.05)</div>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2E7D32' }}>
                {MODEL_METRICS.difference.toFixed(4)}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.2rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            Because the variance difference (0.0047) is well within the 0.05 bound, the model generalizes gracefully without overfitting to the training split or underfitting the variance.
          </div>
        </div>

        {/* Viva Academic Defense Note on R² vs Accuracy */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-accent)' }}>
          <div className="card-header">
            <h3 className="card-title">
              <HelpCircle size={20} color="var(--color-accent)" />
              <span>Viva Guide: Why R² is NOT "Accuracy"</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
            <p>
              In regression analysis, the target variable (<code>Boxes_Sold</code>) is continuous rather than categorical. Therefore, classification "accuracy" (e.g. correct vs incorrect labels) is mathematically undefined.
            </p>
            <div style={{ padding: '0.75rem 1rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <strong>Formula:</strong> <code>R² = 1 - (SS_res / SS_tot)</code>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                Where SS_res is residual sum of squares and SS_tot is total sum of squares.
              </div>
            </div>
            <p style={{ color: 'var(--color-text-muted)' }}>
              An R² score of <strong>0.9449</strong> indicates that 94.49% of the variability in daily chocolate paan sales is accounted for by our 14 predictors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
