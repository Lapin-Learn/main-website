import { useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";

import StreakIcon from "@/assets/icons/streak-icon";
import flame from "@/assets/lotties/streak-flame.json";
import { Button, Typography } from "@/components/ui";
import { gamificationKeys, useGetStreakHistory } from "@/hooks/react-query/useGamification";

import { getCurrentWeekBooleanObject } from "./helpers";
import { useResultStepperContext } from "./result-stepper-provider";
import { EnumResultStepper } from "./type";

const WeekRecord = ({ streakRecords }: { streakRecords: string[] }) => {
  const { t, i18n } = useTranslation();

  const DAYS_OF_WEEK: string[] =
    (t("calendar.days_of_week", { returnObjects: true }) as string[]) ?? [];
  const weekMap = getCurrentWeekBooleanObject(streakRecords, DAYS_OF_WEEK);

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {Object.keys(weekMap).map((date, index) => {
        return (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="text-muted-foreground">{i18n.language === "en" ? date[0] : date}</div>
            {weekMap[date] ? (
              <StreakIcon variant="done" />
            ) : weekMap[date] === false ? (
              <StreakIcon variant="miss" />
            ) : (
              <StreakIcon variant="neutral" />
            )}
          </div>
        );
      })}
    </div>
  );
};
const StreakStep = () => {
  const { t } = useTranslation("milestone");
  const { data } = useGetStreakHistory({});
  const { nextMilestone, currentStepValue } = useResultStepperContext();

  const [streakRecords, setStreakRecords] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setStreakRecords(data?.map((d) => d.date) ?? []);
  }, [data]);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: gamificationKeys.streak(),
      });
    };
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: flame,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (currentStepValue.type !== EnumResultStepper.DAILY_STREAK) return null;

  return (
    <div className="flex h-full flex-col items-center justify-around p-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Lottie options={defaultOptions} height={150} width="auto" />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <Typography variant="h1" className="text-5xl font-bold">
            {currentStepValue.value}
          </Typography>
          <Typography variant="h2">{t("streak.day")}</Typography>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <WeekRecord streakRecords={streakRecords} />
          <Typography variant="h5" className="mt-4 max-w-96 text-center font-medium">
            {t("streak.congratulation")}
          </Typography>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <Button size="3xl" className="min-w-96 max-w-full" onClick={nextMilestone}>
          {t("button.next")}
        </Button>
      </motion.div>
    </div>
  );
};

export default StreakStep;
