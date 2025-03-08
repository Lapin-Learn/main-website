import TooltipWrapper from "@components/molecules/tooltip-wrapper.tsx";
import { Info } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import { EnumSkill } from "@/lib/enums.ts";
import { STCriteriaEvaluation } from "@/lib/types";
import { calculateOverallBandScore, getCriterias } from "@/lib/utils";

import { Separator, Typography } from "../ui";

type SummaryBandScoreProps = {
  description?: React.ReactNode;
  criterias?: STCriteriaEvaluation["criterias"];
  skill?: EnumSkill;
};

function SummaryBandScore(props: SummaryBandScoreProps) {
  const { criterias, description, skill = EnumSkill.writing } = props;
  const { t } = useTranslation("simulatedTest");

  if (!criterias) return null;
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-auto flex-row items-center justify-between gap-4 rounded-2xl bg-[#FBF1DD] p-5 text-orange-700">
        <div className="flex flex-1 flex-col gap-2">
          <Typography className="text-heading-6 font-semibold">
            {t("result.overallScore")}
          </Typography>
          {description}
        </div>

        <div className="flex flex-col items-center">
          <Typography className="text-heading-4 font-bold">
            {calculateOverallBandScore(Object.values(criterias).map((item) => item.score))}
          </Typography>
          <Typography className="text-xs font-semibold">(+/- 0.5)</Typography>
        </div>
      </div>

      {Object.entries(criterias).map(([key, criteria], index) => (
        <div key={index} className="flex flex-1 flex-row">
          <div className="flex flex-1 flex-col items-center justify-center py-4 text-neutral-600">
            <Typography className="text-heading-4 font-bold">
              {criteria.score.toFixed(1)}
            </Typography>
            <div className="flex flex-row items-center gap-1">
              <Typography variant="h6" className="text-body font-semibold">
                {key}
              </Typography>
              <TooltipWrapper
                triggerNode={<Info size={12} />}
                contentNode={
                  <Typography className="text-center text-small font-semibold">
                    {getCriterias(skill)[key]}
                  </Typography>
                }
              />
            </div>
          </div>
          {index < Object.entries(criterias).length - 1 && (
            <Separator className="w-0.5" orientation="vertical" />
          )}
        </div>
      ))}
    </div>
  );
}

export default SummaryBandScore;
