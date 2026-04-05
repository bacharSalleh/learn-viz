// Linear interpolation
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Clamp value to range
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

// Color scale: 0=green -> 0.5=yellow -> 1=red
export function colorScale(t: number): string {
  t = clamp(t, 0, 1);
  const r = t < 0.5 ? Math.round(lerp(0, 255, t * 2)) : 255;
  const g = t < 0.5 ? Math.round(lerp(200, 230, t * 2)) : Math.round(lerp(230, 50, (t - 0.5) * 2));
  const b = t < 0.5 ? Math.round(lerp(83, 60, t * 2)) : Math.round(lerp(60, 80, (t - 0.5) * 2));
  return `rgb(${r},${g},${b})`;
}

// Similarity color: 1=green, 0=yellow, -1=red
export function simColorScale(val: number): string {
  return colorScale((1 - val) / 2);
}

// Format number with appropriate precision
export function formatNum(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  if (Math.abs(n) >= 100) return n.toFixed(0);
  if (Math.abs(n) >= 1) return n.toFixed(1);
  return n.toFixed(2);
}

// Generate unique ID
let _id = 0;
export function uid(prefix = 'lv'): string {
  return `${prefix}-${++_id}`;
}
