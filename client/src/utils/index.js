export function getSafePercent(percent: number) {
  return Math.min(100, Math.max(percent, 0));
}

export function getStepPosition(steps: number, stepIndex: number, hasStepZero: boolean) {
  if (hasStepZero) {
    return (100 / (steps - 1)) * stepIndex;
  }
  return (100 / steps) * (stepIndex + 1);
}
