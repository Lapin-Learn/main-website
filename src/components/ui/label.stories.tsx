import { StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable label component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/label'>Documentation</a>",
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {},
  render: () => (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  ),
};
