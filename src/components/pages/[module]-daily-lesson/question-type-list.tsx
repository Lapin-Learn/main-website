import { useTranslation } from "react-i18next";

import { Card, CardContent, CardTitle } from "@/components/ui";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuestionTypes } from "@/hooks/react-query/use-daily-lesson";
import { EnumBandScore, EnumSkill } from "@/lib/enums";

import QuestionTypeDetail from "./question-type-detail";
type QuestionTypeListPageProps = {
  skill: EnumSkill;
};

const QuestionTypeList = ({ skill }: QuestionTypeListPageProps) => {
  const { data: questionTypes, isSuccess, isLoading } = useGetQuestionTypes(skill);
  const { t } = useTranslation("dailyLesson");
  return (
    <main className="h-fit w-full">
      {isLoading && <SkeletonQuestionTypeList />}
      {isSuccess && (
        <div className="flex w-full flex-col items-center gap-5">
          {questionTypes?.map((questionType) => {
            const xpRequired = questionType.bandScoreRequires.find(
              (bandScore) => bandScore.bandScore === questionType.progress.bandScore
            )?.requireXP;
            return (
              <QuestionTypeDetail
                key={questionType.id}
                questionTypeId={questionType.id.toString()}
                exerciseSkill={skill}
                className="w-full"
              >
                <Card className="relative flex h-fit w-full flex-row overflow-hidden p-6 transition-all duration-300 hover:cursor-pointer hover:shadow-lg">
                  {questionType.image && (
                    <img
                      src={questionType.image.url}
                      alt={questionType.name}
                      className="!size-20 rounded-full"
                    />
                  )}
                  <CardContent className="w-full">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-start gap-3">
                          <CardTitle className="text-heading-6 font-semibold text-black">
                            {questionType.name}
                          </CardTitle>
                          <span className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium capitalize text-blue-500">
                            {questionType.progress.bandScore === EnumBandScore.PRE_IELTS
                              ? questionType.progress.bandScore
                              : `band ${questionType.progress.bandScore}`}
                          </span>
                        </div>
                        <div className="clip-custom absolute right-0 bg-[#FCE3B4] p-2 pl-7 pr-3.5">
                          <span className="text-nowrap text-sm text-[#A9421C]">
                            {t("collection-list.numberOfTest", {
                              ns: "practice",
                              number: 0,
                              total: questionType.lessons,
                              context: questionType.id === 1 ? "private" : "public",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full flex-col gap-1">
                        <p className="text-left text-small font-medium text-[#929292]">
                          {t("progress")}
                        </p>

                        {/* TODO */}
                        <Progress
                          value={questionType.progress.totalLearningXP}
                          label={`${questionType.progress.totalLearningXP}/${xpRequired}`}
                          className="h-3 w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </QuestionTypeDetail>
            );
          })}
        </div>
      )}
    </main>
  );
};

const SkeletonQuestionTypeList = () => {
  return [1, 2, 3, 4].map((_, index) => <Skeleton key={index} className="h-20 w-full" />);
};

// type QuestionTypeDrawerWrapperProps = {
//   children: React.ReactNode;
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// };

// const QuestionTypeDrawerWrapper = ({
//   children,
//   isOpen,
//   setIsOpen,
// }: QuestionTypeDrawerWrapperProps) => {
//   return (
//     <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
//       <DrawerTrigger className="w-full">{children}</DrawerTrigger>
//       <DrawerContent></DrawerContent>
//     </Drawer>
//   );
// };
export default QuestionTypeList;
