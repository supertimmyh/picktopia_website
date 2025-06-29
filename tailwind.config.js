/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'picktopia-blue-dark': '#082946',
        'picktopia-blue-mid': '#1C275F',
        'picktopia-orange': '#e0672b',
      },
      fontFamily: {
        'heading': ['Orbitron', 'monospace'], // Futuristic headers
        'body': ['Ubuntu', 'monospace'], // Tech body text
        'brand': ['Orbitron', 'monospace'], // Sci-fi brand elements
        sans: ['Orbitron', 'monospace'], // Default fallback
      },
    },
  },
  plugins: [],
}