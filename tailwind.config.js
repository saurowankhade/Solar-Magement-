/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx}", // Include shadcn components
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      },
      fontFamily: {
        mono: ['Menlo', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },

      animation: {
        slide: 'slide 15s linear infinite',
        fadeInOut: "fadeInOut 1s 1",

      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' }, // Adjusted to avoid gap
        },
        fadeInOut: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
  }
},
plugins: [
  function ({ addUtilities }) {
    const newUtilities = {
      '.scrollbar-hide': {
        'scrollbar-width': 'none', /* For Firefox */
        '-ms-overflow-style': 'none', /* For Internet Explorer and Edge */
      },
      '.scrollbar-hide::-webkit-scrollbar': {
        display: 'none', /* For WebKit-based browsers (Chrome, Safari) */
      },
    };

    addUtilities(newUtilities);
  },
],
}

