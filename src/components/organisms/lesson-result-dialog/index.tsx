import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson/$dailyLessonId";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import LevelRankStep from "./level-rank-step";
import MissionStep from "./mission-step";
import ResultStep from "./result-step";
import { useResultStepperContext } from "./result-stepper-provider";
import StreakStep from "./streak-step";
import { EnumResultStepper } from "./type";

const LessonResultDialog = () => {
  const [open, setOpen] = useState(false);

  const { questionTypeId } = Route.useSearch();
  const navigate = useNavigate();
  const { currentStep, currentStepValue } = useResultStepperContext();

  useEffect(() => {
    if (currentStep === EnumResultStepper.END) {
      setOpen(false);
      navigate({
        to: `/daily-lesson/question-types/${questionTypeId}`,
      });
    }
  }, [currentStep]);

  useEffect(() => {
    return () => {
      setOpen(true);
    };
  }, []);

  return (
    <Dialog open={open}>
      <DialogContent
        className="h-[768px] max-w-3xl overflow-hidden rounded-3xl border-none p-0"
        showClose={false}
      >
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>
        {currentStepValue && (
          <>
            <ResultStep />
            <StreakStep />
            {currentStepValue.type === EnumResultStepper.LEVEL_RANK && (
              <LevelRankStep {...currentStepValue} />
            )}
            <MissionStep />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LessonResultDialog;
