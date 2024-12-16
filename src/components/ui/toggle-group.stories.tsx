import { StoryObj } from "@storybook/react";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
  title: "Atoms/Toggle Group",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable toggle group component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/toggle-group'>Documentation</a>",
      },
    },
  },
  args: {
    type: "multiple",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    type: {
      options: ["single", "multiple"],
      control: { type: "radio" },
    },
    variant: {
      options: ["default", "outline"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "default", "lg"],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  args: {
    type: "multiple",
    variant: "default",
    size: "default",
    disabled: false,
  },
  render: ({ ...props }) => (
    <ToggleGroup {...props}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
