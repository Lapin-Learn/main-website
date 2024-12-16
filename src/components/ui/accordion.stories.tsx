import { StoryObj } from "@storybook/react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta = {
  title: "Atoms/Accordion",
  parameters: {
    docs: {
      description: {
        component:
          "A customizable accordion component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/accordion'>Documentation</a>",
      },
    },
  },
  component: Accordion,
  args: {
    type: "single",
    collapsible: true,
  },
  argTypes: {
    type: {
      options: ["single", "multiple"],
      control: { type: "radio" },
    },
    collapsible: {
      control: { type: "boolean" },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {},
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
