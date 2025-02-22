import { useNavigate } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { createElement } from "react";
import { useTranslation } from "react-i18next";

import {
  useGetLatestInprogressSTSession,
  useGetSTSessionDetail,
} from "@/hooks/react-query/use-simulated-test";
import { MAPPED_SKILL_ICON_FILLED } from "@/lib/consts";

import { Button } from "../ui";

export const LatestTestSection = ({ collectionId }: { collectionId?: number }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetLatestInprogressSTSession(collectionId);
  const { data: sessionData } = useGetSTSessionDetail(data?.sessionId ?? 0, !!data?.sessionId);
  const { t } = useTranslation("practice");

  if (isLoading || !data || !sessionData) return null;

  return (
    <div className="hidden h-fit min-w-72 flex-col gap-6 rounded-2xl bg-white p-6 md:flex">
      <div className="flex flex-col gap-1">
        <p className="text-small font-semibold text-blue-400">{t("latest-test.continue")}</p>
        <h5 className="text-heading-5 font-semibold">{data.testCollectionName}</h5>
        <div className="flex items-center gap-1">
          {createElement(MAPPED_SKILL_ICON_FILLED[data.skill], {
            fill: "#B4B4B4",
          })}
          <p className="text-small font-semibold text-neutral-200">{data.testName}</p>
        </div>
      </div>
      <Button
        className="w-full"
        variant="blue"
        size="xl"
        onClick={() =>
          navigate({
            to: "/practice/simulated-test",
            search: {
              skillTestId: sessionData?.skillTest.id,
              sessionId: sessionData?.id,
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
