/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        autocare: {
          dark: '#091426',
          primary: '#1e293b',
          indigo: '#4f46e5',
          indigoLight: '#6366f1',
          bg: '#f8fafc',
          card: '#ffffff',
          preventative: '#0d9488',
          predictive: '#f59e0b',
          corrective: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
