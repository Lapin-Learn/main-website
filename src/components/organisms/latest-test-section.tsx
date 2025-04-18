import { useNavigate } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { createElement } from "react";
import { useTranslation } from "react-i18next";

import {
  useGetLatestInprogressSTSession,
  useGetSTSessionDetail,
} from "@/hooks/react-query/use-simulated-test";
import { MAPPED_SKILL_ICON_FILLED } from "@/lib/consts";
import { cn } from "@/lib/utils";

import { Button } from "../ui";

export const LatestTestSection = ({
  collectionId,
  className,
}: {
  collectionId?: number;
  className?: string;
}) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetLatestInprogressSTSession(collectionId);
  const { data: sessionData } = useGetSTSessionDetail(data?.sessionId ?? 0, !!data?.sessionId);
  const { t } = useTranslation("practice");

  if (isLoading || !data || !sessionData) return null;

  return (
    <div
      className={cn(
        "hidden h-fit flex-col gap-3 rounded-lg bg-white p-2 md:flex md:gap-6 md:rounded-2xl md:p-3 lg:p-4 relative",
        className
      )}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          <h5 className="text-wrap text-heading-6 font-semibold md:text-heading-5">
            {data.testCollectionName}
          </h5>
          <p className="text-wrap text-xs font-semibold text-neutral-200 md:text-small">
            {data.testName}
          </p>
        </div>

        {createElement(MAPPED_SKILL_ICON_FILLED[data.skill], {
          fill: "#B4B4B4",
          height: 28,
          width: 28,
          style: {
            marginTop: 8,
            marginRight: 8,
          },
        })}
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
