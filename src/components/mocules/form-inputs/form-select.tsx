import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FormSelectProps = {
  name: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  loading?: boolean;
};

export default function FormSelect({
  name,
  label,
  className,
  inputClassName,
  placeholder,
  options = [],
  loading = false,
}: FormSelectProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              disabled={loading}
            >
              <FormControl>
                <SelectTrigger className={inputClassName}>
                  <SelectValue placeholder={placeholder} className="placeholder:bg-neutral-300" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
