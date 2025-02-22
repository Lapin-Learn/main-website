import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import QuestionNavigator from "@/components/molecules/question-navigator-button";
import { Button } from "@/components/ui";
import useBreakPoint from "@/hooks/use-screen-size";
import useSimulatedTestState, { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { DEFAULT_QUESTION_NO_BY_SKILL } from "@/lib/consts";
import { EnumSkill } from "@/lib/enums";
import { PartDetail } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

type FooterProps = {
  partDetails: (PartDetail & {
    part: number;
  })[];
  skill: EnumSkill;
  answerStatus?: boolean[];
};

const Footer = ({ partDetails, skill, answerStatus }: FooterProps) => {
  const { navigateToPart, position } = useSimulatedTestState();
  const { t } = useTranslation("simulatedTest");
  const { setCurrentQuestion } = useAnswerStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const isMobile = useBreakPoint() === "xs";
  const [showQuestionNavigator, setShowQuestionNavigator] = useState(!isMobile);

  useEffect(() => {
    if (position.part !== partDetails[0].part) {
      navigateToPart(partDetails[0].startQuestionNo, partDetails[0].part);
    }
    setIsInitialized(true);
  }, []);

  if (!isInitialized) return null;

  const currentPartId = partDetails.findIndex((detail) => detail.part === position.part);

  const nextPart =
    DEFAULT_QUESTION_NO_BY_SKILL[skill] && currentPartId !== partDetails.length - 1
      ? partDetails[currentPartId + 1].startQuestionNo
      : 0;
  const prevPart =
    DEFAULT_QUESTION_NO_BY_SKILL[skill] && currentPartId !== 0
      ? partDetails[currentPartId - 1].startQuestionNo
      : 0;

  const moveToNextPart = () => {
    if (!nextPart) return;
    if (skill !== EnumSkill.speaking) {
      navigateToPart(nextPart, partDetails[currentPartId + 1].part);
      setCurrentQuestion(nextPart);
    }
  };

  const moveToPrevPart = () => {
    if (!prevPart) return;
    if (skill !== EnumSkill.speaking) {
      navigateToPart(prevPart, partDetails[currentPartId - 1].part);
      setCurrentQuestion(prevPart);
    }
  };

  const handleToggleNavigator = () => {
    setShowQuestionNavigator((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-2 border-t bg-white px-4 py-2 sm:min-h-24 sm:flex-row sm:px-8 sm:py-0 sm:gap-12 w-full",
        skill == EnumSkill.writing && "justify-end py-0 sm:min-h-20"
      )}
    >
      {skill !== EnumSkill.writing && showQuestionNavigator && (
        <div className="question-navigator flex h-fit w-full flex-1 flex-wrap items-center gap-1">
          {partDetails.map((group) =>
            isMobile ? (
              <>
                {Array.from(
                  { length: group.endQuestionNo - group.startQuestionNo + 1 },
                  (_, i) => i + group.startQuestionNo
                ).map((number) => (
                  <QuestionNavigator
                    key={number}
                    number={number}
                    partNo={group.part}
                    status={Array.isArray(answerStatus) ? answerStatus[number - 1] : answerStatus}
                  />
                ))}
              </>
            ) : (
              <div key={group.part} className="flex flex-row items-center gap-1">
                <p className="w-[60px] text-center text-xs font-medium">Part {group.part}</p>
                {Array.from(
                  { length: group.endQuestionNo - group.startQuestionNo + 1 },
                  (_, i) => i + group.startQuestionNo
                ).map((number) => (
                  <QuestionNavigator
                    key={number}
                    number={number}
                    partNo={group.part}
                    status={Array.isArray(answerStatus) ? answerStatus[number - 1] : answerStatus}
                  />
                ))}
              </div>
            )
          )}
        </div>
      )}
      <div className="flex flex-row gap-2 xl:gap-4">
        <Button variant="outline" onClick={handleToggleNavigator} className="md:hidden">
          {t("showQuestionNavigator", {
            context: String(showQuestionNavigator),
          })}
        </Button>
        <Button variant="outline" disabled={!prevPart} onClick={moveToPrevPart}>
          <ArrowLeft size={isMobile ? 16 : 20} className="mr-2" />
          <span className="block">{t("prevBtn")}</span>
        </Button>
        <Button variant="outline" disabled={!nextPart} onClick={moveToNextPart}>
          <span className="block">{t("nextBtn")}</span>
          <ArrowRight size={isMobile ? 16 : 20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
export default Footer;
