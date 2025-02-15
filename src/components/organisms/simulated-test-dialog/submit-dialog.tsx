import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import React, { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useGetSTSessionDetail,
  useSubmitSimulatedTest,
} from "@/hooks/react-query/use-simulated-test";
import useGlobalTimerStore, { timerKeys, TimerType } from "@/hooks/zustand/use-global-timer";
import { useAnswerStore } from "@/hooks/zustand/use-simulated-test";
import { EnumMode, EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import {
  formatAnswerSheetToResponses,
  formatTime,
  getElapsedTime,
  getInitialTime,
} from "@/lib/utils";

type SubmitDialogProps = {
  triggerButton: React.ReactNode;
  sessionId: number;
};
const SubmitDialog = ({ triggerButton, sessionId }: SubmitDialogProps) => {
  const { t } = useTranslation("simulatedTest", {
    keyPrefix: "submitDialog",
  });
  const { answerSheet } = useAnswerStore();
  const { getTimer } = useGlobalTimerStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { mutate: submitTest, isPending } = useSubmitSimulatedTest();
  const { data: session } = useGetSTSessionDetail(sessionId);

  const timer = getTimer(timerKeys.testDetail(sessionId));
  useEffect(() => {
    if (timer?.type == "countdown" && timer.time <= 0) {
      handleSubmit();
    }
  }, [timer]);

  const handleSubmit = () => {
    const responses = formatAnswerSheetToResponses(answerSheet);
    if (session) {
      const type: TimerType =
        session.timeLimit == 0 && session.mode == EnumMode.PRACTICE ? "stopwatch" : "countdown";
      const initialTime = getInitialTime(session.mode, session.timeLimit, session.skillTest.skill);
      const currentTime = getTimer(timerKeys.testDetail(sessionId))?.time ?? 0;
      if (session.skillTest.skill !== EnumSkill.speaking) {
        submitTest(
          {
            sessionId: session.id,
            elapsedTime: getElapsedTime(type, initialTime, currentTime),
            status: EnumSimulatedTestSessionStatus.FINISHED,
            response: {
              skill: session.skillTest.skill,
              info: responses,
            },
          },
          {
            onSuccess: () => {
              setIsDialogOpen(false);
            },
          }
        );
      }
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {session ? (
              (() => {
                const totalQuestions = session.skillTest.partsDetail.reduce(
                  (total, part) => total + (part.endQuestionNo - part.startQuestionNo + 1),
                  0
                );
                const remainingQuestions = totalQuestions - Object.keys(answerSheet).length;
                return remainingQuestions === 0 ? (
                  <Trans i18nKey="simulatedTest:submitDialog:descriptionAllAnswered" />
                ) : (
                  <Trans
                    i18nKey="simulatedTest:submitDialog:descriptionUnanswered"
                    values={{ remainingQuestions }}
                    components={{ bold: <strong /> }}
                  />
                );
              })()
            ) : (
              <Trans i18nKey="simulatedTest:submitDialog:description" />
            )}{" "}
            &nbsp;
            <strong>{formatTime((timer?.time ?? 0) / 1000)}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full"> {t("cancelBtn")}</AlertDialogCancel>
          <Button
            className="size-full"
            onClick={handleSubmit}
            isLoading={isPending}
            disabled={isPending}
          >
            {t("submitBtn")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SubmitDialog;
