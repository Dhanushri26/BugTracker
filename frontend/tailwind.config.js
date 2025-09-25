/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        accent: colors.emerald,
        neutral: colors.slate,
        info: colors.sky,
        warning: colors.amber,
        danger: colors.rose,
        success: colors.green,
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
      boxShadow: {
        'elevated': '0 10px 20px rgba(2, 6, 23, 0.06), 0 4px 8px rgba(2, 6, 23, 0.04)',
      },
      borderRadius: {
        xl: '0.9rem',
      },
    },
  },
  plugins: [],
};
