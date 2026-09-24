import React, { useState } from 'react';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('analyst@chocopaan.ai');
  const [password, setPassword] = useState('demopass123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ email, role: 'Lead ML Analyst' });
    }, 450);
  };

  const handleDemoLogin = () => {
    setEmail('analyst@chocopaan.ai');
    setPassword('demopass123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ email: 'analyst@chocopaan.ai', role: 'Lead ML Analyst' });
    }, 300);
  };

  return (
    <div className="login-page-container">
      {/* Left Banner: Gourmet Chocolate Paan Food + AI Visual */}
      <div className="login-left-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div className="logo-badge">🍫</div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--color-cream)' }}>
              ChocoPaan AI
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', color: 'var(--color-cream)', marginBottom: '0.8rem', lineHeight: 1.15 }}>
            AI-Based Chocolate Paan <br />
            <span style={{ color: 'var(--color-accent)' }}>Sales Prediction System</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'rgba(255,248,240,0.85)', fontWeight: 500 }}>
            "Predict Sales. Understand Customers. Grow Smarter."
          </p>
        </div>

        {/* Hero image preview */}
        <div className="hero-image-wrapper">
          <img
            src="/chocolate_paan_hero.jpg"
            alt="Artisanal Chocolate Paan Gourmet Presentation"
          />
          <div className="hero-badge-overlay">
            <Sparkles size={16} color="var(--color-accent)" />
            <span>AI Multi-Factor Demand Forecasting • Week 4 Model</span>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'rgba(255,248,240,0.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="var(--color-accent)" />
              <span>Trained on 10,000 Real-World Simulated Sales Transactions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="var(--color-accent)" />
              <span>High R² Explanatory Power (94.5% Variance Explained)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="var(--color-accent)" />
              <span>BTech Machine Learning Project • Viva Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login Form Card */}
      <div className="login-right-form">
        <div className="login-card fade-in">
          <div className="login-card-header">
            <h2>Welcome Back</h2>
            <p>Sign in to access your sales prediction dashboard and model analytics.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label" htmlFor="email">Email Address</label>
              <div className="input-control-wrap">
                <span className="input-prefix"><Mail size={16} /></span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@chocopaan.ai"
                  className="text-input has-prefix"
                />
              </div>
            </div>

            <div className="field-group" style={{ marginTop: '1rem' }}>
              <label className="field-label" htmlFor="password">Password</label>
              <div className="input-control-wrap">
                <span className="input-prefix"><Lock size={16} /></span>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="text-input has-prefix"
                />
              </div>
            </div>

            <div className="remember-row">
              <label className="remember-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--color-accent)', width: '16px', height: '16px' }}
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                className="forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Demo Mode: Click "Demo Quick Access" below to sign in instantly.');
                }}
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              style={{ width: '100%' }}
              icon={ArrowRight}
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Demo Login Shortcut for Viva Evaluators */}
          <div className="demo-account-box">
            <p>Exam / Viva Demonstration Mode:</p>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: '0.85rem', padding: '0.55rem' }}
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              <ShieldCheck size={16} color="var(--color-accent)" />
              <span>Login as Demo Analyst</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
