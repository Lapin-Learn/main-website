import { Meta, StoryObj } from "@storybook/react";

import Icons from "@/assets/icons";

const meta = {
  title: "Icons",
  component: Icons.Practice,
  parameters: {
    layout: "centered",
  },
  args: {
    fill: "#000000",
    height: 48,
    width: 48,
  },
  argTypes: {
    fill: { control: "color" },
  },
} satisfies Meta<typeof Icons.Practice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Practice: Story = {};
