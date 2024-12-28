import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import QuestionNavigator from "@/components/molecules/question-navigator-button";
import SubmitDialog from "@/components/organisms/simulated-test-dialog/submit-dialog";
import { Button } from "@/components/ui";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import mockQuestionGroups from "@/lib/mock/mock-reading-content";
import { PartDetail } from "@/lib/types/simulated-test.type";
import { cn } from "@/lib/utils";

type FooterProps = {
  sessionId: number;
  partDetails: (PartDetail & {
    part: number;
  })[];
  status: EnumSimulatedTestSessionStatus;
};
const Footer = ({ sessionId, partDetails, status }: FooterProps) => {
  const { navigateToPart, position } = useSimulatedTestState();
  const { t } = useTranslation("simulatedTest");

  const moveToNextPart = () => {
    if (position.part == partDetails[0].part) return;
    navigateToPart(
      mockQuestionGroups.find((g) => g.part == position.part - 1)?.startQuestionNo ?? 1,
      position.part - 1
    );
  };

  const moveToPrevPart = () => {
    if (position.part == partDetails[partDetails.length - 1].part) return;
    navigateToPart(
      mockQuestionGroups.find((g) => g.part == position.part + 1)?.startQuestionNo ?? 1,
      position.part + 1
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-2 border-t bg-white py-2 sm:min-h-24 sm:flex-row sm:py-0 lg:gap-12",
        status !== EnumSimulatedTestSessionStatus.FINISHED && "px-4 sm:px-8 "
      )}
    >
      <div className="question-navigator flex h-fit w-full flex-1 flex-wrap items-center gap-1">
        {partDetails.map((group) => (
          <React.Fragment key={group.part}>
            <p className="w-[60px] text-center text-xs font-medium">Part {group.part}</p>
            {Array.from(
              { length: group.endQuestionNo - group.startQuestionNo + 1 },
              (_, i) => i + group.startQuestionNo
            ).map((number) => (
              <QuestionNavigator key={number} number={number} partNo={group.part} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {status !== EnumSimulatedTestSessionStatus.FINISHED && (
        <div className="flex flex-row gap-2 xl:gap-4">
          <div className="flex flex-row gap-2 xl:gap-4">
            <Button
              variant="outline"
              disabled={position.part == partDetails[0].part}
              onClick={moveToPrevPart}
            >
              <ArrowLeft size={20} className="lg:mr-2" />
              <span className="hidden lg:block">{t("prevBtn")}</span>
            </Button>
            <Button
              variant="outline"
              disabled={position.part == partDetails[partDetails.length - 1].part}
              onClick={moveToNextPart}
            >
              <span className="hidden lg:block">{t("nextBtn")}</span>
              <ArrowRight size={20} className="lg:ml-2" />
            </Button>
          </div>

          <SubmitDialog
            triggerButton={<Button className="submit">{t("submitBtn")}</Button>}
            sessionId={sessionId}
          />
        </div>
      )}
    </div>
  );
};
export default Footer;
