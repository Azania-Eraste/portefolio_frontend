/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'geek-black': '#0a0a0a',       // Fond
        'geek-gray': '#1a1a1a',        // Panneaux
        
        // RETOUR AU VERT
        'geek-green': '#00ff41',       // Vert Matrix vif
        'geek-dim-green': '#008F11',   // Vert sombre (bordures)
      },
      fontFamily: {
        'mono': ['"Courier New"', 'Courier', 'monospace'],
      }
    },
  },
  plugins: [],
}