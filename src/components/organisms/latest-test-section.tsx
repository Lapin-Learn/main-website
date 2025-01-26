import { useNavigate } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import ListeningIcon from "@/assets/icons/skills/listening-filled";
import ReadingIcon from "@/assets/icons/skills/reading-filled";
import SpeakingIcon from "@/assets/icons/skills/speaking-filled";
import WritingIcon from "@/assets/icons/skills/writing-filled";
import { useGetLatestInprogressSTSession } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";

import { Button } from "../ui";

export const LatestTestSection = ({ collectionId }: { collectionId?: number }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetLatestInprogressSTSession(collectionId);
  const { t } = useTranslation("practice");

  const skillIconMapping = {
    [EnumSkill.reading]: <ReadingIcon fill="#B4B4B4" />,
    [EnumSkill.listening]: <ListeningIcon fill="#B4B4B4" />,
    [EnumSkill.speaking]: <SpeakingIcon fill="#B4B4B4" />,
    [EnumSkill.writing]: <WritingIcon fill="#B4B4B4" />,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  // TODO: Get skillTestId from data
  const skillIdMapping = {
    [EnumSkill.reading]: 4,
    [EnumSkill.listening]: 1,
    [EnumSkill.speaking]: 2,
    [EnumSkill.writing]: 3,
  };

  return (
    <div className="flex h-fit min-w-72 flex-col gap-6 rounded-2xl bg-white p-6">
      <div className="flex flex-col gap-1">
        <p className="text-small font-semibold text-blue-400">{t("latest-test.continue")}</p>
        <h5 className="text-heading-5 font-semibold">{data.testCollectionName}</h5>
        <div className="flex items-center gap-1">
          {skillIconMapping[data.skill]}
          <p className="text-small font-semibold text-neutral-200">{data.testName}</p>
        </div>
      </div>
      {/* TODO: Get collectionId from data */}
      <Button
        className="w-full bg-blue-400 hover:bg-blue-500"
        onClick={() =>
          navigate({
            to: "/practice/simulated-test",
            search: {
              collectionId: 1,
              skillTestId: skillIdMapping[data.skill],
              sessionId: data.sessionId,
            },
          })
        }
      >
        <div className="flex items-center gap-2">
          {t("latest-test.continueDoing")}
          <ArrowRightIcon color="white" strokeWidth={3} className="size-4" />
        </div>
      </Button>
    </div>
  );
};
