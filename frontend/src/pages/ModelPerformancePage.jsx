import React, { useState } from 'react';
import ChartCard from '../components/ChartCard';
import MetricCard from '../components/MetricCard';
import {
  WEEK5_MODELS,
  WEEK5_DIAGNOSTICS,
  WEEK5_SAMPLE_COMPARISONS,
  WEEK5_SCENARIOS,
} from '../data/mockData';

// Chart.js imports
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter, Bar } from 'react-chartjs-2';
import {
  Award,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Layers,
  ArrowUpDown,
  Info,
  Calendar,
  Zap,
  Sliders
} from 'lucide-react';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ModelPerformancePage() {
  // Scenario state for "Live Multi-Model Prediction Output Comparison"
  const [activeScenarioId, setActiveScenarioId] = useState(WEEK5_SCENARIOS[0].id);

  // Active model selection state (for scatter/residual diagnostics)
  const [selectedModelId, setSelectedModelId] = useState('linear');
  
  // Benchmark comparison chart tab state
  const [comparisonTab, setComparisonTab] = useState('r2'); // 'r2', 'rmse', 'mae', 'traintest'

  // Currently active scenario
  const currentScenario = WEEK5_SCENARIOS.find((s) => s.id === activeScenarioId) || WEEK5_SCENARIOS[0];
  const scPreds = currentScenario.predictions;

  // Selected diagnostic model
  const currentModel = WEEK5_MODELS.find((m) => m.id === selectedModelId) || WEEK5_MODELS[0];
  const currentDiag = WEEK5_DIAGNOSTICS[selectedModelId] || WEEK5_DIAGNOSTICS['linear'];
  const bestModel = WEEK5_MODELS.find((m) => m.isBest) || WEEK5_MODELS[0];

  // ---------------------------------------------------------------------------
  // 1. LIVE SCENARIO MULTI-MODEL PREDICTIONS BAR CHART
  // ---------------------------------------------------------------------------
  const scenarioBarData = {
    labels: [
      'Linear Regression',
      'Gradient Boosting',
      'Random Forest',
      'Decision Tree',
      'SVR (RBF Kernel)',
    ],
    datasets: [
      {
        label: 'Predicted Boxes Sold',
        data: [
          scPreds.linear,
          scPreds.gradientBoosting,
          scPreds.randomForest,
          scPreds.decisionTree,
          scPreds.svr,
        ],
        backgroundColor: [
          '#2E7D32', // Linear: Top green
          '#1565C0', // GB: Royal blue
          '#6A1B9A', // RF: Purple
          '#C62828', // Tree: Red
          '#D99A3D', // SVR: Amber
        ],
        borderColor: '#3B1F1F',
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  const scenarioBarOptions = {
    indexAxis: 'y', // Horizontal bars for easy comparison
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#2B211D',
        titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 700 },
        bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
        callbacks: {
          label: (ctx) => ` Predicted Output: ${ctx.parsed.x} Boxes Sold`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(234, 219, 206, 0.6)' },
        ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: '#7A6B64' },
        title: {
          display: true,
          text: 'Predicted Sales Volume (Boxes)',
          font: { family: "'Outfit', sans-serif", size: 12, weight: 600 },
          color: '#5A2D22',
        },
      },
      y: {
        grid: { display: false },
        ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 700 }, color: '#5A2D22' },
      },
    },
  };

  // ---------------------------------------------------------------------------
  // 2. MASTER BENCHMARK CHARTS (R², RMSE, MAE, Train vs Test)
  // ---------------------------------------------------------------------------
  const modelLabels = WEEK5_MODELS.map((m) => m.name);

  const r2ChartData = {
    labels: modelLabels,
    datasets: [
      {
        label: 'Test R² Score (Higher is Better)',
        data: WEEK5_MODELS.map((m) => m.r2Score),
        backgroundColor: WEEK5_MODELS.map((m) =>
          m.id === 'linear' ? '#2E7D32' : m.id === selectedModelId ? '#D99A3D' : '#795548'
        ),
        borderColor: '#4E342E',
        borderWidth: 1.5,
        borderRadius: 6,
      },
    ],
  };

  const rmseChartData = {
    labels: modelLabels,
    datasets: [
      {
        label: 'RMSE (Lower is Better)',
        data: WEEK5_MODELS.map((m) => m.rmse),
        backgroundColor: WEEK5_MODELS.map((m) =>
          m.id === 'linear' ? '#2E7D32' : m.id === 'tree' ? '#C62828' : '#D99A3D'
        ),
        borderColor: '#4E342E',
        borderWidth: 1.5,
        borderRadius: 6,
      },
    ],
  };

  const maeChartData = {
    labels: modelLabels,
    datasets: [
      {
        label: 'MAE (Lower is Better)',
        data: WEEK5_MODELS.map((m) => m.mae),
        backgroundColor: WEEK5_MODELS.map((m) =>
          m.id === 'linear' ? '#2E7D32' : m.id === 'tree' ? '#E65100' : '#8D6E63'
        ),
        borderColor: '#4E342E',
        borderWidth: 1.5,
        borderRadius: 6,
      },
    ],
  };

  const trainTestChartData = {
    labels: modelLabels,
    datasets: [
      {
        label: 'Training R² (Train Fit)',
        data: WEEK5_MODELS.map((m) => m.trainScore),
        backgroundColor: '#1565C0',
        borderColor: '#0D47A1',
        borderWidth: 1.5,
        borderRadius: 6,
      },
      {
        label: 'Testing R² (Test Generalization)',
        data: WEEK5_MODELS.map((m) => m.r2Score),
        backgroundColor: '#FF8F00',
        borderColor: '#E65100',
        borderWidth: 1.5,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 600 }, color: '#5A2D22' },
      },
      tooltip: {
        backgroundColor: '#2B211D',
        titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 700 },
        bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: '#5A2D22' },
      },
      y: {
        grid: { color: 'rgba(234, 219, 206, 0.6)' },
        ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: '#7A6B64' },
      },
    },
  };

  // ---------------------------------------------------------------------------
  // 3. DIAGNOSTIC SCATTER & RESIDUAL PLOTS
  // ---------------------------------------------------------------------------
  const scatterData = {
    datasets: [
      {
        label: `${currentModel.name} Test Predictions`,
        data: currentDiag.scatter,
        backgroundColor: currentModel.isBest ? '#2E7D32' : currentModel.id === 'tree' ? '#C62828' : '#5A2D22',
        borderColor: '#3B1F1F',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8.5,
      },
      {
        label: 'Ideal Line (Y = X)',
        data: [
          { x: 80, y: 80 },
          { x: 300, y: 300 },
        ],
        type: 'line',
        borderColor: '#D99A3D',
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { usePointStyle: true, font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 600 }, color: '#5A2D22' },
      },
      tooltip: {
        backgroundColor: '#2B211D',
        callbacks: {
          label: (ctx) => ` Actual: ${ctx.parsed.x} | Predicted: ${ctx.parsed.y} Boxes`,
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: { display: true, text: 'Actual Boxes Sold (Ground Truth)', color: '#5A2D22', font: { weight: 600 } },
        grid: { color: 'rgba(234, 219, 206, 0.6)' },
        ticks: { color: '#7A6B64' },
      },
      y: {
        type: 'linear',
        title: { display: true, text: `Predicted Boxes Sold (${currentModel.name})`, color: '#5A2D22', font: { weight: 600 } },
        grid: { color: 'rgba(234, 219, 206, 0.6)' },
        ticks: { color: '#7A6B64' },
      },
    },
  };

  const residualData = {
    datasets: [
      {
        label: `${currentModel.name} Residuals (Actual - Predicted)`,
        data: currentDiag.residuals,
        backgroundColor: currentModel.isBest ? '#D99A3D' : '#BF8228',
        borderColor: '#5A2D22',
        borderWidth: 1,
        pointRadius: 5.5,
      },
      {
        label: 'Zero Baseline (Y = 0)',
        data: [
          { x: 80, y: 0 },
          { x: 300, y: 0 },
        ],
        type: 'line',
        borderColor: '#5A2D22',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const residualOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'end', labels: { font: { weight: 600 }, color: '#5A2D22' } },
      tooltip: {
        backgroundColor: '#2B211D',
        callbacks: {
          label: (ctx) => ` Predicted: ${ctx.parsed.x} | Error: ${ctx.parsed.y} Boxes`,
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: { display: true, text: 'Predicted Sales', color: '#5A2D22', font: { weight: 600 } },
        grid: { color: 'rgba(234, 219, 206, 0.6)' },
      },
      y: {
        type: 'linear',
        title: { display: true, text: 'Residual (Y - Ŷ)', color: '#5A2D22', font: { weight: 600 } },
        grid: { color: 'rgba(234, 219, 206, 0.6)' },
      },
    },
  };

  return (
    <div className="fade-in" style={{ paddingBottom: '3rem' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-cream) 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.6rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: 'var(--color-primary)',
                color: 'var(--color-cream)',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
              }}
            >
              Week 5 Multi-Model Comparison
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              AI-Based Chocolate Paan Sales Prediction System
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', color: 'var(--color-primary)', margin: 0, fontWeight: 800 }}>
            Model Performance & Prediction Output Comparison
          </h2>
          <p style={{ margin: '0.3rem 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Comparing what value each model outputs for the same inputs, side-by-side on test samples and live business scenarios.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            background: 'var(--color-surface)',
            border: '1.5px solid var(--color-accent)',
            borderRadius: 'var(--radius-md)',
            padding: '0.7rem 1.1rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Award size={26} color="#D99A3D" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Top Candidate Model
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {bestModel.name} (R² = {bestModel.r2Score})
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* FEATURE 1: LIVE MULTI-MODEL PREDICTION COMPARISON (SIDE-BY-SIDE) */}
      {/* ------------------------------------------------------------------- */}
      <div
        className="card"
        style={{
          marginBottom: '2.5rem',
          border: '2px solid var(--color-accent)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 100%)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div className="card-header" style={{ marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.6rem',
                  borderRadius: '999px',
                  background: '#D99A3D',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}
              >
                Interactive Comparison
              </span>
              <h3 className="card-title" style={{ margin: 0, fontSize: '1.3rem' }}>
                <Zap size={22} color="#D99A3D" />
                Live Multi-Model Output Comparator: "What Does Each Model Predict?"
              </h3>
            </div>
            <p className="card-subtitle">
              Select any real-world business condition to compare the exact sales prediction from all 5 models simultaneously.
            </p>
          </div>
        </div>

        {/* Scenario Selection Pills */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {WEEK5_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.86rem',
                fontWeight: 700,
                border: activeScenarioId === sc.id ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                background: activeScenarioId === sc.id ? 'var(--color-primary)' : 'var(--color-cream)',
                color: activeScenarioId === sc.id ? 'var(--color-cream)' : 'var(--color-chocolate)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: activeScenarioId === sc.id ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.18s ease',
              }}
            >
              <span>{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Scenario Conditions Summary Banner */}
        <div
          style={{
            background: 'var(--color-cream)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            padding: '1rem 1.4rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Condition Profile: {currentScenario.title}
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--color-chocolate)', fontWeight: 600, marginTop: '0.2rem' }}>
              {currentScenario.desc}
            </div>
          </div>

          {/* Key parameter badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.76rem', background: '#FFFFFF', border: '1px solid var(--color-border)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
              Temp: {currentScenario.features.Temperature}°C
            </span>
            <span style={{ fontSize: '0.76rem', background: '#FFFFFF', border: '1px solid var(--color-border)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
              Price: ₹{currentScenario.features.Price}
            </span>
            <span style={{ fontSize: '0.76rem', background: '#FFFFFF', border: '1px solid var(--color-border)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
              Discount: {currentScenario.features.Discount_Percentage}%
            </span>
            <span style={{ fontSize: '0.76rem', background: '#FFFFFF', border: '1px solid var(--color-border)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
              Festival: {currentScenario.features.Festival ? 'Yes' : 'No'}
            </span>
            <span style={{ fontSize: '0.76rem', background: '#FFFFFF', border: '1px solid var(--color-border)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
              Weekend: {currentScenario.features.Weekend ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {/* 5 SIDE-BY-SIDE MODEL VALUE CARDS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.8rem',
          }}
        >
          {/* 1. Linear Regression */}
          <div
            style={{
              background: '#F0F9F1',
              border: '2px solid #2E7D32',
              borderRadius: 'var(--radius-lg)',
              padding: '1.2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.7rem', fontWeight: 800, background: '#2E7D32', color: '#FFF', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>
              Rank 1 (Best)
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1B5E20', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.3rem' }}>
              Linear Regression
            </div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#1B5E20', margin: '0.4rem 0' }}>
              {scPreds.linear}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#2E7D32', marginLeft: '4px' }}>Boxes</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#2E7D32', fontWeight: 600 }}>
              R² = 0.9449 | Top Test Accuracy
            </div>
          </div>

          {/* 2. Gradient Boosting */}
          <div
            style={{
              background: '#F0F5FA',
              border: '1.5px solid #1565C0',
              borderRadius: 'var(--radius-lg)',
              padding: '1.2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.7rem', fontWeight: 800, background: '#1565C0', color: '#FFF', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>
              Rank 2
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0D47A1', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.3rem' }}>
              Gradient Boosting
            </div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#0D47A1', margin: '0.4rem 0' }}>
              {scPreds.gradientBoosting}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1565C0', marginLeft: '4px' }}>Boxes</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#1565C0', fontWeight: 600 }}>
              R² = 0.9161 | Boosted Trees
            </div>
          </div>

          {/* 3. SVR (RBF Kernel) */}
          <div
            style={{
              background: '#FCF9F0',
              border: '1.5px solid #D99A3D',
              borderRadius: 'var(--radius-lg)',
              padding: '1.2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.7rem', fontWeight: 800, background: '#D99A3D', color: '#FFF', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>
              Rank 3
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#B76200', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.3rem' }}>
              SVR (RBF Kernel)
            </div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#B76200', margin: '0.4rem 0' }}>
              {scPreds.svr}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#D99A3D', marginLeft: '4px' }}>Boxes</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#B76200', fontWeight: 600 }}>
              R² = 0.9001 | Scaled Margin
            </div>
          </div>

          {/* 4. Random Forest */}
          <div
            style={{
              background: '#F9F4FA',
              border: '1.5px solid #6A1B9A',
              borderRadius: 'var(--radius-lg)',
              padding: '1.2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.7rem', fontWeight: 800, background: '#6A1B9A', color: '#FFF', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>
              Rank 4
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4A148C', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.3rem' }}>
              Random Forest
            </div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#4A148C', margin: '0.4rem 0' }}>
              {scPreds.randomForest}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#6A1B9A', marginLeft: '4px' }}>Boxes</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6A1B9A', fontWeight: 600 }}>
              R² = 0.8503 | 100 Trees Average
            </div>
          </div>

          {/* 5. Decision Tree */}
          <div
            style={{
              background: '#FDF2F2',
              border: '1.5px solid #C62828',
              borderRadius: 'var(--radius-lg)',
              padding: '1.2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '0.7rem', fontWeight: 800, background: '#C62828', color: '#FFF', padding: '0.1rem 0.5rem', borderRadius: '999px' }}>
              Rank 5 (Overfit)
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#B71C1C', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '0.3rem' }}>
              Decision Tree
            </div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#B71C1C', margin: '0.4rem 0' }}>
              {scPreds.decisionTree}
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#C62828', marginLeft: '4px' }}>Boxes</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#C62828', fontWeight: 600 }}>
              R² = 0.6174 | High Variance
            </div>
          </div>
        </div>

        {/* Visual Bar Comparison of the 5 values for this scenario */}
        <div style={{ height: '220px', width: '100%', position: 'relative' }}>
          <Bar data={scenarioBarData} options={scenarioBarOptions} />
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* FEATURE 2: SIDE-BY-SIDE TEST SAMPLES COMPARISON TABLE */}
      {/* ------------------------------------------------------------------- */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Layers size={20} color="var(--color-accent)" />
              Side-by-Side Test Samples Comparison Table
            </h3>
            <p className="card-subtitle">
              Ground truth Actual Boxes Sold versus individual model predictions on unseen test samples.
            </p>
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2E7D32', background: '#E8F5E9', padding: '0.3rem 0.8rem', borderRadius: '999px' }}>
            Unseen Test Samples (N = 2,000)
          </div>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th style={{ width: '110px' }}>Sample ID</th>
                <th style={{ background: '#F5EBE1', color: 'var(--color-primary)', fontWeight: 800 }}>
                  Actual Boxes (Y)
                </th>
                <th style={{ color: '#2E7D32', fontWeight: 800 }}>Linear Regression</th>
                <th style={{ color: '#1565C0', fontWeight: 800 }}>Gradient Boosting</th>
                <th style={{ color: '#B76200', fontWeight: 800 }}>SVR (RBF)</th>
                <th style={{ color: '#6A1B9A', fontWeight: 800 }}>Random Forest</th>
                <th style={{ color: '#C62828', fontWeight: 800 }}>Decision Tree</th>
                <th>Closest Model</th>
              </tr>
            </thead>
            <tbody>
              {WEEK5_SAMPLE_COMPARISONS.map((row) => (
                <tr key={row.sampleId}>
                  <td style={{ fontWeight: 700, color: 'var(--color-text-muted)' }}>{row.sampleId}</td>
                  <td style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-primary)', background: 'rgba(217, 154, 61, 0.08)' }}>
                    {row.actual} Boxes
                  </td>
                  <td style={{ fontWeight: 700, color: '#1B5E20' }}>
                    {row.linear.toFixed(1)}
                  </td>
                  <td style={{ fontWeight: 600, color: '#0D47A1' }}>
                    {row.gradientBoosting.toFixed(1)}
                  </td>
                  <td style={{ fontWeight: 600, color: '#B76200' }}>
                    {row.svr.toFixed(1)}
                  </td>
                  <td style={{ fontWeight: 600, color: '#4A148C' }}>
                    {row.randomForest.toFixed(1)}
                  </td>
                  <td style={{ fontWeight: 600, color: '#B71C1C' }}>
                    {row.decisionTree.toFixed(1)}
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        background:
                          row.closestModel === 'Linear Regression'
                            ? '#E8F5E9'
                            : row.closestModel === 'Gradient Boosting'
                            ? '#E3F2FD'
                            : row.closestModel === 'SVR'
                            ? '#FFF8E1'
                            : '#F3E5F5',
                        color:
                          row.closestModel === 'Linear Regression'
                            ? '#2E7D32'
                            : row.closestModel === 'Gradient Boosting'
                            ? '#1565C0'
                            : row.closestModel === 'SVR'
                            ? '#B76200'
                            : '#6A1B9A',
                        border: '1px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      ✓ {row.closestModel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* FEATURE 3: MASTER METRICS TABLE (MAE, MSE, RMSE, R²) */}
      {/* ------------------------------------------------------------------- */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <BarChart3 size={20} color="var(--color-accent)" />
              Week 5 Algorithm Performance Benchmark Table
            </h3>
            <p className="card-subtitle">
              Scientific regression metrics evaluated across all 5 models on the 2,000-sample test set.
            </p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'center', width: '70px' }}>Rank</th>
                <th>Model</th>
                <th>Type</th>
                <th>MAE (Boxes)</th>
                <th>MSE</th>
                <th>RMSE (Boxes)</th>
                <th>Test R²</th>
                <th>Train R²</th>
                <th>Generalization Gap</th>
                <th>Fit Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {WEEK5_MODELS.map((m) => {
                const isSelected = m.id === selectedModelId;
                return (
                  <tr
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    style={{
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(217, 154, 61, 0.08)' : undefined,
                    }}
                  >
                    <td style={{ textAlign: 'center', fontWeight: 800 }}>
                      {m.rank === 1 ? '🥇 1st' : m.rank === 2 ? '🥈 2nd' : m.rank === 3 ? '🥉 3rd' : `#${m.rank}`}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{m.name}</span>
                        {m.isBest && (
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: '999px', background: '#E8F5E9', color: '#2E7D32' }}>
                            Winner
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.84rem' }}>{m.family}</td>
                    <td style={{ fontWeight: 600 }}>{m.mae.toFixed(2)}</td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{m.mse.toFixed(1)}</td>
                    <td style={{ fontWeight: 700, color: m.rank === 1 ? '#2E7D32' : undefined }}>{m.rmse.toFixed(2)}</td>
                    <td style={{ fontWeight: 800, color: m.rank === 1 ? '#2E7D32' : 'var(--color-primary)', fontSize: '1rem' }}>
                      {m.r2Score.toFixed(4)}
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{m.trainScore.toFixed(4)}</td>
                    <td style={{ fontWeight: 700, color: m.difference > 0.08 ? '#C62828' : '#2E7D32' }}>
                      {m.difference > 0 ? `+${m.difference.toFixed(4)}` : m.difference.toFixed(4)}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '999px',
                          background: m.status === 'Severe Overfit' ? '#FFEBEE' : m.status === 'Noticeable Overfit' ? '#FFF3E0' : '#E8F5E9',
                          color: m.status === 'Severe Overfit' ? '#C62828' : m.status === 'Noticeable Overfit' ? '#E65100' : '#2E7D32',
                        }}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* FEATURE 4: MULTI-MODEL COMPARISON CHARTS (TABS) */}
      {/* ------------------------------------------------------------------- */}
      <div style={{ marginBottom: '2.5rem' }}>
        <ChartCard
          title="Comparative Algorithm Visualizations"
          subtitle="Direct benchmark charts across R², RMSE, MAE, and Training vs Testing Generalization."
          height="380px"
          action={
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { id: 'r2', label: 'R² Score' },
                { id: 'rmse', label: 'RMSE' },
                { id: 'mae', label: 'MAE' },
                { id: 'traintest', label: 'Train vs Test R²' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setComparisonTab(tab.id)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    background: comparisonTab === tab.id ? 'var(--color-primary)' : 'var(--color-cream)',
                    color: comparisonTab === tab.id ? 'var(--color-cream)' : 'var(--color-chocolate)',
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          }
          caption={
            comparisonTab === 'r2'
              ? 'R² Comparison: Linear Regression (0.9449) and Gradient Boosting (0.9161) explain the highest variance in chocolate paan demand.'
              : comparisonTab === 'rmse'
              ? 'RMSE Comparison: Linear Regression produces lowest error (8.93 boxes), whereas Decision Tree exhibits error spike (23.53 boxes).'
              : comparisonTab === 'mae'
              ? 'MAE Comparison: Linear Regression averages 7.71 boxes error across test sales scenarios.'
              : 'Overfitting Diagnosis: The massive gap for Decision Tree (Train R² = 1.000 vs Test R² = 0.6174, gap = 0.3826) reveals severe training noise memorization.'
          }
        >
          {comparisonTab === 'r2' && <Bar data={r2ChartData} options={barOptions} />}
          {comparisonTab === 'rmse' && <Bar data={rmseChartData} options={barOptions} />}
          {comparisonTab === 'mae' && <Bar data={maeChartData} options={barOptions} />}
          {comparisonTab === 'traintest' && <Bar data={trainTestChartData} options={barOptions} />}
        </ChartCard>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* FEATURE 5: MODEL-SPECIFIC SCATTER & RESIDUAL DIAGNOSTICS */}
      {/* ------------------------------------------------------------------- */}
      <div
        style={{
          background: 'var(--color-cream)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.2rem 1.6rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Sparkles size={22} color="var(--color-accent)" />
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-primary)', fontWeight: 700 }}>
              Diagnostic Inspector: {currentModel.name}
            </h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Inspect Actual vs Predicted scatter points and residual homoscedasticity for this specific model.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {WEEK5_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModelId(m.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: selectedModelId === m.id ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                background: selectedModelId === m.id ? 'var(--color-primary)' : 'var(--color-surface)',
                color: selectedModelId === m.id ? 'var(--color-cream)' : 'var(--color-text)',
                cursor: 'pointer',
              }}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <ChartCard
          title={`Actual vs Predicted (${currentModel.name})`}
          subtitle="Points closer to the golden line (Y = X) indicate accurate sales predictions."
          height="350px"
          caption={`Test R² = ${currentModel.r2Score}. Closeness to diagonal reflects empirical predictive power.`}
        >
          <Scatter data={scatterData} options={scatterOptions} />
        </ChartCard>

        <ChartCard
          title={`Residual Distribution (${currentModel.name})`}
          subtitle="Residuals (Actual - Predicted) plotted against fitted values."
          height="350px"
          caption={`Residual spread reflects an RMSE of ${currentModel.rmse} boxes for ${currentModel.name}.`}
        >
          <Scatter data={residualData} options={residualOptions} />
        </ChartCard>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* FEATURE 6: FACULTY VIVA QUESTIONS & INSIGHTS */}
      {/* ------------------------------------------------------------------- */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Info size={20} color="var(--color-accent)" />
              Faculty Viva Q&A Quick Guide (Week 5)
            </h3>
            <p className="card-subtitle">
              Prepared justifications for your faculty viva regarding algorithmic behavior and model selection.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.2rem', borderRadius: 'var(--radius-md)', background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <CheckCircle size={18} color="#2E7D32" />
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                Q: Why did Linear Regression give the best test performance?
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: '1.55' }}>
              <strong>Answer:</strong> Chocolate paan sales are driven by predominantly additive linear forces (baseline + festival lift + weekend surge + reel promotions - price elasticity). Linear Regression matches this true data structure directly without fitting training noise.
            </p>
          </div>

          <div style={{ padding: '1.2rem', borderRadius: 'var(--radius-md)', background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <AlertTriangle size={18} color="#C62828" />
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                Q: Why did Decision Tree suffer from severe overfitting?
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: '1.55' }}>
              <strong>Answer:</strong> An unpruned Decision Tree achieved Training R² = 1.0000 by growing until every leaf held single samples. When evaluated on unseen test data, its score crashed to 0.6174 (a 38.3% generalization gap).
            </p>
          </div>

          <div style={{ padding: '1.2rem', borderRadius: 'var(--radius-md)', background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <TrendingUp size={18} color="#1565C0" />
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                Q: Why is scaling needed for SVR but not tree models?
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: '1.55' }}>
              <strong>Answer:</strong> SVR calculates Euclidean distances ($||x_i - x_j||^2$), so marketing budget (thousands) would overwhelm customer rating (1–5). Tree models split on single-feature rank inequalities ($X_j \le c$), making them invariant to scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
