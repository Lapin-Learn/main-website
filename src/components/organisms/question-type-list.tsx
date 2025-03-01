import { useLocation, useNavigate } from "@tanstack/react-router";
import { createElement } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardTitle, Separator } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuestionTypes } from "@/hooks/react-query/use-daily-lesson";
import { BAND_SCORES, MAPPED_SKILL_ICON, MAPPED_SKILL_ICON_FILLED } from "@/lib/consts";
import { EnumBandScore, EnumSkill } from "@/lib/enums";

import { AnimatedCircularProgressBar } from "../ui/animated-circular-progress-bar";
import QuestionTypeDetail from "./question-type-detail";
type QuestionTypeListPageProps = {
  skill: EnumSkill;
};

const QuestionTypeList = ({ skill }: QuestionTypeListPageProps) => {
  const { data: questionTypes, isSuccess, isLoading } = useGetQuestionTypes(skill);
  const { t } = useTranslation("dailyLesson");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleChooseLesson = (
    bandScore: EnumBandScore,
    skill: EnumSkill,
    questionTypeId: number
  ) => {
    navigate({
      to: pathname,
      search: {
        skill: skill,
        bandScore: bandScore,
        questionTypeId,
      },
    });
  };

  const sortedQuestionTypes = questionTypes?.sort((a, b) => a.id - b.id);

  return (
    <main className="h-fit w-full">
      {isLoading && <SkeletonQuestionTypeList />}
      {isSuccess && (
        <div className="flex w-full flex-col items-center gap-3 md:gap-5">
          {sortedQuestionTypes?.map((questionType) => {
            const xpRequired =
              questionType.bandScoreRequires.find(
                (bandScore) => bandScore.bandScore === questionType.progress.bandScore
              )?.requireXP ?? 0;

            return (
              <Card
                className="relative w-full rounded-2xl transition-all duration-300 hover:cursor-pointer hover:shadow-lg"
                key={questionType.id}
              >
                <CardContent
                  className="flex w-full grow flex-row items-center justify-center space-x-3 py-3 !pl-3 pr-3 md:space-x-5 md:!py-4 md:!pr-6"
                  onClick={() =>
                    handleChooseLesson(questionType.progress.bandScore, skill, questionType.id)
                  }
                >
                  {questionType.image && (
                    <div className="flex size-20 flex-row items-center overflow-hidden rounded-xl md:size-28 ">
                      <img
                        src={questionType.image.url}
                        alt={questionType.name}
                        className="h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex h-full grow flex-col items-start justify-between gap-4">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row flex-wrap items-center justify-start gap-1 lg:gap-3">
                        <CardTitle className="items-center !text-heading-5 font-semibold">
                          {createElement(MAPPED_SKILL_ICON_FILLED[questionType.skill], {
                            className: "md:hidden size-4 inline-block mr-2 fill-neutral-100",
                            fill: "#acacac",
                          })}
                          {questionType.name}
                        </CardTitle>
                        <span className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium capitalize text-blue-500">
                          {BAND_SCORES[questionType.progress.bandScore]}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-1 text-supporting-text max-md:text-sm md:gap-3">
                      <p className="text-nowrap">
                        {t("questionTypes.numberOfLessons", {
                          number: questionType.lessons,
                          context: questionType.lessons > 1 ? "plural" : "singular",
                        })}
                      </p>
                      <Separator orientation="vertical" className="h-4" />
                      <p className="text-nowrap">
                        {`${questionType.progress.totalLearningXP}/${xpRequired} ${t("questionTypes.xp")} ${t("questionTypes.toUpgradeYourBand")}`}
                      </p>
                    </div>
                  </div>
                  <AnimatedCircularProgressBar
                    value={questionType.progress.totalLearningXP}
                    max={xpRequired}
                    min={0}
                    className="size-16 max-md:hidden"
                    innerChild={createElement(MAPPED_SKILL_ICON[questionType.skill], {
                      className: "size-5 fill-neutral-200",
                    })}
                  />
                </CardContent>
              </Card>
            );
          })}

          <QuestionTypeDetail className="w-full" />
        </div>
      )}
    </main>
  );
};

const SkeletonQuestionTypeList = () => {
  return [1, 2, 3, 4].map((_, index) => (
    <Skeleton key={index} className="my-4 h-32 w-full rounded-2xl" />
  ));
};

export default QuestionTypeList;
