import { StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const src = "https://github.com/shadcn.png";

const meta = {
  title: "Atoms/Avatar",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable avatar component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/avatar'>Documentation</a>",
      },
    },
  },
  component: Avatar,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {},
  render: () => (
    <Avatar>
      <AvatarImage src={src} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};
