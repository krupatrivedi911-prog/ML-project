import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function InputField({
  label,
  id,
  name,
  value,
  onChange,
  type = 'number',
  step = 'any',
  placeholder = '',
  prefix = '',
  suffix = '',
  hint = '',
  error = '',
  required = false,
  min,
  max,
}) {
  return (
    <div className="field-group">
      <label htmlFor={id || name} className="field-label">
        <span>
          {label} {required && <span style={{ color: '#D32F2F' }}>*</span>}
        </span>
        {hint && <span className="field-hint">{hint}</span>}
      </label>

      <div className="input-control-wrap">
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          id={id || name}
          name={name}
          type={type}
          step={step}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`text-input ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''} ${
            error ? 'is-error' : ''
          }`}
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>

      {error && (
        <span className="field-error-msg">
          <AlertCircle size={13} />
          <span>{error}</span>
        </span>
      )}
    </div>
  );
}
