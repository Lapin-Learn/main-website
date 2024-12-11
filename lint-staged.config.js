export default {
  "**/*.{ts,tsx}": (stagedFiles) => [`eslint . --fix`, `prettier --write ${stagedFiles.join(" ")}`],
};
