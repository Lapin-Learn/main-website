import { MAPPED_CRITERIA_COLOR } from "@components/organisms/writing-submission/color.ts";
import { Typography } from "@components/ui";

import {
  MAPPED_WRITING_CRITERIA_SHORT_TITLES,
  MAPPED_WRITING_CRITERIA_TITLES,
} from "@/lib/consts.ts";
import type { STCriteriaEvaluation } from "@/lib/types";
import { cn } from "@/lib/utils";

type SubmissionContentAnsweredPopupProps = {
  title: string;
  criterias: string[];
  criteriasEvaluated: STCriteriaEvaluation["criterias"];
};

function SubmissionContentAnsweredPopup(props: SubmissionContentAnsweredPopupProps) {
  const { title, criterias, criteriasEvaluated } = props;

  const filteredCriterias = Object.entries(criteriasEvaluated).filter(([key]) =>
    criterias.includes(key)
  );

  return (
    <div className="flex flex-col gap-3 rounded-2xl px-2 py-4 text-justify text-black">
      <Typography className=" text-small font-semibold">{title}</Typography>

      {filteredCriterias.map(([key, value]) => {
        const { error, correction, explanation } = value.evaluate[0];
        return (
          <div
            className={cn(
              "flex flex-col gap-2 p-2 rounded-sm bg-opacity-15",
              MAPPED_CRITERIA_COLOR[key]
            )}
          >
            <div key={key} className="flex flex-col items-start justify-center gap-2">
              <Typography
                className={cn(
                  "font-normal text-xs px-1.5 py-1 text-black rounded-sm bg-opacity-50",
                  MAPPED_CRITERIA_COLOR[key]
                )}
              >
                {`${MAPPED_WRITING_CRITERIA_TITLES[key]} (${MAPPED_WRITING_CRITERIA_SHORT_TITLES[key]})`}
              </Typography>
              <Typography className="text-small font-semibold">{error}</Typography>
            </div>
            <Typography className="text-small">{correction}</Typography>
            <Typography className="text-small">{explanation}</Typography>
          </div>
        );
      })}
    </div>
  );
}

export default SubmissionContentAnsweredPopup;
