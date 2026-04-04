export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export const easeOutCubic = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)

export const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  if (inMax === inMin) return outMin
  const normalized = clamp01((value - inMin) / (inMax - inMin))
  return outMin + (outMax - outMin) * normalized
}
