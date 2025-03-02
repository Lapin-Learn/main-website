import _ from "lodash";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

import { Button, Typography } from "@/components/ui";
import { useMissions, useReceiveMissionReward } from "@/hooks/react-query/useGamification";
import { EnumMissionStatus } from "@/lib/enums";

import { MissionList } from "../mission-section/mission-list";
import { useResultStepperContext } from "./result-stepper-provider";
import { EnumResultStepper } from "./type";

const MissionStep = () => {
  const { t } = useTranslation("milestone");
  const { data: missions, isLoading } = useMissions();
  const { currentStepValue, nextMilestone } = useResultStepperContext();
  const { mutate: receiveMissionReward } = useReceiveMissionReward();

  if (currentStepValue.type !== EnumResultStepper.MISSION_COMPLETED) return null;

  const handleNext = () => {
    receiveMissionReward();
    nextMilestone();
  };

  if (isLoading) return null;

  const dailyMissions = missions?.filter((mission) => mission.interval === "daily");

  const combinedMissions = _.uniqBy(
    [...(currentStepValue.value ?? []), ...(dailyMissions ?? [])],
    "missionId"
  );

  const isAvailableReceiveReward = combinedMissions.some(
    (mission) => mission.status === EnumMissionStatus.COMPLETED
  );
  return (
    <div className="flex h-full flex-col items-center justify-between p-4 md:p-12">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" className="mb-4 text-center text-primary">
            {t("mission.title")}
          </Typography>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid min-h-96 place-items-center"
        >
          <MissionList
            data={combinedMissions}
            className="overflow-hidden rounded-xl border-[1.5px]"
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Button size="3xl" className="min-w-96 max-w-full" onClick={handleNext}>
          {isAvailableReceiveReward
            ? t("after.receiveReward", { ns: "dailyLesson" })
            : t("button.next")}
        </Button>
      </motion.div>
    </div>
  );
};

export default MissionStep;
