/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        military: {
          900: '#0a0e17',
          800: '#111827',
          700: '#1f2937',
          600: '#374151',
          500: '#4b5563',
          accent: '#c2410c',
          green: '#065f46',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(194, 65, 12, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(194, 65, 12, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
