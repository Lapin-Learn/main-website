import { Meta, StoryObj } from "@storybook/react";

import Icons from "@/assets/icons";

const meta = {
  title: "Icons",
  component: Icons.WritingFilled,
  parameters: {
    layout: "centered",
  },
  args: {
    height: 48,
    width: 48,
  },
} satisfies Meta<typeof Icons.WritingFilled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WritingFilled: Story = {};
