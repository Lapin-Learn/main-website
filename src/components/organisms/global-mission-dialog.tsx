import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useMissions, useReceiveMissionReward } from "@/hooks/react-query/useGamification";
import { EnumMissionStatus } from "@/lib/enums";

import { MissionLayout } from "../templates/dashboard-layout";
import { Button, Typography } from "../ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const GlobalMissionDialog = () => {
  const { t } = useTranslation("milestone");
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: missions, isLoading } = useMissions();
  const { mutate: receiveMissionReward, isPending } = useReceiveMissionReward();

  useEffect(() => {
    if (missions && missions.length > 0) {
      if (missions.find((mission) => mission.status === EnumMissionStatus.COMPLETED)) {
        setOpen(true);
      }
    }
    if (!isLoading) {
      setIsError(false);
    }
  }, [missions, isLoading]);

  const handleReceive = () => {
    receiveMissionReward(undefined, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: () => {
        setIsError(true);
      },
    });
  };

  return (
    <Dialog open={open && !isError}>
      <DialogHeader>
        <DialogTitle />
      </DialogHeader>
      <DialogContent
        showClose={false}
        autoFocus={false}
        className="flex max-w-2xl flex-col items-center justify-center p-12"
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
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
            className="my-4 grid min-h-96 place-items-center"
          >
            <MissionLayout border />
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-full"
          >
            <Button
              isLoading={isPending}
              disabled={isPending}
              size="xl"
              className="w-full"
              onClick={handleReceive}
            >
              {t("after.receive-reward", { ns: "dailyLesson" })}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalMissionDialog;
