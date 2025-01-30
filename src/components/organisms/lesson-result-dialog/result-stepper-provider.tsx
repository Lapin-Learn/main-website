import { createContext, PropsWithChildren, useContext, useState } from "react";

import { LessonResult } from "@/lib/types/daily-lesson.type";

import { transformStepper } from "./helper";
import { EnumResultStepper, ResultStepperContextType } from "./type";

const nextStepMapper: Record<string, EnumResultStepper> = {
  [EnumResultStepper.RESULT]: EnumResultStepper.DAILY_STREAK,
  [EnumResultStepper.DAILY_STREAK]: EnumResultStepper.LEVEL_RANK,
  [EnumResultStepper.LEVEL_RANK]: EnumResultStepper.MISSION_COMPLETED,
  [EnumResultStepper.MISSION_COMPLETED]: EnumResultStepper.BAND_SCORE_UP,
  [EnumResultStepper.BAND_SCORE_UP]: EnumResultStepper.END,
};

export const useResultStepperContext = () => {
  const context = useContext(ResultStepperContext);
  if (!context) {
    throw new Error("useTestHeaderLayoutContext must be used within a ResultStepper");
  }
  return context;
};

const ResultStepperContext = createContext<ResultStepperContextType | undefined>(undefined);

const ResultStepperProvider = ({
  children,
  result,
}: PropsWithChildren<{
  result: LessonResult;
}>) => {
  const [step, setStep] = useState<EnumResultStepper>(EnumResultStepper.RESULT);
  const stepper = transformStepper(result);
  const [stepValue, setStepValue] = useState(stepper[EnumResultStepper.RESULT]);

  const nextMilestone = () => {
    let nextStep = nextStepMapper[step];
    let stepValue = stepper[nextStep];
    while (nextStep !== EnumResultStepper.END) {
      if (stepValue) {
        setStep(nextStep);
        setStepValue(stepValue);
        return;
      }
      nextStep = nextStepMapper[nextStep];
      stepValue = stepper[nextStep];
    }
    setStep(EnumResultStepper.END);
    return nextStep;
  };

  return (
    <ResultStepperContext.Provider
      value={{ currentStep: step, currentStepValue: stepValue, nextMilestone }}
    >
      {children}
    </ResultStepperContext.Provider>
  );
};

export default ResultStepperProvider;
