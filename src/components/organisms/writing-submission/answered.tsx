import { MAPPED_CRITERIA_COLOR } from "@components/organisms/writing-submission/color.ts";
import SubmissionContentAnsweredPopup from "@components/organisms/writing-submission/SubmissionContentAnsweredPopup.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import {
  MAPPED_WRITING_CRITERIA_SHORT_TITLES,
  MAPPED_WRITING_CRITERIA_TITLES,
} from "@/lib/consts.ts";
import { EnumSkill, EnumWritingCriteria } from "@/lib/enums";
import type { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

import { Typography } from "../../ui";

type SubmissionContentAnsweredProps = {
  paragraphs: string[];
  evaluationResult?: STCriteriaEvaluation;
  skill?: EnumSkill;
};

function SubmissionContentAnswered(props: SubmissionContentAnsweredProps) {
  const { paragraphs, evaluationResult } = props;
  const { t } = useTranslation("simulatedTest");
  const [highlightedAnswer, setHighlightedAnswer] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (evaluationResult && evaluationResult.criterias) {
      const criteriasEvaluated = evaluationResult.criterias;
      const highlights: Record<string, string[]> = {};

      Object.entries(criteriasEvaluated).forEach(([key, value]) => {
        if (typeof value.evaluate !== "string")
          value.evaluate.forEach((item) => {
            item.highlight.forEach((highlight) => {
              if (!highlights[highlight]) {
                highlights[highlight] = [];
              }
              highlights[highlight].push(key);
            });
          });
      });

      const highlightedElements = createHighlightedElements(
        paragraphs,
        highlights,
        criteriasEvaluated
      );

      setHighlightedAnswer(<div>{highlightedElements}</div>);
    }
  }, [evaluationResult]);

  return (
    <div className="flex-0 col-span-2 flex flex-col gap-5">
      <Typography variant="h6" className="font-semibold capitalize ">
        {t("result.yourAnswer")}
      </Typography>
      {evaluationResult && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row flex-wrap gap-x-6 gap-y-3">
            {Object.values(EnumWritingCriteria).map((value) => (
              <div key={value} className="flex flex-row items-center justify-center gap-2">
                <div
                  className={cn(
                    "shrink-0 w-6 h-6 rounded-sm bg-opacity-50",
                    MAPPED_CRITERIA_COLOR[value]
                  )}
                />
                <Typography variant="body2">{`${MAPPED_WRITING_CRITERIA_TITLES[value]} (${MAPPED_WRITING_CRITERIA_SHORT_TITLES[value]})`}</Typography>
              </div>
            ))}
          </div>
          <Typography
            variant="body2"
            className="text-wrap rounded-lg bg-neutral-50 p-4 text-neutral-500"
          >
            {t("result.hoverFeedback")}
          </Typography>
        </div>
      )}

      {paragraphs ? (
        <div>
          {highlightedAnswer ? (
            <div className="text-justify">{highlightedAnswer}</div>
          ) : (
            <div className="text-justify">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Typography className="text-justify text-supporting-text">
          {t("result.noAnswer")}
        </Typography>
      )}
    </div>
  );
}

const createHighlightedElements = (
  paragraphs: string[],
  highlights: Record<string, string[]>,
  criteriasEvaluated: STCriteriaEvaluation["criterias"]
) => {
  const regex = new RegExp(
    `(${Object.keys(highlights)
      .sort((a, b) => b.length - a.length)
      .join("|")})`,
    "gi"
  );

  return paragraphs.map((paragraph, paragraphIndex) => {
    const splitContent = paragraph.split(regex).map((text, index) => ({
      type: highlights[text] || null,
      text,
      key: `p-${paragraphIndex}-${index}`,
    }));

    return (
      <Typography key={`paragraph-${paragraphIndex}`} className="mb-2">
        {splitContent.map(({ type, text, key }) =>
          type ? (
            <TooltipWrapper
              key={`tooltip-${key}`}
              triggerNode={type.reduce(
                (acc, curr) => (
                  <span
                    key={key}
                    className={`${MAPPED_CRITERIA_COLOR[curr]} bg-opacity-50 hover:cursor-pointer hover:bg-opacity-30`}
                  >
                    {acc}
                  </span>
                ),
                <>{text}</>
              )}
              contentNode={
                <SubmissionContentAnsweredPopup
                  title={text}
                  criterias={type}
                  criteriasEvaluated={criteriasEvaluated as STCriteriaEvaluation["criterias"]}
                />
              }
              className="w-full max-w-screen-sm rounded-2xl bg-white shadow-lg"
              asChild
            />
          ) : (
            <span key={key}>{text}</span>
          )
        )}
      </Typography>
    );
  });
};

export default SubmissionContentAnswered;
