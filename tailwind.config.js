/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Space Mono"', 'monospace'],
        'space-mono': ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

