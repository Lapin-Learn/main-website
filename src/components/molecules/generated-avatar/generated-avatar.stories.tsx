import type { Meta, StoryObj } from "@storybook/react";

import GeneratedAvatar, { GeneratedAvatarProps } from ".";

const meta = {
  component: GeneratedAvatar,
  title: "molecules/Generated Avatar",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable avatar component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/avatar'>Documentation</a>",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<GeneratedAvatarProps>;

export default meta;
type Story = StoryObj<GeneratedAvatarProps>;

export const Default: Story = {
  args: {
    name: "Taylor Swift",
  },
};
