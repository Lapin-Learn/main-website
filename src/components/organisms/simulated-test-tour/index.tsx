import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Joyride, { CallBackProps, STATUS, TooltipRenderProps } from "react-joyride";

import { Button } from "@/components/ui";
import { EnumSkill } from "@/lib/enums";

import { useTourSteps } from "./use-tour-steps";

type SimulatedTestTourProps = {
  run: boolean;
  onEndTour: () => void;
};

const SimulatedTestTourReading = ({ run, onEndTour }: SimulatedTestTourProps) => {
  const { t } = useTranslation("simulatedTest");
  const tourSteps = useTourSteps();
  const startSteps = t("tour.beforeStart.steps", { returnObjects: true }) as string[];
  const endSteps = t("tour.end.steps", { returnObjects: true }) as string[];

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      onEndTour();
    }
  };

  return (
    <Joyride
      run={run}
      callback={handleTourCallback}
      steps={[
        {
          content: (
            <div className="max-w-2xl text-left text-sm">
              <h5 className="mb-2 text-heading-5 font-semibold">{t("tour.beforeStart.title")}</h5>
              <div className="flex flex-col gap-1">
                <p>{t("tour.beforeStart.welcome")}</p>
                <ul className="flex list-disc flex-col gap-1 pl-6">
                  {startSteps.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ),
          locale: { next: t("nextBtn") },
          placement: "center",
          target: "#root",
        },
        ...tourSteps,
        {
          content: (
            <div className="max-w-2xl text-left text-sm">
              <h5 className="mb-2 text-heading-5 font-semibold">{t("tour.end.title")}</h5>
              <div className="flex flex-col gap-1">
                <p>{t("tour.end.congratulations")}</p>
                <ul className="flex list-disc flex-col gap-1 pl-6">
                  {endSteps.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ),
          locale: { last: t("tour.end.lastBtn") },
          placement: "center",
          target: "#root",
        },
      ]}
      continuous
      scrollOffset={64}
      spotlightPadding={4}
      scrollToFirstStep
      showSkipButton
      hideCloseButton
      styles={{
        options: {
          zIndex: 1000,
          primaryColor: "#EE5D28",
        },
        tooltip: {
          borderRadius: 8,
          padding: 24,
          width: "fit-content",
          maxWidth: 540,
        },
        tooltipContent: {
          padding: 0,
        },
      }}
      tooltipComponent={({
        continuous,
        index,
        step,
        backProps,
        primaryProps,
        skipProps,
        size,
      }: TooltipRenderProps) => {
        const isFirstStep = index === 0;
        const isLastStep = index === size - 1;
        return (
          <div className="custom-tooltip rounded-md bg-white p-5 shadow-lg">
            <div>{step.content}</div>
            <div className="mt-4 flex justify-between">
              <Button {...skipProps} variant="outline">
                {t("tour.skipBtn")}
              </Button>

              <div className="flex gap-2">
                {index > 0 && !isLastStep && (
                  <Button {...backProps} variant="outline">
                    <ChevronLeft size={18} />
                  </Button>
                )}
                {continuous && (
                  <Button {...primaryProps}>
                    {isFirstStep && t("tour.beforeStart.startBtn")}
                    {isLastStep && t("tour.end.lastBtn")}
                    {!isFirstStep && !isLastStep && <ChevronRight size={18} />}
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

const DefaultTour = ({ onEndTour }: Pick<SimulatedTestTourProps, "onEndTour">) => {
  useEffect(() => {
    onEndTour();
  }, []);
  return <React.Fragment />;
};

const SimulatedTestTourFactory = ({
  skill,
  ...props
}: { skill: EnumSkill } & SimulatedTestTourProps) => {
  switch (skill) {
    case EnumSkill.reading:
      return <SimulatedTestTourReading {...props} />;
    default:
      return <DefaultTour {...props} />;
  }
};

export { SimulatedTestTourFactory, SimulatedTestTourReading };
