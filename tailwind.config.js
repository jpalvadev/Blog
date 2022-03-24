module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Space Mono', 'monospace'],
        main: ['Athiti', 'sans-serif'],
        mainTwo: ['Pridi', 'serif'],
        mainThree: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#C5A1A0',
          200: '#E8817E',
          300: '#E34643',
          400: '#C5100E',
          500: '#AA0E0C',
          600: '#572B2C',
          700: '#a9adc1',
          800: '#c4c4c4',
        },
        background: {
          100: '#121212',
          200: '#181818',
          300: '#282828',
          // 300: '#2E3039',
          // 400: '#1F2028',
        },
        accent: {
          red: '#ff4545',
          blue: '#36a3ff',
          yellow: '#ffd644',
        },
      },
    },
    gridTemplateRows: {
      card: '5rem 2px 1fr',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
