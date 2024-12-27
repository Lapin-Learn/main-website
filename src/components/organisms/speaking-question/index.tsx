import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import RecordingButton from "@/components/molecules/recording-button";
import { Button } from "@/components/ui";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";

const SpeakingPartOneAndThree = () => {
  const {
    position: { question },
  } = useSimulatedTestState();
  const { t } = useTranslation("simulatedTest");

  return (
    <>
      <h4 className="text-heading-5 font-semibold">{`Question ${question}`}</h4>
      <RecordingButton duration={30} />
      <Button type="button" variant="ghost" className="w-full flex-1 sm:w-fit">
        <div className="flex items-center gap-2">
          {t("nextQuestion")}
          <ArrowRight className="size-4" />
        </div>
      </Button>
    </>
  );
};

const SpeakingPartTwo = () => {
  return <div>Speaking Part 2</div>;
};

const SpeakingQuestion = () => {
  const {
    position: { part },
  } = useSimulatedTestState();

  return (
    <div className="flex w-[800px] flex-col items-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      {part === 1 || part === 3 ? <SpeakingPartOneAndThree /> : <SpeakingPartTwo />}
    </div>
  );
};
export default SpeakingQuestion;
