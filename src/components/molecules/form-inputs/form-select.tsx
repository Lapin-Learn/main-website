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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Option = {
  value: string;
  label: string;
};

export type FormSelectProps<T extends Option> = {
  name: string;
  label?: string;
  options: T[];
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  loading?: boolean;
  isMulti?: boolean;
  onValueChange?: (value: string) => void;
  renderSelectItem?: (option: T) => React.ReactNode;
};

export default function FormSelect<T extends Option>({
  name,
  label,
  className,
  placeholder,
  options = [],
  loading = false,
  isMulti = false,
  onValueChange,
  renderSelectItem,
}: FormSelectProps<T>) {
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
            {isMulti ? (
              <FormControl>
                <MultiSelect
                  options={options}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder={placeholder}
                  variant="default"
                  animation={2}
                  maxCount={4}
                  disabled={loading}
                  hasBadge={true}
                  {...(renderSelectItem ? { renderSelectItem } : {})}
                />
              </FormControl>
            ) : (
              <Select
                onValueChange={handleChange}
                defaultValue={field.value}
                value={field.value}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {renderSelectItem ? renderSelectItem(option) : option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <FormDescription />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
