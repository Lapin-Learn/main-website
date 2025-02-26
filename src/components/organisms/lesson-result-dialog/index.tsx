import BandScoreStep from "@components/organisms/lesson-result-dialog/band-score-step.tsx";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import LevelRankStep from "./level-rank-step";
import MissionStep from "./mission-step";
import ResultDetail from "./result-detail";
import ResultStep from "./result-step";
import { useResultStepperContext } from "./result-stepper-provider";
import StreakStep from "./streak-step";
import { EnumResultStepper } from "./type";

const LessonResultDialog = ({ defaultOpen = false }: { defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);

  const search = useSearch({
    strict: false,
  });
  const navigate = useNavigate();
  const { currentStep, currentStepValue } = useResultStepperContext();
  // const { clearHistory } = useDailyLessonStore();
  const [showResultDetail, setShowResultDetail] = useState(false);

  useEffect(() => {
    if (currentStep === EnumResultStepper.END) {
      setOpen(false);
      // clearHistory();
      navigate({
        to: "/daily-lesson",
        search,
      });
    }
  }, [currentStep]);

  return (
    <Dialog open={open}>
      <DialogContent
        className="h-[600px] max-w-3xl overflow-hidden rounded-lg border-none p-0 md:h-[768px] md:max-h-screen md:rounded-3xl"
        showClose={false}
      >
        {showResultDetail ? (
          <ResultDetail setResultDetail={setShowResultDetail} />
        ) : (
          <>
            <DialogHeader className="hidden">
              <DialogTitle />
            </DialogHeader>
            {currentStepValue && (
              <>
                <ResultStep setShowResultDetail={setShowResultDetail} />
                <BandScoreStep />
                <StreakStep />
                {currentStepValue.type === EnumResultStepper.LEVEL_RANK && (
                  <LevelRankStep {...currentStepValue} />
                )}
                <MissionStep />
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LessonResultDialog;
