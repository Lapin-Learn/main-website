import { StoryObj } from "@storybook/react";
import { Bold } from "lucide-react";

import { Toggle } from "./toggle";

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable toggle component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/toggle'>Documentation</a>",
      },
    },
  },
  args: {
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: {
      options: ["default", "outline"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "default", "lg"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {},
  render: ({ ...props }) => (
    <Toggle aria-label="Toggle bold" {...props}>
      <Bold className="size-4" />
    </Toggle>
  ),
};
