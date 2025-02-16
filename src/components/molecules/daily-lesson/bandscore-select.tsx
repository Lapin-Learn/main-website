import { useNavigate } from "@tanstack/react-router";
import { BookOpenText } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { BAND_SCORES } from "@/lib/consts";
import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson";

const BandScoreSelect = () => {
  const search = Route.useSearch();
  const { bandScore } = search;
  const navigate = useNavigate();

  const handleChangeBandScore = (value: string) => {
    navigate({
      to: "",
      search: {
        ...search,
        bandScore: value,
      },
    });
  };
  return (
    <Select
      defaultValue={bandScore}
      value={bandScore}
      onValueChange={(value) => handleChangeBandScore(value)}
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
