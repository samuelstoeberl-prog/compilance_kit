/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1814',
        'ink-light': '#2D2A24',
        'ink-border': '#3D3A34',
        sand: '#C5B99A',
        'sand-light': '#F4F2EE',
        'sand-mid': '#EDEAE4',
        'sand-border': '#D8D4CC',
        muted: '#9E9A93',
        'muted-dark': '#6B6760',
        teal: '#5DCAA5',
        'teal-light': '#E1F5EE',
        'teal-dark': '#085041',
        amber: '#EF9F27',
        'amber-light': '#FAEEDA',
        'amber-dark': '#633806',
        danger: '#E24B4A',
        'danger-light': '#FCEBEB',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        serif: ['"DM Serif Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
