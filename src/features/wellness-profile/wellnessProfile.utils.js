/**
 * Pure validation utilities for wellness profile form.
 * No side effects — input in, result out.
 */

/**
 * Returns true if the value is a finite positive number.
 * @param {string|number} value
 * @returns {boolean}
 */
export function isPositiveNumber(value) {
  if (value === '' || value === null || value === undefined) return false;
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
}

/**
 * Validates the four wellness form fields.
 * @param {{ currentWeight: string, targetWeight: string, stepTarget: string, activeMinutes: string }} formData
 * @returns {{ isValid: boolean, fieldErrors: Record<string, string> }}
 */
export function validateWellnessForm(formData) {
  const fieldErrors = {};

  if (!isPositiveNumber(formData.currentWeight)) {
    fieldErrors.currentWeight = 'Enter a positive number (e.g. 75)';
  }
  if (!isPositiveNumber(formData.targetWeight)) {
    fieldErrors.targetWeight = 'Enter a positive number (e.g. 65)';
  }
  if (!isPositiveNumber(formData.stepTarget)) {
    fieldErrors.stepTarget = 'Enter a positive integer (e.g. 10000)';
  }
  if (!isPositiveNumber(formData.activeMinutes)) {
    fieldErrors.activeMinutes = 'Enter a positive integer (e.g. 30)';
  }

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
}

/**
 * Returns per-field validity map (used for checkmark display).
 * @param {{ currentWeight: string, targetWeight: string, stepTarget: string, activeMinutes: string }} formData
 * @returns {Record<string, boolean>}
 */
export function getFieldValidity(formData) {
  return {
    currentWeight: isPositiveNumber(formData.currentWeight),
    targetWeight:  isPositiveNumber(formData.targetWeight),
    stepTarget:    isPositiveNumber(formData.stepTarget),
    activeMinutes: isPositiveNumber(formData.activeMinutes),
  };
}
