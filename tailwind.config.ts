import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: 'var(--sage)',
          pal: 'var(--sage-pal)',
          dark: 'var(--sage-dark)',
        },
        blush: {
          DEFAULT: 'var(--blush)',
          2: 'var(--blush2)',
          pal: 'var(--blush-pal)',
        },
        ink: 'var(--ink)',
        surface: 'var(--bg)',
        card: 'var(--card)',
        cardSubtle: 'var(--card-subtle)',
        border: 'var(--border)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        cardHover: 'var(--shadow-hover)',
        insetPill: 'var(--shadow-inset)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'pulse-subtle': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
