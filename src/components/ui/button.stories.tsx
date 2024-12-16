import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from "./button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable button component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/button'>Documentation</a>",
      },
    },
  },
  tags: ["autodocs"],
  args: { children: "Button", asChild: false },
  argTypes: {
    asChild: {
      control: { type: "boolean" },
    },
    variant: {
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "default", "lg"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link button",
  },
};
