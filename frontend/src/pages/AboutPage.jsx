import React from 'react';
import {
  Info,
  Layers,
  Database,
  CheckCircle2,
  Code,
  BookOpen,
  Sparkles,
  GitBranch,
  FileSpreadsheet
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="fade-in">
      {/* Primary Project Synopsis */}
      <div className="card" style={{ marginBottom: '1.8rem' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-badge">🍫</div>
            <div>
              <h3 className="card-title">AI-Based Chocolate Paan Sales Prediction System</h3>
              <p className="card-subtitle">BTech 5th Semester Machine Learning Project</p>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          This project implements an intelligent predictive analytics dashboard engineered to forecast daily sales of gourmet chocolate paan boxes. By learning empirical relationships between product pricing, digital promotion campaigns (Instagram, YouTube, Facebook), store demographics, and environmental variables (temperature, festivals, weekends), the model provides actionable demand estimates for business owners and supply-chain planners.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Target Variable</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>Boxes_Sold</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>Continuous daily volume count</div>
          </div>

          <div style={{ padding: '1rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Machine Learning Model</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>Linear Regression</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>scikit-learn Ordinary Least Squares</div>
          </div>

          <div style={{ padding: '1rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Train-Test Partition</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>80% Train / 20% Test</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>random_state=42 (Reproducible)</div>
          </div>

          <div style={{ padding: '1rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Dataset Scale</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>10,000 Records</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>14 Features (Numeric & Flags)</div>
          </div>
        </div>
      </div>

      {/* 14 Features Specification Table */}
      <div className="card" style={{ marginBottom: '1.8rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Database size={20} color="var(--color-accent)" />
            <span>Dataset Feature Engineering Schema</span>
          </h3>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Feature Name</th>
                <th>Data Type</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>Temperature</code></td><td>Float (°C)</td><td>Environment</td><td>Ambient daily temperature</td></tr>
              <tr><td><code>Price</code></td><td>Integer (₹)</td><td>Product & Pricing</td><td>Base selling price per box</td></tr>
              <tr><td><code>Discount_Percentage</code></td><td>Integer (%)</td><td>Product & Pricing</td><td>Promotional price discount</td></tr>
              <tr><td><code>Marketing_Budget</code></td><td>Integer (₹)</td><td>Marketing</td><td>Daily advertising expenditure</td></tr>
              <tr><td><code>Instagram_Reel</code></td><td>Binary (0/1)</td><td>Marketing</td><td>Viral short-form video promotion active</td></tr>
              <tr><td><code>YouTube_Video</code></td><td>Binary (0/1)</td><td>Marketing</td><td>Influencer feature review active</td></tr>
              <tr><td><code>Facebook_Ads</code></td><td>Binary (0/1)</td><td>Marketing</td><td>Sponsored social ads active</td></tr>
              <tr><td><code>Returning_Customers</code></td><td>Integer</td><td>Customer</td><td>Count of repeat purchasers</td></tr>
              <tr><td><code>New_Customers</code></td><td>Integer</td><td>Customer</td><td>Count of first-time purchasers</td></tr>
              <tr><td><code>Online_Orders</code></td><td>Integer</td><td>Order Channel</td><td>Delivery orders from digital apps</td></tr>
              <tr><td><code>Offline_Orders</code></td><td>Integer</td><td>Order Channel</td><td>In-person physical counter orders</td></tr>
              <tr><td><code>Customer_Rating</code></td><td>Float (1-5)</td><td>Customer</td><td>Aggregated average customer satisfaction</td></tr>
              <tr><td><code>Festival</code></td><td>Binary (0/1)</td><td>Environment</td><td>National or regional festive celebration day</td></tr>
              <tr><td><code>Weekend</code></td><td>Binary (0/1)</td><td>Environment</td><td>Saturday or Sunday operational day</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Viva Defense & Technical Q&A */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <BookOpen size={20} color="var(--color-accent)" />
            <span>Viva Examination Defense Reference</span>
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ padding: '1.2rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ color: 'var(--color-chocolate)', fontSize: '1rem', marginBottom: '0.4rem' }}>
              Q1: Why was Linear Regression chosen for sales prediction?
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
              Linear Regression offers transparent interpretability and closed-form optimization via Ordinary Least Squares. In food retail and supply-chain management, business stakeholders must understand the specific marginal impact of marketing spend, price discounts, and festival spikes, which linear coefficients clearly convey.
            </p>
          </div>

          <div style={{ padding: '1.2rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ color: 'var(--color-chocolate)', fontSize: '1rem', marginBottom: '0.4rem' }}>
              Q2: How do we interpret the high R² score of 0.9449?
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
              R² (Coefficient of Determination) quantifies the proportion of variance in <code>Boxes_Sold</code> predictable from the 14 features. The score of 0.9449 means ~94.5% of sales variance is explained. Comparing Training R² (0.9402) with Testing R² (0.9449) shows a negligible difference (0.0047), proving the model is well fitted without overfitting.
            </p>
          </div>

          <div style={{ padding: '1.2rem', background: 'var(--color-cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ color: 'var(--color-chocolate)', fontSize: '1rem', marginBottom: '0.4rem' }}>
              Q3: What do the MAE and RMSE error metrics signify?
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
              MAE (7.71 boxes) measures the average absolute error magnitude. RMSE (8.93 boxes) is slightly higher because it squares errors before averaging, penalizing larger deviations. Given the average sales volume of ~165 to ~340 boxes, an average error of under 8 boxes demonstrates strong operational precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
