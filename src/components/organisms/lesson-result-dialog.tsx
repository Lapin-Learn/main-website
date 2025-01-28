import { Link } from "@tanstack/react-router";
import { SVGProps, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import icons from "@/assets/icons";
import useDailyLessonStore, { LessonResult } from "@/hooks/zustand/use-daily-lesson-store";

import { formatTime } from "../../lib/utils/index";
import { Typography } from "../ui";
import { AnimatedCircularProgressBar } from "../ui/animated-circular-progress-bar";
import { Button } from "../ui/button";
import Confetti, { ConfettiRef } from "../ui/confetti";
import { Dialog, DialogContent } from "../ui/dialog";

type LessonResultDialogProps = {
  open: boolean;
};

const LessonResultDialog = ({ open }: LessonResultDialogProps) => {
  const {
    lessonState: { result },
  } = useDailyLessonStore();
  const { t } = useTranslation("dailyLesson");
  const confettiRef = useRef<ConfettiRef>(null);

  const randomEncourage = Math.random() * Number(t("after.encourages.length"));

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        confettiRef.current?.fire();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [open]);

  if (!result) return null;

  const tickerComponents: Record<
    string,
    { Component: React.FC<SVGProps<SVGSVGElement>>; label: string; value: string | number }
  > = {
    exp: { Component: icons.Flash, label: "after.Experience", value: result.exp },
    carrot: { Component: icons.Carrot, label: "after.Carrot", value: result.carrot },
    timer: { Component: icons.Clock, label: "after.Timer", value: formatTime(result.timer) },
  };
  const { percent } = result as LessonResult;

  return (
    <Dialog open={open}>
      <DialogContent
        className="flex h-[768px] max-w-3xl flex-col-reverse rounded-3xl border-none bg-gradient-to-t from-[#3A8A7D_27.57%] to-[#20534D_100%]"
        showClose={false}
      >
        <Confetti ref={confettiRef} className="absolute left-0 top-0 -z-10 size-full" />
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8">
          <div className="mb-8 flex flex-col items-center gap-4">
            <AnimatedCircularProgressBar
              value={percent}
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
          <Link to="/daily-lesson" className="w-full">
            <Button size="2xl" className="w-full rounded-lg">
              {t("after.receive-reward")}
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonResultDialog;
