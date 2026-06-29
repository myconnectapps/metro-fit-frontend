import React, { useState, useCallback } from 'react';
import './WellnessProfileForm.css';
import { validateWellnessForm, getFieldValidity } from './wellnessProfile.utils';
import { saveWellnessProfile } from './wellnessProfileService';

/** Initial empty state for the form */
const INITIAL_FORM = {
  currentWeight: '',
  targetWeight:  '',
  stepTarget:    '',
  activeMinutes: '',
};

/**
 * Field configuration — drives rendering, no hard-coded JSX per field.
 */
const FIELDS = [
  {
    key:         'currentWeight',
    label:       'Current Weight',
    placeholder: 'e.g. 80',
    unit:        'kg',
    inputMode:   'decimal',
    step:        '0.1',
    ariaLabel:   'Current weight in kilograms',
  },
  {
    key:         'targetWeight',
    label:       'Target Weight',
    placeholder: 'e.g. 70',
    unit:        'kg',
    inputMode:   'decimal',
    step:        '0.1',
    ariaLabel:   'Target weight in kilograms',
  },
  {
    key:         'stepTarget',
    label:       'Daily Step Target',
    placeholder: 'e.g. 10000',
    unit:        'steps',
    inputMode:   'numeric',
    step:        '1',
    ariaLabel:   'Daily step target',
  },
  {
    key:         'activeMinutes',
    label:       'Active Minutes Target',
    placeholder: 'e.g. 30',
    unit:        'min/day',
    inputMode:   'numeric',
    step:        '1',
    ariaLabel:   'Active minutes per day target',
  },
];

/**
 * WellnessProfileForm
 *
 * Controlled form with real-time per-field validation.
 * Shows emerald checkmarks when each field is valid.
 * Save button activates only when all four fields pass.
 */
function WellnessProfileForm() {
  const [form, setForm]         = useState(INITIAL_FORM);
  const [touched, setTouched]   = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast]       = useState({ show: false, message: '' });
  const [serverError, setServerError] = useState('');

  // Derived state — computed on every render (pure, no effects needed)
  const validity   = getFieldValidity(form);
  const { isValid, fieldErrors } = validateWellnessForm(form);

  /** Show inline errors only after the user has touched a field */
  const errorFor = (key) =>
    touched[key] && !validity[key] ? fieldErrors[key] : '';

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setServerError('');
  }, []);

  const handleBlur = useCallback((e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields touched to reveal any remaining errors
    setTouched({ currentWeight: true, targetWeight: true, stepTarget: true, activeMinutes: true });

    if (!isValid) return;

    setSubmitting(true);
    setServerError('');

    try {
      const result = await saveWellnessProfile(form);

      if (result.success) {
        showToast('Wellness profile saved successfully!');
        setForm(INITIAL_FORM);
        setTouched({});
      } else {
        const firstError = result.errors
          ? Object.values(result.errors)[0]
          : result.message || 'Could not save profile. Please try again.';
        setServerError(firstError);
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        className="form-card"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Wellness Profile Configuration Form"
      >
        <div className="form-grid">
          {FIELDS.map(({ key, label, placeholder, unit, inputMode, step, ariaLabel }) => {
            const isFieldValid = validity[key];
            const error        = errorFor(key);

            return (
              <div className="field-group" key={key}>
                <label
                  className="field-label"
                  htmlFor={`field-${key}`}
                >
                  {label}
                  {unit && (
                    <span
                      style={{ color: 'var(--color-placeholder)', marginLeft: '0.35rem', textTransform: 'none', fontWeight: 400 }}
                    >
                      ({unit})
                    </span>
                  )}
                </label>

                <div className="input-wrapper">
                  <input
                    id={`field-${key}`}
                    name={key}
                    type="number"
                    inputMode={inputMode}
                    step={step}
                    min="0.01"
                    value={form[key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                    aria-invalid={!!error}
                    aria-describedby={error ? `error-${key}` : undefined}
                    className={[
                      'field-input',
                      isFieldValid ? 'is-valid' : '',
                      error        ? 'is-error' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />

                  {/* Emerald checkmark — visible when field is valid */}
                  <span
                    className={`field-check${isFieldValid ? ' visible' : ''}`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                </div>

                <span
                  id={`error-${key}`}
                  className="field-error"
                  role="alert"
                >
                  {error}
                </span>
              </div>
            );
          })}
        </div>

        {serverError && (
          <p
            style={{
              marginTop: 'var(--space-5)',
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)',
            }}
            role="alert"
          >
            {serverError}
          </p>
        )}

        <div className="form-actions">
          <button
            id="btn-save-wellness-profile"
            type="submit"
            className={`btn-save${submitting ? ' loading' : ''}`}
            disabled={!isValid || submitting}
            aria-busy={submitting}
            aria-label="Save Wellness Profile"
          >
            {submitting ? '' : 'Save Wellness Profile'}
          </button>
        </div>
      </form>

      {/* Success toast */}
      <div
        className={`toast${toast.show ? ' show' : ''}`}
        role="status"
        aria-live="polite"
        aria-label={toast.message}
      >
        <span className="toast-icon" aria-hidden="true">✅</span>
        {toast.message}
      </div>
    </>
  );
}

export default WellnessProfileForm;
