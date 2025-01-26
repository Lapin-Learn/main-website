import React from "react";
import { Trans } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { EnumSkill, EnumSpeakingCriteria, EnumWritingCriteria } from "@/lib/enums";

import TooltipWrapper from "./tooltip-wrapper";

type CriteriaScoreCardProps = {
  criteria: string;
  criteriaKey: EnumSpeakingCriteria | EnumWritingCriteria;
  evaluate: string;
  score: number;
  skill: EnumSkill;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

function CriteriaScoreCard({
  criteria,
  criteriaKey,
  evaluate,
  skill,
  Icon,
  score,
}: CriteriaScoreCardProps) {
  return (
    <Card className="border-blue-500 bg-blue-50 shadow-none">
      <CardHeader className="flex flex-row justify-between px-4 pb-2 pt-4 text-xl text-blue-500">
        <TooltipWrapper
          triggerNode={
            <CardTitle className="inline-flex cursor-pointer items-center">
              {Icon({
                className: "mr-2 inline-block size-5",
                fill: "#37AEFF",
              })}
              {criteria}
            </CardTitle>
          }
          contentNode={<Trans i18nKey={`tooltip:simulatedTest.${skill}.criteria.${criteriaKey}`} />}
          asChild
        />
        <CardTitle>{score}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 text-justify text-sm font-normal text-blue-900 xl:text-base">
        {evaluate}
      </CardContent>
    </Card>
  );
}

export default CriteriaScoreCard;
