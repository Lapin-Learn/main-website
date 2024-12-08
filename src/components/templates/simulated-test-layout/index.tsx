import { Button } from "@/components/ui";
import useCountdown from "@/hooks/use-countdown";
import { Outlet } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import StartDialog from "../../organisms/simulated-test-dialog/start-dialog";
import ExitDialog from "../../organisms/simulated-test-dialog/exit-dialog";
import SubmitDialog from "../../organisms/simulated-test-dialog/submit-dialog";
import QuestionNavigator from "../../mocules/question-navigator";
import React, { useEffect } from "react";
import { mockQuestionGroups } from "./mock";
import { useTranslation } from "react-i18next";

type SimulatedTestLayoutProps = {};
const SimulatedTestLayout = ({}: SimulatedTestLayoutProps) => {
  const { time, resume, timeLeft } = useCountdown(60 * 40); // 40 minutes
  const { t } = useTranslation("simulatedTest");
  useEffect(() => {
    if (timeLeft === 0) {
      // TODO: submit the test
    }
  }, [timeLeft]);

  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <StartDialog onClose={() => resume()} />
      <div className="grid h-20 w-full place-items-center border-b bg-white px-8 shadow-sm">
        <div className="flex flex-col items-center">
          <h6 className="text-lg font-bold uppercase">Reading passage 1</h6>
          <div className="text-sm font-bold text-supporting-text">Road to IELTS - test 1</div>
        </div>
        <ExitDialog
          triggerButton={
            <Button className="absolute left-8" variant="ghost">
              <ChevronLeft size={20} />
              {t("exitDialog.exitBtn")}
            </Button>
          }
        />

        <div className="absolute right-8 w-24 rounded-md bg-secondary p-2 text-center text-lg font-bold text-secondary-foreground">
          {time}
        </div>
      </div>
      <Outlet />
      <div className="flex min-h-24 flex-1 flex-row items-center justify-between gap-12 border-t bg-white px-8">
        <div className="flex h-fit w-full flex-1 flex-wrap items-center gap-1">
          {mockQuestionGroups.map((group) => (
            <React.Fragment key={group.partNo}>
              <p className="w-[60px] text-center text-xs font-medium">Part {group.partNo}</p>
              {Array.from({ length: group.numberOfQuestions }).map((_, i) => (
                <QuestionNavigator
                  key={i + group.partNo}
                  number={i + group.partNo + 1}
                  part={group.partNo}
                  status="unanswered"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <Button variant="outline">
            <ArrowLeft size={20} className="mr-2" />
            {t("prevBtn")}
          </Button>
          <Button variant="outline">
            {t("nextBtn")}
            <ArrowRight size={20} className="ml-2" />
          </Button>
          <SubmitDialog
            triggerButton={<Button>{t("submitBtn")}</Button>}
            time={<strong>{time}</strong>}
          />
        </div>
      </div>
    </div>
  );
};

export default SimulatedTestLayout;
