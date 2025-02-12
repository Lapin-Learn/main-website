import { BookOpenText } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { BAND_SCORES } from "@/lib/consts";

type BandScoreSelectProps = {
  value: keyof typeof BAND_SCORES;
  setValue: (value: keyof typeof BAND_SCORES) => void;
};

const BandScoreSelect = ({ value, setValue }: BandScoreSelectProps) => {
  return (
    <Select
      defaultValue={value}
      //   value={{
      //     label: BAND_SCORES[value as keyof typeof BAND_SCORES],
      //     value,
      //   }}
      onValueChange={(value) => setValue(value as keyof typeof BAND_SCORES)}
    >
      <SelectTrigger className="size-fit border-0 shadow-none" isArrow={false}>
        <BookOpenText size={24} className="text-neutral-300" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(BAND_SCORES).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BandScoreSelect;
