import { useChildMatches } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useMissions, useReceiveMissionReward } from "@/hooks/react-query/useGamification";
import useBreakPoint from "@/hooks/use-screen-size";
import useGlobalMissionDialog from "@/hooks/zustand/use-global-mission-dialog";
import { EnumMissionStatus } from "@/lib/enums";

import { MissionLayout } from "../templates/dashboard-layout";
import { Button, Typography } from "../ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const BLACKLISTED_ROUTES = ["/daily-lesson/$dailyLessonId"];

const GlobalMissionDialog = () => {
  const matches = useChildMatches();

  const isAvailable = useMemo(() => {
    return matches.every((match) => !BLACKLISTED_ROUTES.includes(match.fullPath));
  }, [matches]);

  const { t } = useTranslation("milestone");
  const { open, setOpenDialog, setCloseDialog } = useGlobalMissionDialog();
  const { data: missions, isLoading, isRefetching } = useMissions();
  const { mutate: receiveMissionReward, isPending } = useReceiveMissionReward();
  const isMobile = useBreakPoint() === "xs";

  const isReceivable = useMemo(() => {
    if (missions && missions.length > 0 && !isLoading && !isRefetching) {
      return missions.find((mission) => mission.status === EnumMissionStatus.COMPLETED);
    }
    return false;
  }, [missions, isLoading, isRefetching]);

  useEffect(() => {
    if (isReceivable) {
      setOpenDialog();
    }
  }, [missions, isReceivable, setOpenDialog]);

  const handleReceive = () => {
    if (isReceivable) {
      receiveMissionReward(undefined, {
        onSettled: () => {
          setCloseDialog();
        },
      });
    } else {
      setCloseDialog();
    }
  };

  return (
    <Dialog open={open && !isRefetching && !isLoading && isAvailable}>
      <DialogContent
        showClose={false}
        autoFocus={false}
        className="flex max-w-2xl flex-col items-center justify-center rounded-none p-4 max-md:h-screen md:rounded-3xl md:p-12"
      >
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" className="mb-4 text-center text-primary">
              {t("mission.title", {
                context: isReceivable ? "" : "short",
              })}
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
              size={isMobile ? "2xl" : "3xl"}
              className="w-full"
              onClick={handleReceive}
            >
              {isReceivable
                ? t("after.receiveReward", { ns: "dailyLesson" })
                : t("close", { ns: "common" })}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalMissionDialog;
