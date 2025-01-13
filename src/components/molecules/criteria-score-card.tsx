import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type CriteriaScoreCardProps = {
  criteria: string;
  evaluate: string;
  score: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

function CriteriaScoreCard({ criteria, evaluate, Icon, score }: CriteriaScoreCardProps) {
  return (
    <Card className="border-blue-500 bg-blue-50 shadow-none">
      <CardHeader className="flex flex-row justify-between px-4 pb-2 pt-4 text-xl text-blue-500">
        <CardTitle className="inline-flex items-center">
          {Icon({
            className: "mr-2 inline-block size-5",
            fill: "#37AEFF",
          })}
          {criteria}
        </CardTitle>
        <CardTitle>{score}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 text-justify text-sm font-normal text-blue-900 xl:text-base">
        {evaluate}
      </CardContent>
    </Card>
  );
}

export default CriteriaScoreCard;
