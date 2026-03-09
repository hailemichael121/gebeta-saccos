export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))
