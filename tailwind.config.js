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
        accent: 'var(--accent)',
        msk: {
          deep: '#0F3D2E',
          emerald: '#1E7F5C',
          gold: '#F59E0B',
          ivory: '#FAF7F2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    }
  },
  plugins: []
};