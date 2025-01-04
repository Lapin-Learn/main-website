import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "../ui";
import AudioPlayer from "./audio-player";

const SpeakingEndTest = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("simulatedTest");
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="flex w-[800px] flex-col items-center gap-10 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <div className="flex flex-col items-center gap-3">
        <p className="text-center">{t("speaking.endTestMessage")}</p>
        <p className="text-center"> {t("speaking.endTestPlayBack")}</p>
      </div>
      <AudioPlayer className="w-full rounded-md border p-4 shadow-background" src={"audioSrc"} />
      <Button
        onClick={() =>
          navigate({
            to: "/practice",
          })
        }
      >
        {tCommon("home")}
      </Button>
    </div>
  );
};

export default SpeakingEndTest;
