import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export type ProfileTabItemProps = {
  label: string;
  to: string;
  active?: boolean;
};

const ProfileTabItem = ({ label, to, active = false }: ProfileTabItemProps) => {
  const { t } = useTranslation("common");
  return (
    <Link
      to={to}
      className={cn(
        "flex h-9 items-center border-l-2 border-l-primary-700 pl-4 font-medium transition-colors duration-200",
        active
          ? "text-primary-700 hover:border-l-primary hover:text-primary"
          : "border-l-transparent text-supporting-text hover:border-l-neutral-400 hover:text-neutral-400"
      )}
    >
      <button>{t(`navigation.${label}`)}</button>
    </Link>
  );
};

export default ProfileTabItem;
