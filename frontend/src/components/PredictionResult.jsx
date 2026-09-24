import React from 'react';
import { Sparkles, History, RotateCcw, CheckCircle2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { classifyDemand } from '../data/mockData';

export default function PredictionResult({ result, onNewPrediction, onViewHistory }) {
  if (!result) return null;

  const { boxes, features } = result;
  const demand = classifyDemand(boxes);

  const DemandIcon =
    demand.label === 'High'
      ? TrendingUp
      : demand.label === 'Low'
      ? TrendingDown
      : Minus;

  return (
    <div className="result-card fade-in">
      <div className="result-tag">Predicted Sales Volume</div>
      <div className="result-number">
        {boxes.toLocaleString()}
        <span>Boxes</span>
      </div>

      <div>
        <span className={`demand-badge ${demand.badgeClass}`}>
          <DemandIcon size={17} />
          <span>Expected Demand: {demand.label.toUpperCase()}</span>
        </span>
      </div>

      <p className="result-explanation">
        Based on the entered business conditions (Price: ₹{features.Price}, Discount: {features.Discount_Percentage}%, Temp: {features.Temperature}°C, Festival: {features.Festival ? 'Yes' : 'No'}, Weekend: {features.Weekend ? 'Yes' : 'No'}), the Multiple Linear Regression model projects approximately <strong>{boxes} boxes</strong> of Chocolate Paan will be sold.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '1rem',
          background: 'rgba(217, 154, 61, 0.08)',
          borderRadius: 'var(--radius-md)',
          maxWidth: '560px',
          margin: '0 auto 1.8rem auto',
          fontSize: '0.84rem',
          color: 'var(--color-chocolate)',
        }}
      >
        <span><strong>Festival Impact:</strong> {features.Festival ? '+60.3 Boxes' : 'Standard'}</span>
        <span><strong>Weekend Impact:</strong> {features.Weekend ? '+25.1 Boxes' : 'Weekday'}</span>
        <span><strong>Model Fit (R²):</strong> 0.9449</span>
      </div>

      <div className="result-actions">
        <button className="btn btn-secondary" onClick={onNewPrediction}>
          <RotateCcw size={16} />
          <span>New Prediction</span>
        </button>

        <button className="btn btn-primary" onClick={onViewHistory}>
          <History size={16} />
          <span>View Prediction History</span>
        </button>
      </div>
    </div>
  );
}
