import React, { useState } from 'react';
import {
  ShoppingBag,
  TrendingUp,
  BrainCircuit,
  Sparkles,
  Award,
  ArrowRight,
  Eye,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import Button from '../components/Button';
import { MOCK_SALES_OVERVIEW, MODEL_METRICS } from '../data/mockData';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage({ onNavigate, historyList }) {
  const [timeRange, setTimeRange] = useState('30d');

  // Filter data based on selected range
  const displayData = timeRange === '14d' ? MOCK_SALES_OVERVIEW.slice(-14) : MOCK_SALES_OVERVIEW;

  const chartData = {
    labels: displayData.map((d) => d.date),
    datasets: [
      {
        label: 'Actual Sales (Boxes)',
        data: displayData.map((d) => d.actual),
        borderColor: '#5A2D22', // Chocolate primary
        backgroundColor: 'rgba(90, 45, 34, 0.08)',
        borderWidth: 2.5,
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#5A2D22',
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: 'Predicted Sales (Model Output)',
        data: displayData.map((d) => d.predicted),
        borderColor: '#D99A3D', // Accent Amber / Gold
        backgroundColor: 'rgba(217, 154, 61, 0.12)',
        borderWidth: 2.5,
        borderDash: [5, 4],
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#D99A3D',
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 600 },
          color: '#5A2D22',
        },
      },
      tooltip: {
        backgroundColor: '#2B211D',
        titleFont: { family: "'Outfit', sans-serif", size: 13, weight: 700 },
        bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return ` ${context.dataset.label}: ${context.parsed.y} Boxes`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: '#7A6B64' },
      },
      y: {
        grid: { color: 'rgba(234, 219, 206, 0.6)' },
        ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: '#7A6B64' },
        title: {
          display: true,
          text: 'Boxes Sold',
          font: { family: "'Outfit', sans-serif", size: 12, weight: 600 },
          color: '#5A2D22',
        },
      },
    },
  };

  return (
    <div className="fade-in">
      {/* 4 Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Sales"
          value="10,245"
          unit="Boxes"
          icon={ShoppingBag}
          pillText="+14.2% MoM"
          pillType="growth"
          subtitle="Cumulative tracked sales"
        />

        <StatCard
          title="Average Daily Sales"
          value="342"
          unit="Boxes / Day"
          icon={TrendingUp}
          pillText="Steady Demand"
          pillType="growth"
          subtitle="Across all channels"
        />

        <StatCard
          title="Model Explanatory Fit"
          value={MODEL_METRICS.r2Score.toFixed(4)}
          unit="R²"
          icon={BrainCircuit}
          pillText="94.49% Variance"
          pillType="fit"
          subtitle="Test R² (well-fitted model)"
        />

        <StatCard
          title="Total Predictions"
          value="1,248"
          unit="Runs"
          icon={Sparkles}
          pillText="Active Engine"
          pillType="fit"
          subtitle="Scored business forecasts"
        />
      </div>

      {/* Sales Overview Area Chart */}
      <div style={{ marginBottom: '2rem' }}>
        <ChartCard
          title="Sales Overview: Actual vs Predicted"
          subtitle="Comparative analysis of actual counter & delivery sales against machine learning linear predictions."
          height="380px"
          action={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`btn ${timeRange === '14d' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                onClick={() => setTimeRange('14d')}
              >
                14 Days
              </button>
              <button
                className={`btn ${timeRange === '30d' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                onClick={() => setTimeRange('30d')}
              >
                30 Days
              </button>
            </div>
          }
          caption="Note: Graph displays 30-day simulated timeline based on model evaluation records. Peak demand periods correspond to weekend spikes and festive promotions."
        >
          <Line data={chartData} options={chartOptions} />
        </ChartCard>
      </div>

      {/* Split Grid: Quick Forecast CTA & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
        {/* Recent Prediction Activity */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Predictions Activity</h3>
              <p className="card-subtitle">Latest business condition runs and demand classifications.</p>
            </div>
            <button
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
              onClick={() => onNavigate('history')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Forecast</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {historyList.slice(0, 5).map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.date}</td>
                    <td>₹{item.price}</td>
                    <td>{item.discountPercentage}%</td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                      {item.predictedBoxes} Boxes
                    </td>
                    <td>
                      <span
                        className={`demand-badge ${
                          item.status === 'High'
                            ? 'badge-high'
                            : item.status === 'Low'
                            ? 'badge-low'
                            : 'badge-medium'
                        }`}
                        style={{ margin: 0, padding: '0.2rem 0.65rem', fontSize: '0.78rem' }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Card: Predict Demand Today */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(145deg, var(--color-primary) 0%, var(--color-chocolate) 100%)',
            color: 'var(--color-cream)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(217, 154, 61, 0.25)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={24} />
            </div>

            <h3 style={{ color: 'var(--color-cream)', fontSize: '1.35rem', marginBottom: '0.6rem' }}>
              Simulate Today's Demand
            </h3>

            <p style={{ color: 'rgba(255,248,240,0.8)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Enter weather conditions, pricing adjustments, weekend status, and active Instagram/YouTube campaigns to project expected chocolate paan box sales.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', color: 'rgba(255,248,240,0.75)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="var(--color-accent)" />
                <span>Immediate Box Output Estimation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={15} color="var(--color-accent)" />
                <span>Demand Tier (High / Medium / Low)</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.8rem' }}>
            <Button
              variant="accent"
              size="lg"
              style={{ width: '100%' }}
              onClick={() => onNavigate('predict')}
              icon={Sparkles}
            >
              Launch Predictor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
