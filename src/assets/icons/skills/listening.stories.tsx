import { Meta, StoryObj } from "@storybook/react";

import Icons from "@/assets/icons";

const meta = {
  title: "Icons",
  component: Icons.Listening,
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
} satisfies Meta<typeof Icons.Listening>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Listening: Story = {};
