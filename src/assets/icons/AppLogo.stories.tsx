import { Meta, StoryObj } from "@storybook/react";

import AppLogo from "./AppLogo";

const meta = {
  title: "Logo/App Logo",
  component: AppLogo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AppLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
