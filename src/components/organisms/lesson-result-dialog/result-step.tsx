import { SVGProps, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import icons from "@/assets/icons";
import { Button, Typography } from "@/components/ui";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import Confetti, { ConfettiRef } from "@/components/ui/confetti";

import { useResultStepperContext } from "./result-stepper-provider";
import { EnumResultStepper, ResultProps } from "./type";
type ResultStepProps = {
  setShowResultDetail: (value: boolean) => void;
};
const ResultStep = ({ setShowResultDetail }: ResultStepProps) => {
  const { currentStepValue, nextMilestone } = useResultStepperContext();
  const [circularValue, setCircularValue] = useState(0);
  const { t } = useTranslation("dailyLesson");
  const confettiRef = useRef<ConfettiRef>(null);

  const randomEncourage = Math.random() * Number(t("after.encourages.length"));

  useEffect(() => {
    confettiRef.current?.fire();
    const interval = setInterval(() => {
      confettiRef.current?.fire();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const percent = (currentStepValue as ResultProps).value.percent ?? 0;
  useEffect(() => {
    setCircularValue(percent);
  }, [percent]);

  if (currentStepValue.type !== EnumResultStepper.RESULT) return null;

  const { exp, carrot, timer } = currentStepValue.value;

  const tickerComponents: Record<
    string,
    { Component: React.FC<SVGProps<SVGSVGElement>>; label: string; value: string | number }
  > = {
    exp: { Component: icons.Flash, label: "after.Experience", value: exp },
    carrot: { Component: icons.Carrot, label: "after.Carrot", value: carrot },
    timer: { Component: icons.Clock, label: "after.Timer", value: timer },
  };

  const handleShowResultDetail = () => {
    setShowResultDetail(true);
  };

  return (
    <div className="relative flex flex-col-reverse bg-gradient-to-t from-[#3A8A7D_27.57%] to-[#20534D_100%]">
      <Confetti ref={confettiRef} className="absolute left-0 top-0 z-0 size-full" />
      <div className="z-10 flex flex-col items-center gap-4 rounded-2xl bg-white p-8">
        <div className="mb-8 flex flex-col items-center gap-4">
          <AnimatedCircularProgressBar
            value={circularValue}
            className="size-36"
            max={100}
            min={0}
            gaugePrimaryColor="#247063"
            gaugeSecondaryColor="rgb(239 239 239)"
          />
          <Typography variant="h4" className="font-medium text-neutral-600">
            {t(`after.encourages.${Math.floor(randomEncourage)}`)}
          </Typography>
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          {Object.entries(tickerComponents).map(([key, { Component, label, value }]) => (
            <div
              key={key}
              className="flex w-full flex-col items-center gap-4 rounded-lg bg-neutral-50/90 p-4"
            >
              <Typography variant="h5" className="font-medium text-neutral-600">
                {t(label)}
              </Typography>
              <div className="inline-flex items-center gap-2">
                <Component height={32} width={32} />
                <Typography variant="h3" className="font-semibold">
                  {value}
                </Typography>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row space-x-4">
          <Button
            variant="ghost"
            size="3xl"
            className="w-full rounded-lg text-primary-100"
            onClick={handleShowResultDetail}
          >
            {t("result.detail")}
          </Button>
          <Button size="3xl" className="w-full rounded-lg" onClick={nextMilestone}>
            {t("after.receiveReward")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultStep;
