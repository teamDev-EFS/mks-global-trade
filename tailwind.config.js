module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)'
        },
        primary: 'var(--primary)',
        accent: 'var(--accent)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    }
  },
  plugins: []
};