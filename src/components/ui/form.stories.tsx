import { zodResolver } from "@hookform/resolvers/zod";
import { StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";

const meta = {
  title: "Atoms/Form",
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable form component from <b>Shadcn/ui</b>: <a target='_blank' href='https://ui.shadcn.com/docs/components/form'>Documentation</a>",
      },
    },
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {},
  render: () => {
    const FormSchema = z.object({
      email: z.string().email(),
      password: z.string().min(1, "Password is required"),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
      const errors = new Set<string>();
      if (!values.email.includes("@gmail.com")) {
        errors.add("email");
      }
      if (!values.password.includes("#")) {
        errors.add("password");
      }

      if (errors.size > 0) {
        return;
      }

      window.alert(JSON.stringify(values, null, 2));
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    error={Boolean(form.formState.errors.email)}
                    {...field}
                    type="email"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    error={Boolean(form.formState.errors.password)}
                    {...field}
                    type="password"
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" className="bg-primary">
            Submit
          </Button>{" "}
          &nbsp;
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </form>
      </Form>
    );
  },
};
