import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#E8EEF4',
        graphite: {
          950: '#0C1016',
          900: '#161C26',
          800: '#1E2833',
          700: '#2A3644',
        },
        chalk: {
          DEFAULT: '#7BA3C9',
          soft: '#A8C4DE',
        },
        passport: '#3D9B6E',
        brick: '#C4503E',
        amber: '#D9A441',
        steel: '#8A97A8',
        brand: '#A8C4DE',
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
