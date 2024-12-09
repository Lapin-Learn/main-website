import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";

export type FormSelectProps = {
  name: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
  loading?: boolean;
};

export default function FormMultipleSelect({
  name,
  label,
  className,
  options = [],
  loading = false,
}: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelect
              options={options}
              onValueChange={field.onChange}
              defaultValue={field.value}
              placeholder="Chọn phần bài muốn làm"
              variant="inverted"
              animation={2}
              maxCount={3}
              disabled={loading}
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
