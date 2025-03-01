import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { EnumSkill } from "@/lib/enums";
import type { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";
import { cn, getCriterias } from "@/lib/utils";

import { Typography } from "../../ui";

type SubmissionContentAnsweredProps = {
  answer: string | null;
  evaluationResult?: STCriteriaEvaluation;
  skill?: EnumSkill;
};
export const CRITERIAS_COLOR = {
  1: ["bg-[#E0BF6B]", "bg-[#E06B6D]", "bg-[#A36BE0]", "bg-[#6BD0E0]"],
  0.5: ["bg-[#E0BF6B50]", "bg-[#E06B6D50]", "bg-[#A36BE050]", "bg-[#6BD0E050]"],
  0.1: ["bg-[#E0BF6B10]", "bg-[#E06B6D10]", "bg-[#A36BE010]", "bg-[#6BD0E010]"],
};

function SubmissionContentAnswered(props: SubmissionContentAnsweredProps) {
  const { answer, evaluationResult, skill } = props;
  const { t } = useTranslation("simulatedTest");
  const [highlightedAnswer, setHighlightedAnswer] = useState<JSX.Element | null>(null);

  const MAPPED_CRITERIAS = Object.entries(getCriterias(skill ?? EnumSkill.writing)).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        title: value,
        color: CRITERIAS_COLOR["0.5"][Object.keys(acc).length % CRITERIAS_COLOR["0.5"].length],
      };
      return acc;
    },
    {} as Record<string, { title: string; color: string }>
  );

  useEffect(() => {
    if (evaluationResult && evaluationResult.criterias) {
      const criteriasEvaluated = evaluationResult.criterias;
      const highlights: Record<string, string[]> = {};

      Object.entries(criteriasEvaluated).forEach(([key, value]) => {
        value.evaluate.forEach((item) => {
          item.highlight.forEach((highlight) => {
            if (!highlights[highlight]) {
              highlights[highlight] = [];
            }
            highlights[highlight].push(key);
          });
        });
      });

      const highlightedElements = extractParagraphs(answer ?? "").map((p, paragraphIndex) => {
        const regex = new RegExp(
          `(${Object.keys(highlights)
            .sort((a, b) => b.length - a.length)
            .join("|")})`,
          "gi"
        );

        const splitContent = p.split(regex).map((text, index) => {
          return {
            type: highlights[text] || null,
            text,
            key: `paragraph-${paragraphIndex}-${index}`,
          };
        });

        return (
          <Typography key={`paragraph-${paragraphIndex}`}>
            {splitContent.map(({ type, text, key }) =>
              type ? (
                <TooltipWrapper
                  key={`tooltip-${key}`}
                  triggerNode={type.reduce(
                    (acc, curr) => {
                      return (
                        <span key={key} className={`${MAPPED_CRITERIAS[curr].color}`}>
                          {acc}
                        </span>
                      );
                    },
                    <>{text}</>
                  )}
                  contentNode={
                    <SubmissionContentAnsweredPopup
                      title={text}
                      criterias={type}
                      criteriasEvaluated={criteriasEvaluated as STCriteriaEvaluation["criterias"]}
                    />
                  }
                  className="w-full max-w-screen-sm rounded-2xl  bg-white"
                  asChild
                />
              ) : (
                <span key={key}>{text}</span>
              )
            )}
          </Typography>
        );
      });

      setHighlightedAnswer(<div>{highlightedElements}</div>);
    }
  }, [evaluationResult]);

  const extractParagraphs = (htmlString: string): string[] => {
    return [...new DOMParser().parseFromString(htmlString, "text/html").querySelectorAll("p")].map(
      (p) => p.textContent?.trim() || ""
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Typography className="font-bold capitalize text-neutral-500">
        {t("result.yourAnswer")}
      </Typography>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-4">
          {evaluationResult &&
            Object.entries(MAPPED_CRITERIAS).map(([key, value]) => (
              <div key={key} className="flex flex-row items-center justify-center gap-4">
                <div className={cn("shrink-0 w-6 h-6 rounded-sm", value.color)} />
                <Typography className="text-small font-medium">
                  {MAPPED_CRITERIAS[key].title}
                </Typography>
              </div>
            ))}
        </div>
        <Typography className="text-wrap rounded-lg bg-neutral-50 p-4 text-small font-normal text-neutral-500">
          {t("result.hoverFeedback")}
        </Typography>
      </div>

      {answer ? (
        <div>
          {highlightedAnswer ? (
            <div className="text-justify">{highlightedAnswer}</div>
          ) : (
            <div className="text-justify">{answer}</div>
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

type SubmissionContentAnsweredPopupProps = {
  title: string;
  criterias: string[];
  criteriasEvaluated: STCriteriaEvaluation["criterias"];
};

function SubmissionContentAnsweredPopup(props: SubmissionContentAnsweredPopupProps) {
  const { title, criterias, criteriasEvaluated } = props;

  const filteredCriterias = Object.entries(criteriasEvaluated).filter(([key, value]) =>
    criterias.includes(key)
  );

  const MAPPED_CRITERIAS = Object.entries(getCriterias(EnumSkill.writing)).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        title: value,
        color: CRITERIAS_COLOR["0.5"][Object.keys(acc).length % CRITERIAS_COLOR["0.5"].length],
        backgroundColor:
          CRITERIAS_COLOR["0.1"][Object.keys(acc).length % CRITERIAS_COLOR["0.1"].length],
      };
      return acc;
    },
    {} as Record<string, { title: string; color: string; backgroundColor: string }>
  );

  return (
    <div className="flex flex-col gap-3 rounded-2xl p-4 text-justify text-black">
      <Typography className=" text-small font-semibold">{title}</Typography>

      {filteredCriterias.map(([key, value]) => {
        const { error, correction, explanation } = value.evaluate[0];
        return (
          <div
            className={cn(
              "flex flex-col gap-2 p-2 rounded-sm",
              MAPPED_CRITERIAS[key].backgroundColor
            )}
          >
            <div key={key} className="flex flex-col items-start justify-center gap-2">
              <Typography
                className={cn(
                  "font-normal text-xs px-1.5 py-1 text-black rounded-sm",
                  MAPPED_CRITERIAS[key].color
                )}
              >
                {getCriterias(EnumSkill.writing)[key]}
              </Typography>
              <Typography className="text-small font-semibold">{error}</Typography>
            </div>
            <Typography className="text-normal text-small">{correction}</Typography>
            <Typography className="text-normal text-small">{explanation}</Typography>
          </div>
        );
      })}
    </div>
  );
}

export default SubmissionContentAnswered;
