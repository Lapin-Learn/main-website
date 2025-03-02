import { ScrollText } from "lucide-react";
import { useTranslation } from "react-i18next";

import useGlobalMissionDialog from "@/hooks/zustand/use-global-mission-dialog";

const MissionButton = () => {
  const { setOpenDialog } = useGlobalMissionDialog();
  const { t } = useTranslation();

  return (
    <li className="mt-2 md:hidden">
      <button
        className="flex h-fit min-h-10 items-center gap-2.5 rounded-lg p-3 text-supporting-text transition-all duration-300"
        onClick={() => setOpenDialog()}
      >
        <div className="mx-2 h-full w-6 items-center justify-center">
          <ScrollText size={20} />
        </div>
        <span className="flex flex-1 select-none items-center text-nowrap font-medium duration-300">
          {t("navigation.mission")}
        </span>
      </button>
    </li>
  );
};

export default MissionButton;
