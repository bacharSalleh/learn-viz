export interface ThemeTokens {
  bg: string;
  bgRaised: string;
  bgCard: string;
  border: string;
  text: string;
  textDim: string;
  accent: string;
  accent2: string;
  positive: string;
  warning: string;
  negative: string;
}

// Get computed theme token value
export function getToken(name: string, el?: Element): string {
  const target = el || document.documentElement;
  return getComputedStyle(target).getPropertyValue(`--lv-${name}`).trim();
}

// Set theme on element
export function setTheme(el: HTMLElement, theme: 'dark' | 'light'): void {
  el.setAttribute('data-theme', theme);
}
