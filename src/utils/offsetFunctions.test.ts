import { describe, it, expect } from 'vitest';
import calculateFinalDueDate from './offsetFunctions';

//  workday is Mon–Fri, 9am–5pm
describe('calculateFinalDueDate', () => {
  it('returns correct date with no weekend involved', () => {
    const base = new Date('2025-03-31T17:00:00Z');
    const hours = 4; 
    const due = calculateFinalDueDate(base, hours);
    expect(due.toISOString()).toBe('2025-04-01T13:00:00.000Z'); 
  });

  it('skips over the weekend', () => {
    const base = new Date('2025-03-28T17:00:00Z');
    const due = calculateFinalDueDate(base, 8); 
    expect(due.toISOString()).toBe('2025-03-31T09:00:00.000Z'); 
  });

});
