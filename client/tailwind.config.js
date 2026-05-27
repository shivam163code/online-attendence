/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07111f',
        panel: '#0f1b2d',
        panel2: '#132238',
        line: '#22334d',
        accent: '#22c55e',
        accent2: '#38bdf8'
      },
      boxShadow: {
        soft: '0 20px 40px rgba(0, 0, 0, 0.18)'
      },
      backgroundImage: {
        'hero-grid': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
