/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../django-example/templates/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

