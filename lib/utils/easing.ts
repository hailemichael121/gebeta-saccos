export const clamp01 = (value: number): number => Math.max(0, Math.min(1, value))

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
