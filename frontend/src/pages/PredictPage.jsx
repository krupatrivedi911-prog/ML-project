import React, { useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import { predictSales } from '../data/mockData';

export default function PredictPage({ onAddPrediction, onNavigateToHistory }) {
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredict = async (features) => {
    setIsPredicting(true);
    setPredictionResult(null);

    try {
      // Calls prediction handler from mockData.js (which uses exact Week 4 ML formula)
      const boxes = await predictSales(features);

      const resultPayload = {
        boxes,
        features,
        timestamp: new Date().toISOString(),
      };

      setPredictionResult(resultPayload);

      // Add to global prediction history
      onAddPrediction({
        id: `pred-${Date.now().toString().slice(-4)}`,
        date: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        temperature: Number(features.Temperature),
        price: Number(features.Price),
        discountPercentage: Number(features.Discount_Percentage),
        marketingBudget: Number(features.Marketing_Budget),
        predictedBoxes: boxes,
        status: boxes >= 220 ? 'High' : boxes >= 140 ? 'Medium' : 'Low',
        confidence: '94.5% R² Fit',
      });
    } catch (err) {
      console.error('Prediction failed:', err);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleNewPrediction = () => {
    setPredictionResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fade-in">
      {/* Intro info box */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.6rem',
          marginBottom: '1.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>
            Machine Learning Inference Engine
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
            Configured with scikit-learn multiple linear regression coefficients ($R^2 = 0.9449$).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.8rem' }}>
          <span style={{ padding: '0.3rem 0.7rem', borderRadius: '999px', background: 'var(--color-cream)', border: '1px solid var(--color-border)', color: 'var(--color-chocolate)', fontWeight: 600 }}>
            Target: Boxes_Sold
          </span>
          <span style={{ padding: '0.3rem 0.7rem', borderRadius: '999px', background: 'var(--color-cream)', border: '1px solid var(--color-border)', color: 'var(--color-chocolate)', fontWeight: 600 }}>
            Features: 14 Variables
          </span>
        </div>
      </div>

      {/* Main Interactive Form */}
      <PredictionForm onSubmit={handlePredict} isPredicting={isPredicting} />

      {/* Result Display Section */}
      {predictionResult && (
        <div id="prediction-result-anchor" style={{ marginTop: '2.5rem' }}>
          <PredictionResult
            result={predictionResult}
            onNewPrediction={handleNewPrediction}
            onViewHistory={onNavigateToHistory}
          />
        </div>
      )}
    </div>
  );
}
