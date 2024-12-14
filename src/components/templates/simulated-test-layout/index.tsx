import { Outlet } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import useSimulatedTest from "@/hooks/use-simulated-test";
import mockQuestionGroups from "@/lib/mock/mock-reading-content";

import QuestionNavigator from "../../mocules/question-navigator";
import SubmitDialog from "../../organisms/simulated-test-dialog/submit-dialog";
import Header from "./header";

const SimulatedTestLayout = () => {
  const { t } = useTranslation("simulatedTest");
  const { navigateToPart, currentPart, resetTest } = useSimulatedTest();
  // TODO: calling api to get the detail of the session before render the outlet

  useEffect(() => {
    navigateToPart(1, 1);
    return () => resetTest();
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <Header currentPart={currentPart} />
      <Outlet />
      <div className="flex flex-1 flex-col items-center justify-between gap-2 border-t bg-white px-4 py-2 sm:min-h-24 sm:flex-row sm:px-8 sm:py-0 lg:gap-12">
        <div className="flex h-fit w-full flex-1 flex-wrap items-center gap-1">
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
          <Button
            variant="outline"
            disabled={currentPart == mockQuestionGroups[0].part}
            onClick={() => {
              if (currentPart == mockQuestionGroups[0].part) return;
              navigateToPart(
                mockQuestionGroups.find((g) => g.part == currentPart - 1)?.startQuestionNo ?? 1,
                currentPart - 1
              );
            }}
          >
            <ArrowLeft size={20} className="lg:mr-2" />
            <span className="hidden lg:block">{t("prevBtn")}</span>
          </Button>
          <Button
            variant="outline"
            disabled={currentPart == mockQuestionGroups[mockQuestionGroups.length - 1].part}
            onClick={() => {
              if (currentPart == mockQuestionGroups[mockQuestionGroups.length - 1].part) return;
              navigateToPart(
                mockQuestionGroups.find((g) => g.part == currentPart + 1)?.startQuestionNo ?? 1,
                currentPart + 1
              );
            }}
          >
            <span className="hidden lg:block">{t("nextBtn")}</span>
            <ArrowRight size={20} className="lg:ml-2" />
          </Button>
          <SubmitDialog triggerButton={<Button>{t("submitBtn")}</Button>} />
        </div>
      </div>
    </div>
  );
};

export default SimulatedTestLayout;
