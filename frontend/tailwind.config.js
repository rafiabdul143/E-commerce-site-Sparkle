/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class', // 👈 Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
  colors: {
    'matte-black': '#1a1a1a',
  },
  keyframes: {
    pop3d: {
      '0%': {
        transform: 'scale(0.8) rotateX(20deg)',
        opacity: '0',
      },
      '60%': {
        transform: 'scale(1.1) rotateX(0deg)',
        opacity: '1',
      },
      '100%': {
        transform: 'scale(1)',
        opacity: '1',
      },
    },
  },
  animation: {
    pop3d: 'pop3d 0.6s ease-out forwards',
  },
  dropShadow: {
    'pop-red': '2px 4px 6px rgba(222, 0, 0, 0.5)', // 👈 Add this
  },
},

  },
  plugins: [],
}
