import React, { useState } from 'react';
import InputField from './InputField';
import ToggleField from './ToggleField';
import Button from './Button';
import {
  Tag,
  Megaphone,
  Users,
  ShoppingBag,
  CloudSun,
  Sparkles,
  RotateCcw,
  Video,
  PlayCircle,
  Share2,
  Calendar,
  PartyPopper
} from 'lucide-react';

export const DEFAULT_FORM_VALUES = {
  Temperature: 28.5,
  Price: 120,
  Discount_Percentage: 10,
  Marketing_Budget: 2500,
  Instagram_Reel: true,
  YouTube_Video: false,
  Facebook_Ads: true,
  Returning_Customers: 85,
  New_Customers: 45,
  Online_Orders: 35,
  Offline_Orders: 80,
  Customer_Rating: 4.5,
  Festival: false,
  Weekend: false,
};

export default function PredictionForm({ onSubmit, isPredicting }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!formData.Price || Number(formData.Price) <= 0) {
      errs.Price = 'Price must be greater than ₹0';
    } else if (Number(formData.Price) > 1000) {
      errs.Price = 'Price cannot exceed ₹1,000';
    }

    if (formData.Discount_Percentage === '' || Number(formData.Discount_Percentage) < 0 || Number(formData.Discount_Percentage) > 100) {
      errs.Discount_Percentage = 'Discount must be between 0% and 100%';
    }

    if (formData.Marketing_Budget === '' || Number(formData.Marketing_Budget) < 0) {
      errs.Marketing_Budget = 'Budget cannot be negative';
    }

    if (formData.Customer_Rating === '' || Number(formData.Customer_Rating) < 1.0 || Number(formData.Customer_Rating) > 5.0) {
      errs.Customer_Rating = 'Rating must be between 1.0 and 5.0';
    }

    if (formData.Temperature === '' || Number(formData.Temperature) < -10 || Number(formData.Temperature) > 60) {
      errs.Temperature = 'Enter a realistic temperature (-10°C to 60°C)';
    }

    if (formData.Returning_Customers === '' || Number(formData.Returning_Customers) < 0) {
      errs.Returning_Customers = 'Count cannot be negative';
    }

    if (formData.New_Customers === '' || Number(formData.New_Customers) < 0) {
      errs.New_Customers = 'Count cannot be negative';
    }

    if (formData.Online_Orders === '' || Number(formData.Online_Orders) < 0) {
      errs.Online_Orders = 'Orders cannot be negative';
    }

    if (formData.Offline_Orders === '' || Number(formData.Offline_Orders) < 0) {
      errs.Offline_Orders = 'Orders cannot be negative';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_FORM_VALUES);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid-layout">
        {/* Section 1: Product & Pricing */}
        <div className="form-section-card">
          <div className="section-header">
            <Tag size={20} className="section-icon" />
            <h3>Product & Pricing</h3>
          </div>
          <InputField
            label="Base Price per Box"
            name="Price"
            prefix="₹"
            value={formData.Price}
            onChange={handleChange}
            hint="Typically ₹100 - ₹140"
            error={errors.Price}
            required
          />
          <InputField
            label="Promotional Discount"
            name="Discount_Percentage"
            suffix="%"
            value={formData.Discount_Percentage}
            onChange={handleChange}
            hint="Range: 0% to 100%"
            error={errors.Discount_Percentage}
            required
          />
        </div>

        {/* Section 2: Marketing Campaigns */}
        <div className="form-section-card">
          <div className="section-header">
            <Megaphone size={20} className="section-icon" />
            <h3>Marketing & Promotions</h3>
          </div>
          <InputField
            label="Marketing Budget"
            name="Marketing_Budget"
            prefix="₹"
            value={formData.Marketing_Budget}
            onChange={handleChange}
            hint="Daily campaign expenditure"
            error={errors.Marketing_Budget}
            required
          />
          <div style={{ marginTop: '0.8rem' }}>
            <ToggleField
              label="Instagram Reel Campaign"
              description="Active viral short video promotion"
              name="Instagram_Reel"
              checked={formData.Instagram_Reel}
              onChange={handleChange}
              icon={Video}
            />
            <ToggleField
              label="YouTube Video Feature"
              description="Influencer food vlogger review active"
              name="YouTube_Video"
              checked={formData.YouTube_Video}
              onChange={handleChange}
              icon={PlayCircle}
            />
            <ToggleField
              label="Facebook & Meta Ads"
              description="Targeted geo-fenced local ads running"
              name="Facebook_Ads"
              checked={formData.Facebook_Ads}
              onChange={handleChange}
              icon={Share2}
            />
          </div>
        </div>

        {/* Section 3: Customer Information */}
        <div className="form-section-card">
          <div className="section-header">
            <Users size={20} className="section-icon" />
            <h3>Customer Demographics</h3>
          </div>
          <InputField
            label="Returning Customers"
            name="Returning_Customers"
            value={formData.Returning_Customers}
            onChange={handleChange}
            hint="Loyal regular visitors"
            error={errors.Returning_Customers}
            required
          />
          <InputField
            label="New Customers"
            name="New_Customers"
            value={formData.New_Customers}
            onChange={handleChange}
            hint="First-time walk-in or discovery"
            error={errors.New_Customers}
            required
          />
          <InputField
            label="Average Customer Rating"
            name="Customer_Rating"
            suffix="★"
            step="0.1"
            value={formData.Customer_Rating}
            onChange={handleChange}
            hint="Score out of 5.0"
            error={errors.Customer_Rating}
            required
          />
        </div>

        {/* Section 4: Order Distribution */}
        <div className="form-section-card">
          <div className="section-header">
            <ShoppingBag size={20} className="section-icon" />
            <h3>Order Channels</h3>
          </div>
          <InputField
            label="Online Delivery Orders"
            name="Online_Orders"
            value={formData.Online_Orders}
            onChange={handleChange}
            hint="Swiggy, Zomato, Direct Web"
            error={errors.Online_Orders}
            required
          />
          <InputField
            label="Offline Counter Orders"
            name="Offline_Orders"
            value={formData.Offline_Orders}
            onChange={handleChange}
            hint="In-store kiosk & dine-in orders"
            error={errors.Offline_Orders}
            required
          />
        </div>

        {/* Section 5: Environmental & Calendar Factors */}
        <div className="form-section-card" style={{ gridColumn: '1 / -1' }}>
          <div className="section-header">
            <CloudSun size={20} className="section-icon" />
            <h3>Environment & Occasion</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <InputField
              label="Ambient Temperature"
              name="Temperature"
              suffix="°C"
              step="0.1"
              value={formData.Temperature}
              onChange={handleChange}
              hint="Current or forecasted weather"
              error={errors.Temperature}
              required
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', justifyContent: 'center' }}>
              <ToggleField
                label="Festival / Celebration Day"
                description="Diwali, Eid, Rakhi, or New Year surge"
                name="Festival"
                checked={formData.Festival}
                onChange={handleChange}
                icon={PartyPopper}
              />
              <ToggleField
                label="Weekend / Holiday"
                description="Saturday or Sunday peak demand period"
                name="Weekend"
                checked={formData.Weekend}
                onChange={handleChange}
                icon={Calendar}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Submission Bar */}
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '1rem',
          padding: '1.25rem 1.6rem',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
          disabled={isPredicting}
        >
          <RotateCcw size={16} />
          <span>Reset Defaults</span>
        </button>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          loading={isPredicting}
          icon={Sparkles}
        >
          Predict Sales
        </Button>
      </div>
    </form>
  );
}
