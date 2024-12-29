import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
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
    <div className="flex w-[800px] flex-col items-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <h4 className="text-heading-5 font-semibold">{`Question ${question}`}</h4>
      <RecordingButton duration={30} />
      <Button type="button" variant="ghost" className="w-full flex-1 sm:w-fit">
        <div className="flex items-center gap-2">
          {t("nextQuestion")}
          <ArrowRight className="size-4" />
        </div>
      </Button>
    </div>
  );
};

const SpeakingPartTwo = () => {
  const { t } = useTranslation("simulatedTest");
  const content = {
    question: "Describe a person you like to work or study with",
    details: [
      "Who this person is",
      "How long have you known this person",
      "How you met",
      "Why you want to work or study with this person",
    ],
  };

  return (
    <div className="flex w-[880px] gap-6">
      <div className="flex flex-col items-center justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
        <h5 className="text-center text-heading-5 font-semibold">{content.question}</h5>
        <ul className="list-inside list-disc">
          <p>You should say:</p>
          {content.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
        <p>{t("speaking.preparePartTwo")}</p>
        <RecordingButton duration={60} />
        <Button type="button" variant="ghost" className="w-full flex-1 sm:w-fit">
          <div className="flex items-center gap-2">
            {t("nextQuestion")}
            <ArrowRight className="size-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};

const SpeakingQuestion = () => {
  const {
    position: { part },
  } = useSimulatedTestState();

  return (
    <Fragment>
      {part === 1 || part === 3 ? <SpeakingPartOneAndThree /> : <SpeakingPartTwo />}
    </Fragment>
  );
};
export default SpeakingQuestion;
