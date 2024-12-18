import { useTranslation } from "react-i18next";
import { Step } from "react-joyride";

import { EnumTourElement } from "@/lib/enums";

import TargetSection from "./target-section";

const createStep = (
  t: (key: string) => string,
  titleKey: string,
  descriptionKey: string,
  target: string,
  currentStep: number,
  steps: number
): Step => {
  return {
    target,
    content: (
      <TargetSection title={t(titleKey)} currentStep={currentStep} steps={steps}>
        <p>{t(descriptionKey)}</p>
      </TargetSection>
    ),
    placement: "auto",
    floaterProps: {
      disableAnimation: true,
    },
    disableScrolling: false,
  };
};

export const useTourSteps = (): Step[] => {
  const { t } = useTranslation("simulatedTest");

  const stepDefinitions = [
    {
      titleKey: "tour.elements.timer.title",
      descriptionKey: "tour.elements.timer.description",
      target: `.${EnumTourElement.TIMER}`,
    },
    {
      titleKey: "tour.elements.content.title",
      descriptionKey: "tour.elements.content.description",
      target: `.${EnumTourElement.CONTENT}`,
    },
    {
      titleKey: "tour.elements.answerSheet.title",
      descriptionKey: "tour.elements.answerSheet.description",
      target: `.${EnumTourElement.ANSWER_SHEET}`,
    },
    {
      titleKey: "tour.elements.questionNavigator.title",
      descriptionKey: "tour.elements.questionNavigator.description",
      target: `.${EnumTourElement.QUESTION_NAVIGATOR}`,
    },
    {
      titleKey: "tour.elements.backAndNext.title",
      descriptionKey: "tour.elements.backAndNext.description",
      target: `.${EnumTourElement.BACK_AND_NEXT}`,
    },
    {
      titleKey: "tour.elements.submit.title",
      descriptionKey: "tour.elements.submit.description",
      target: `.${EnumTourElement.SUBMIT}`,
    },
    {
      titleKey: "tour.elements.quit.title",
      descriptionKey: "tour.elements.quit.description",
      target: `.${EnumTourElement.QUIT}`,
    },
  ];

  return stepDefinitions.map((step, index) =>
    createStep(
      t,
      step.titleKey,
      step.descriptionKey,
      step.target,
      index + 1,
      stepDefinitions.length
    )
  );
};

export default useTourSteps;
