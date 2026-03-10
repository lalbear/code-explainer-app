/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#a78bfa', // Violet-400
          DEFAULT: '#7c3aed', // Violet-600
          dark: '#5b21b6', // Violet-800
          accent: '#06b6d4', // Cyan-500
        },
        surface: {
          light: '#f8fafc',
          dark: '#030712', // Very dark slate
          muted: '#111827',
        }
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 0.5, filter: 'blur(20px)' },
          '50%': { opacity: 0.8, filter: 'blur(40px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'premium-bg': 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'premium': '0 0 50px -12px rgba(124, 58, 237, 0.3)',
        'glass': 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glass-active': 'inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
        'glow': '0 0 50px -12px rgba(124, 58, 237, 0.5)',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
