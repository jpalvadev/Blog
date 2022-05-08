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
        mainFour: ['Work Sans', 'sans-serif'],
        arcade: ['Press Start 2P', 'cursive'],
      },
      colors: {
        primary: {
          100: '#C5A1A0',
          200: '#E8817E',
          250: '#F44B4B',
          // 350: '#4FDA50',
          350: '#2cee71',
          // 350: '#C8F0A9',

          // 250: '#3498db',
          // 250: '#1abc9c',
          // 250: '#ff4554',
          // 250: '#ff4554',
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
          400: '#989898',
          500: '#212529',
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
