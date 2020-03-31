module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: 'hsl(234, 100%, 70%)',
          default: 'hsl(234, 100%, 60%)',
          darker: 'hsl(234, 100%, 40%)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
