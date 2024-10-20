module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
            primary: '#d61f04',
            secondary: '#fa8600',
            secondary_light: '#fbae55',
            accent: '#156FE0',
            accent_light: '#58a3eb',
            dark: '#000f19',
            light: "#fcfcfa",

          },
          fontFamily: {
            sans: ['Poppins','Helvetica', 'Arial', 'sans-serif'],
            serif: ['Cinzel','Georgia', 'serif'],
            mono: ['"Source Code Pro"'],
            luxury: ['Tangerine', 'cursive'],
          },
          spacing: {
            large: '32rem',
            extraLarge: '36rem',
          },
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),

    ],
  };
  