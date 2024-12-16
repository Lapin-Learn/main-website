import { Meta, StoryObj } from "@storybook/react";

import Icons from "@/assets/icons";

const meta = {
  title: "Icons",
  component: Icons.AllSkillsFilled,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    height: 48,
    width: 48,
  },
} satisfies Meta<typeof Icons.AllSkillsFilled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSkillsFilled: Story = {};
