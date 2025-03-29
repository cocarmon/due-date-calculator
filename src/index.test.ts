import { describe, it, expect } from 'vitest';
import {calculateDueDate} from './index';

describe('calculateDueDate', () => {
  it('returns same day if turnaround fits in remaining hours', () => {
    const input = '2025-03-31T13:00:00Z'; 
    const due = calculateDueDate(input, 2);
    expect(due?.toISOString()).toBe('2025-03-31T15:00:00.000Z');
  });

  it('pushes to next work day if not enough time left', () => {
    const input = '2025-03-31T13:00:00Z';
    const due = calculateDueDate(input, 5);
    expect(due?.toISOString()).toBe('2025-04-01T10:00:00.000Z');
  });

  it('handles weekend skip correctly', () => {
    const input = '2025-03-28T16:00:00Z'; 
    const due = calculateDueDate(input, 3); 
    expect(due?.toISOString()).toBe('2025-03-31T11:00:00.000Z');
  });

  it('handles multiple weekend skips correctly', () => {
    const input = '2025-03-31T09:01:00Z';
    const due = calculateDueDate(input, 168);
    expect(due?.toISOString()).toBe('2025-04-28T09:01:00.000Z');
  });
});
