import { describe, it, expect } from 'vitest';
import { validateInput } from './validationFunctions';

describe('validateInput', () => {
  it('throws if not a work day (Saturday)', () => {
    const input = '2025-03-29T10:00:00Z'; 
    expect(() => validateInput(input, 4)).toThrow('Not a valid work day.');
  });

  it('throws if not during work hours (7AM UTC)', () => {
    const input = '2025-03-31T07:00:00Z'; 
    expect(() => validateInput(input, 4)).toThrow('Not a valid work time.');
  });

  it('throws if turnaround is negative', () => {
    const input = '2025-03-31T10:00:00Z';
    expect(() => validateInput(input, -1)).toThrow('Turnaround expects a positive number');
  });

  it('throws all errors if multiple validation checks fail', () => {
    const input = '2025-03-30T07:00:00Z';
    expect(() => validateInput(input, -5)).toThrow(
      /Not a valid work day\.\nNot a valid work time\.\nTurnaround expects a positive number/
    );
  });

  it('passes for valid input (Monday 10am, turnaround 4)', () => {
    const input = '2025-03-31T10:00:00Z';
    const result = validateInput(input, 4);
    expect(result.toISOString()).toBe(new Date(input).toISOString());
  });
});
