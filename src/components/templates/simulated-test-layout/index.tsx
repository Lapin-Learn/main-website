import { Outlet, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import mockQuestionGroups from "@/lib/mock/mock-reading-content";
import { Route } from "@/routes/_authenticated/practice/_simulated-test";

import QuestionNavigator from "../../molecules/question-navigator";
import SubmitDialog from "../../organisms/simulated-test-dialog/submit-dialog";
import Header from "./header";

const SimulatedTestLayout = () => {
  const { t } = useTranslation("simulatedTest");
  const { sessionId, skillTestId } = Route.useSearch();
  const { navigateToPart, position, resetTest } = useSimulatedTestState();
  const navigate = useNavigate();
  // TODO: calling api to get the detail of the session before render the outlet

  useEffect(() => {
    navigateToPart(1, 1);
    return () => {
      if (!sessionId) {
        navigate({ to: "/practice" });
      }
      resetTest();
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <Header currentPart={position.part} testId={skillTestId} skillTestId={skillTestId} />
      <Outlet />
      <div className="flex flex-1 flex-col items-center justify-between gap-2 border-t bg-white px-4 py-2 sm:min-h-24 sm:flex-row sm:px-8 sm:py-0 lg:gap-12">
        <div className="question-navigator flex h-fit w-full flex-1 flex-wrap items-center gap-1">
          {mockQuestionGroups.map((group) => (
            <React.Fragment key={group.part}>
              <p className="w-[60px] text-center text-xs font-medium">Part {group.part}</p>
              {Array.from(
                { length: group.endQuestionNo - group.startQuestionNo + 1 },
                (_, i) => i + group.startQuestionNo
              ).map((number) => (
                <QuestionNavigator key={number} number={number} partNo={group.part} />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-row gap-2 xl:gap-4">
          <div className="back-and-next flex flex-row gap-2 xl:gap-4">
            <Button
              variant="outline"
              disabled={position.part == mockQuestionGroups[0].part}
              onClick={() => {
                if (position.part == mockQuestionGroups[0].part) return;
                navigateToPart(
                  mockQuestionGroups.find((g) => g.part == position.part - 1)?.startQuestionNo ?? 1,
                  position.part - 1
                );
              }}
            >
              <ArrowLeft size={20} className="lg:mr-2" />
              <span className="hidden lg:block">{t("prevBtn")}</span>
            </Button>
            <Button
              variant="outline"
              disabled={position.part == mockQuestionGroups[mockQuestionGroups.length - 1].part}
              onClick={() => {
                if (position.part == mockQuestionGroups[mockQuestionGroups.length - 1].part) return;
                navigateToPart(
                  mockQuestionGroups.find((g) => g.part == position.part + 1)?.startQuestionNo ?? 1,
                  position.part + 1
                );
              }}
            >
              <span className="hidden lg:block">{t("nextBtn")}</span>
              <ArrowRight size={20} className="lg:ml-2" />
            </Button>
          </div>
          <SubmitDialog
            triggerButton={<Button className="submit">{t("submitBtn")}</Button>}
            sessionId={sessionId}
          />
        </div>
      </div>
    </div>
  );
};

export default SimulatedTestLayout;
