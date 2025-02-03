import { useTranslation } from "react-i18next";

import { useSubmitSimulatedTest } from "@/hooks/react-query/use-simulated-test";
import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { EnumSimulatedTestSessionStatus, EnumSkill } from "@/lib/enums";
import { Route } from "@/routes/_authenticated/practice/simulated-test";

import { Button } from "../ui";

const SpeakingEndTest = () => {
  const { t } = useTranslation("simulatedTest");
  const { speakingSources } = useSpeakingTestState();
  const { mutate: submitTest } = useSubmitSimulatedTest();
  const { sessionId } = Route.useSearch();

  const handleSubmitSpeaking = () => {
    submitTest({
      sessionId: Number(sessionId),
      elapsedTime: 0,
      response: {
        skill: EnumSkill.speaking,
        info: [
          ...speakingSources.map(({ partNo, questionNo }) => ({
            questionNo,
            partNo,
          })),
        ],
      },
      status: EnumSimulatedTestSessionStatus.FINISHED,
      files: speakingSources.map((value) => value.file),
    });
  };

  return (
    <div className="flex w-[800px] flex-col items-center gap-10 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <div className="flex flex-col items-center gap-3">
        <p className="text-center">{t("speaking.endTestMessage")}</p>
        <p className="text-center"> {t("speaking.endTestPlayBack")}</p>
      </div>
      {/* <AudioPlayer
        className="w-full rounded-md border p-4 shadow-background"
        src={speakingSources[0].url}
      /> */}
      <Button onClick={handleSubmitSpeaking}>{t("submitBtn")}</Button>
    </div>
  );
};

export default SpeakingEndTest;
