/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text_primary: "var(--text-primary)",
        text_secondary: "var(--text-secondary)",
        accent: "var(--accent)",
        accent_opacity: "var(--accent-opacity)",
        bg_color: "var(--bg-color)",
        elevation_one: "var(--elevation-one)",
        elevation_two: "var(--elevation-two)",
        elevation_three: "var(--elevation-three)",
        elevation_four: "var(--elevation-four)",
        elevation_five: "var(--elevation-five)",
        elevation_six: "var(--elevation-six)",
      },
      fontSize: {
        clamp416: "clamp(4rem, 10vw, 6.25rem",
        clamp121: "clamp(1.4rem, 2.4vw, 1.5rem)",
      },
      width: {
        wclamp344: "clamp(340px, 40vw, 425px)",
      },
      height: {
        hclamp344: "clamp(300px, 40vw, 400px)",
      },
      fontFamily: {
        jetbrains: "JetBrains_Mono",
        spacegrotesk: "Space_Grotesk",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
