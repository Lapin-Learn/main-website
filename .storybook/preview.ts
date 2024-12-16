import "@/styles/globals.css";
import { fn } from "@storybook/test";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: {
      handles: {
        onClick: fn(),
        onSubmit: fn(),
        // Add other event handlers as needed
      },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
