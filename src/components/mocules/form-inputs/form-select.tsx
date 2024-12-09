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
  onValueChange?: (value: string) => void;
};

export default function FormSelect({
  name,
  label,
  className,
  inputClassName,
  placeholder,
  options = [],
  loading = false,
  onValueChange,
}: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleChange = (value: string) => {
          field.onChange(value);
          if (onValueChange) {
            onValueChange(value);
          }
        };

        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={handleChange}
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
