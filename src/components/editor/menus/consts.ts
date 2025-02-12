export const TIPPY_OPTIONS = {
  popperOptions: {
    placement: "top-start" as const,
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          boundary: "viewport",
          padding: 8,
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["bottom-start", "top-end", "bottom-end"],
        },
      },
    ],
  },
  maxWidth: "calc(100vw - 16px)",
};
