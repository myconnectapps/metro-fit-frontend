import { describe, it, expect } from 'vitest';
import {
  isPositiveNumber,
  validateWellnessForm,
  getFieldValidity,
} from './wellnessProfile.utils';

describe('isPositiveNumber', () => {
  it('returns true for a positive integer string', () => {
    expect(isPositiveNumber('10000')).toBe(true);
  });

  it('returns true for a positive decimal', () => {
    expect(isPositiveNumber(70.5)).toBe(true);
  });

  it('returns false for zero', () => {
    expect(isPositiveNumber(0)).toBe(false);
    expect(isPositiveNumber('0')).toBe(false);
  });

  it('returns false for negative', () => {
    expect(isPositiveNumber(-5)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isPositiveNumber('')).toBe(false);
  });

  it('returns false for non-numeric string', () => {
    expect(isPositiveNumber('abc')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isPositiveNumber(null)).toBe(false);
  });
});

describe('validateWellnessForm', () => {
  const valid = {
    currentWeight: '80',
    targetWeight:  '70',
    stepTarget:    '10000',
    activeMinutes: '30',
  };

  it('returns isValid=true for all valid inputs', () => {
    expect(validateWellnessForm(valid).isValid).toBe(true);
    expect(validateWellnessForm(valid).fieldErrors).toEqual({});
  });

  it('flags invalid currentWeight', () => {
    const result = validateWellnessForm({ ...valid, currentWeight: '-5' });
    expect(result.isValid).toBe(false);
    expect(result.fieldErrors.currentWeight).toBeDefined();
  });

  it('flags all four invalid fields', () => {
    const result = validateWellnessForm({
      currentWeight: '',
      targetWeight: '0',
      stepTarget: 'abc',
      activeMinutes: '-1',
    });
    expect(result.isValid).toBe(false);
    expect(Object.keys(result.fieldErrors)).toHaveLength(4);
  });
});

describe('getFieldValidity', () => {
  it('returns all true for valid form', () => {
    const validity = getFieldValidity({
      currentWeight: '80',
      targetWeight: '70',
      stepTarget: '10000',
      activeMinutes: '30',
    });
    expect(Object.values(validity).every(Boolean)).toBe(true);
  });

  it('returns false only for invalid field', () => {
    const validity = getFieldValidity({
      currentWeight: '80',
      targetWeight: '',
      stepTarget: '10000',
      activeMinutes: '30',
    });
    expect(validity.targetWeight).toBe(false);
    expect(validity.currentWeight).toBe(true);
  });
});
