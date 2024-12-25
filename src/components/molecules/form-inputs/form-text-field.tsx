import { useFormContext } from "react-hook-form";

import { Input, InputProps } from "@/components/ui";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export type FormTextFieldProps = {
  name: string;
  label?: string;
  className?: string;
  inputProps: InputProps;
};

export default function FormTextField({ name, label, className, inputProps }: FormTextFieldProps) {
  const { control, formState } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              error={Boolean(formState.errors.email)}
              {...field}
              onChange={field.onChange}
              {...inputProps}
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
