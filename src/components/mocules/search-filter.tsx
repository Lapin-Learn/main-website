import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export type SearchFilterType = "newest" | "oldest";
export type SearchFilterProps = {
  value: string;
  onChange: (...event: unknown[]) => void;
};

const SearchFilter = ({ value, onChange }: SearchFilterProps) => {
  const { t } = useTranslation("practice");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {t(`filter.${value}`)}
          <ChevronDown className="ml-2 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem value="newest">{t("filter.newest")}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">{t("filter.oldest")}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchFilter;
