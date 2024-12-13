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

  useEffect(() => {
    navigateToPart(1, 1);
    return () => resetTest();
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <Header currentPart={currentPart} />
      <Outlet />
      <div className="flex min-h-24 flex-1 flex-row items-center justify-between gap-12 border-t bg-white px-8">
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
        <div className="flex flex-row gap-4">
          <Button variant="outline">
            <ArrowLeft size={20} className="mr-2" />
            {t("prevBtn")}
          </Button>
          <Button variant="outline">
            {t("nextBtn")}
            <ArrowRight size={20} className="ml-2" />
          </Button>
          <SubmitDialog triggerButton={<Button>{t("submitBtn")}</Button>} />
        </div>
      </div>
    </div>
  );
};

export default SimulatedTestLayout;
