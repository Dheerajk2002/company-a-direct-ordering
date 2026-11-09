import { describe, it, expect } from 'vitest';

function calculatePrepTime(basePrep: number, activeOrdersCount: number, minFloor: number, managerOverride: number | null) {
  const aiEstimate = basePrep + activeOrdersCount * 3;
  const effectiveFloor = Math.max(minFloor, managerOverride ?? 0);
  return Math.max(aiEstimate, effectiveFloor);
}

describe('AI Prep-Time Engine with Safety Guardrails', () => {
  it('calculates baseline prep time correctly when kitchen load is low', () => {
    const time = calculatePrepTime(20, 1, 25, null);
    expect(time).toBe(25); // Baseline + load (23), but minFloor is 25
  });

  it('respects manager override guardrail over AI estimation', () => {
    const time = calculatePrepTime(20, 1, 25, 40);
    expect(time).toBe(40); // Manager override of 40 mins takes precedence
  });

  it('scales up dynamically under heavy kitchen load', () => {
    const time = calculatePrepTime(25, 8, 25, null);
    expect(time).toBe(49); // 25 + (8 * 3) = 49 mins
  });
});