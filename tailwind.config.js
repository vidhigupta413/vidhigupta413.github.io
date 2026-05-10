/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Caveat"', '"Comic Sans MS"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        cafe: {
          ink: '#0b0710',
          wood: '#3a2418',
          'wood-dark': '#1f120b',
          'wood-light': '#5b3a26',
          'wood-rich': '#704626',
          amber: '#ffb56a',
          ember: '#ff8a3c',
          cream: '#f6e3c5',
          leaf: '#5a7d3a',
          'leaf-dark': '#36502a',
          'neon-purple': '#b475ff',
          'neon-pink': '#ff7be0',
          'neon-glow': '#d6b4ff',
        },
      },
      boxShadow: {
        'glow-purple':
          '0 0 24px rgba(180,117,255,0.45), 0 0 48px rgba(180,117,255,0.25)',
        'glow-soft': '0 0 32px rgba(214,180,255,0.35)',
      },
      backgroundImage: {
        'glass-radial':
          'radial-gradient(circle at 30% 20%, rgba(180,117,255,0.18), transparent 60%), radial-gradient(circle at 80% 90%, rgba(255,123,224,0.14), transparent 55%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
