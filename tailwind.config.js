/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005bff',
        secondary: '#63af8a',
        dark: '#272A39',
      },
      borderRadius: {
        none: '0',
        DEFAULT: '8px',
        10: '10px',
        12: '12px',
      },
      screens: {
        360: '360px',
        400: '400px',
        420: '420px',
        450: '450px',
        480: '480px',
        500: '500px',
        520: '520px',
        575: '575px',
        640: '640px',
        768: '768px',
        1000: '1000px',
        1024: '1024px',
        1250: '1250px',
        1300: '1300px',
        1400: '1400px',
        1450: '1450px',
      },
    },
  },
  plugins: [],
};
