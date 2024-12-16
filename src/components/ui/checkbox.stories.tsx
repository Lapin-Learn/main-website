import { StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable checkbox component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/checkbox'>Documentation</a>",
      },
    },
  },
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { disabled: false },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" disabled={args.disabled} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms2" disabled={args.disabled} />
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};
