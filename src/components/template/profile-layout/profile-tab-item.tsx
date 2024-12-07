import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export type ProfileTabItemProps = {
  label: string;
  to: string;
  active?: boolean;
};

const ProfileTabItem = ({ label, to, active = false }: ProfileTabItemProps) => {
  const { t } = useTranslation("profile");
  return (
    <Link
      to={to}
      className={cn(
        "border-l-primary-700 flex h-9 items-center border-l-2 pl-4 font-semibold transition-colors duration-200",
        active
          ? "text-primary-700 hover:border-l-primary hover:text-primary"
          : "border-l-transparent text-neutral-300 hover:border-l-neutral-400 hover:text-neutral-400"
      )}
    >
      <button>
        {t("tab", {
          context: label,
        })}
      </button>
    </Link>
  );
};

export default ProfileTabItem;
