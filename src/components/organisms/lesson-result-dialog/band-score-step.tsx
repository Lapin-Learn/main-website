import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";

import firework from "@/assets/lotties/firework.json";
import { Badge, Button, Typography } from "@/components/ui";
import useBreakPoint from "@/hooks/use-screen-size";
import { BAND_SCORES } from "@/lib/consts.ts";

import { useResultStepperContext } from "./result-stepper-provider";
import { EnumResultStepper } from "./type";

const StreakStep = () => {
  const { t } = useTranslation("milestone");
  const { nextMilestone, currentStepValue } = useResultStepperContext();
  const isMobile = useBreakPoint() === "xs";

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: firework,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (currentStepValue.type !== EnumResultStepper.BAND_SCORE_UP) return null;

  return (
    <div className="flex h-full flex-col items-center justify-around p-4 md:p-8">
      <div className="flex flex-col items-center justify-center space-y-2 md:space-y-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Lottie options={defaultOptions} height={isMobile ? 120 : 300} width="auto" />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            className="max-w-screen mt-2 text-center font-semibold md:mt-4"
          >
            {t("jump-band.congratulations", { ns: "dailyLesson" })}
          </Typography>
          <Badge variant="blue" className="rounded-2xl px-6 py-4 text-3xl">
            {BAND_SCORES[currentStepValue.value]}
          </Badge>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <Button
          size={isMobile ? "2xl" : "3xl"}
          className="min-w-96 max-w-full"
          onClick={nextMilestone}
        >
          {t("button.next")}
        </Button>
      </motion.div>
    </div>
  );
};

export default StreakStep;
