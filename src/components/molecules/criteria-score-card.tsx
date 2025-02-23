import { Info } from "lucide-react";
import { Trans } from "react-i18next";

import { Card, CardHeader, CardTitle } from "@/components/ui";
import { EnumSkill, EnumSpeakingCriteria, EnumWritingCriteria } from "@/lib/enums";

import TooltipWrapper from "./tooltip-wrapper";

type CriteriaScoreCardProps = {
  criteria: string;
  criteriaKey: EnumSpeakingCriteria | EnumWritingCriteria;
  score: number;
  skill: EnumSkill;
};

function CriteriaScoreCard({ criteria, criteriaKey, skill, score }: CriteriaScoreCardProps) {
  return (
    <Card className="border-none bg-[#F8F8F8] shadow-none">
      <CardHeader className="flex flex-col items-center justify-between gap-2 px-4 pb-2 pt-4 text-xl text-neutral-600">
        <CardTitle className="text-heading-3">{score}</CardTitle>
        <CardTitle className="max-w-60 text-center text-heading-6 leading-6">
          {criteria}
          <TooltipWrapper
            triggerNode={
              <span className="ml-1 inline-flex items-end">
                <Info className="size-4 cursor-pointer text-neutral-600" />
              </span>
            }
            contentNode={
              <Trans i18nKey={`tooltip:simulatedTest.${skill}.criteria.${criteriaKey}`} />
            }
            asChild
          />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default CriteriaScoreCard;
