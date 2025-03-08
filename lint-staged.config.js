export default {
  "**/*.{ts,tsx}": (stagedFiles) => [
    `eslint . --fix --ignore-pattern dist-ssr/`,
    `prettier --write ${stagedFiles.join(" ")}`,
  ],
};
