import { Meta, StoryObj } from "@storybook/react";

import GoogleLogo from "./GoogleLogo";

const meta = {
  title: "Logo/Google Logo",
  component: GoogleLogo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GoogleLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
