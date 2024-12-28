/** @type {import('prettier').Config} */
export default {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-organize-imports"],
  organizeImportsSkipDestructiveCodeActions: true,
  // tailwindcss
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
};
