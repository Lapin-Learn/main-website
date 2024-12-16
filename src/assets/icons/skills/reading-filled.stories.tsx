import { Meta, StoryObj } from "@storybook/react";

import Icons from "@/assets/icons";

const meta = {
  title: "Icons",
  component: Icons.ReadingFilled,
  parameters: {
    layout: "centered",
  },
  args: {
    height: 48,
    width: 48,
  },
} satisfies Meta<typeof Icons.ReadingFilled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadingFilled: Story = {};
