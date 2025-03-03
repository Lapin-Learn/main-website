import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { EnumSkill } from "@/lib/enums";
import { STCriteriaEvaluation } from "@/lib/types";
import { calculateOverallBandScore, getCriterias } from "@/lib/utils";

import { Separator, Typography } from "../../ui";

type SummaryBandScoreProps = {
  paragraphs: string[];
  criterias?: STCriteriaEvaluation["criterias"];
};

function SummaryBandScore(props: SummaryBandScoreProps) {
  const { paragraphs, criterias } = props;
  const { t } = useTranslation("simulatedTest");
  if (!criterias) return null;
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-auto flex-row items-center justify-between gap-4 rounded-2xl bg-[#FBF1DD] p-5 text-orange-700">
        <div className="flex flex-1 flex-col gap-2">
          <Typography className="text-heading-6 font-semibold">
            {t("result.overallScore")}
          </Typography>
          <div className="flex flex-row items-center justify-start gap-2 text-xs">
            <Typography className="font-regular flex flex-row gap-1 text-xs">
              {paragraphs.length}
              <p className="capitalize text-neutral-600">{t("result.paragraphs")}</p>
            </Typography>
            <Separator className="bg-neutral-100" orientation="vertical" />
            <Typography className="font-regular flex flex-row gap-1 text-xs">
              {/* {sum of words of paragraphs */}
              {paragraphs.reduce((acc: number, cur: string) => acc + cur.split(" ").length, 0)}
              <p className="capitalize text-neutral-600">{t("result.words")}</p>
            </Typography>
          </div>
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
                    {getCriterias(EnumSkill.writing)[key]}
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
