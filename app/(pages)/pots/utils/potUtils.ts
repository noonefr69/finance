export function calculatePercentage(current: number, target: number): number {
  if (target === 0) return 0;
  return (100 * current) / target;
}

export function formatCurrency(amount: number): string {
  return amount.toFixed(2);
}
