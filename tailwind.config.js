/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          dark: '#0A1931',
          deep: '#1A3D63',
          blue: '#4A7FA7',
          light: '#B3CFE5',
          ice: '#F6FAFD',
        },
        inacap: {
          red: '#4A7FA7',
          'red-hover': '#1A3D63',
          'red-dark': '#0A1931',
          'red-light': '#F6FAFD',
          'red-subtle': '#B3CFE5',
          black: '#0A1931',
          dark: '#1A3D63',
        },
        brand: {
          bg: '#F6FAFD',
          primary: '#0A1931',
          'primary-dark': '#050D1A',
          'primary-light': '#1A3D63',
          red: '#4A7FA7',
          'red-hover': '#1A3D63',
          'red-light': '#F6FAFD',
          blue: '#4A7FA7',
          'blue-hover': '#1A3D63',
          'blue-light': '#B3CFE5',
          cyan: '#4A7FA7',
          'cyan-hover': '#1A3D63',
          'cyan-light': '#B3CFE5',
          surface: '#FFFFFF',
          border: '#B3CFE5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(10, 25, 49, 0.05), 0 1px 2px -1px rgba(10, 25, 49, 0.04)',
        'card': '0 1px 3px 0 rgba(10, 25, 49, 0.06)',
        'glow-red': '0 4px 14px 0 rgba(74, 127, 167, 0.25)',
        'glow-cyan': '0 4px 14px 0 rgba(179, 207, 229, 0.35)',
        'glow-blue': '0 4px 14px 0 rgba(74, 127, 167, 0.3)',
        'card-hover': '0 8px 20px -4px rgba(10, 25, 49, 0.12)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.04)', opacity: '0.95' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
