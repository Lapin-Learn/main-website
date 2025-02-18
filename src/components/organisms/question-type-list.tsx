import { useLocation, useNavigate } from "@tanstack/react-router";
import { createElement } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardTitle } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuestionTypes } from "@/hooks/react-query/use-daily-lesson";
import { BAND_SCORES } from "@/lib/consts";
import { EnumBandScore, EnumSkill } from "@/lib/enums";

import { MAPPED_SKILL_ICON_FILLED } from "../../lib/consts";
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
  return (
    <main className="h-fit w-full">
      {isLoading && <SkeletonQuestionTypeList />}
      {isSuccess && (
        <div className="flex w-full flex-col items-center gap-5">
          {questionTypes?.map((questionType) => {
            const xpRequired =
              questionType.bandScoreRequires.find(
                (bandScore) => bandScore.bandScore === questionType.progress.bandScore
              )?.requireXP ?? 0;

            return (
              <Card className="relative w-full transition-all duration-300 hover:cursor-pointer hover:shadow-lg lg:p-2">
                <CardContent
                  className="flex w-full grow flex-row items-center justify-center space-x-5 p-3"
                  onClick={() =>
                    handleChooseLesson(questionType.progress.bandScore, skill, questionType.id)
                  }
                >
                  {questionType.image && (
                    <div className="flex size-20 flex-row items-center overflow-hidden rounded-full md:size-28 ">
                      <img
                        src={questionType.image.url}
                        alt={questionType.name}
                        className="h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex h-full grow flex-col items-start justify-between gap-4">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center justify-start gap-1 lg:gap-3">
                        <CardTitle className="inline-flex items-center gap-2 !text-heading-5 font-semibold">
                          {createElement(MAPPED_SKILL_ICON_FILLED[questionType.skill], {
                            className: "size-4 inline-block fill-neutral-100",
                            fill: "#acacac",
                          })}
                          {questionType.name}
                        </CardTitle>
                        <span className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium capitalize text-blue-500">
                          {BAND_SCORES[questionType.progress.bandScore]}
                        </span>
                      </div>
                      <div className="clip-custom absolute right-0 bg-[#FCE3B4] p-2 pl-7 pr-3.5">
                        <span className="text-nowrap text-sm text-[#A9421C]">
                          {t("questionTypes.numberOfLessons", {
                            number: questionType.lessons,
                            context: questionType.lessons > 1 ? "plural" : "singular",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex w-full flex-col gap-1">
                      <p className="text-left text-small font-medium text-[#929292]">
                        {t("progress")}
                      </p>
                      <Progress
                        value={(questionType.progress.totalLearningXP / xpRequired) * 100}
                        label={`${questionType.progress.totalLearningXP}/${xpRequired}`}
                        className="mt-1 h-4 w-full"
                      />
                    </div>
                  </div>
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
