import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import RecordingButton from "@/components/molecules/recording-button";
import { Button } from "@/components/ui";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { SpeakingContent } from "@/lib/types/simulated-test.type";

type SpeakingQuestionProps = {
  content: SpeakingContent;
  audioSrc: string;
};

const formatPartTwoContent = (content: string) => {
  const [question, details] = content.split("You should say:\n-");
  const detailItems = details.split("\n- ").filter((item) => item);

  return (
    <>
      <h5 className="text-center text-heading-5 font-semibold">{question}</h5>
      <ul className="list-inside list-disc">
        <p>You should say:</p>
        {detailItems.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </>
  );
};

const SpeakingPartOneAndThree = ({ content, audioSrc }: SpeakingQuestionProps) => {
  const {
    position: { part: currentPart, question },
    navigateToPart,
    speakingSources,
  } = useSpeakingTestState();
  const { stopRecording } = useAudioRecording();
  const { setTestState } = useRecordingStore();
  const { t } = useTranslation("simulatedTest");

  const handleNextQuestion = () => {
    stopRecording();
    switch (currentPart) {
      case 1:
        if (question === content.part1.length) {
          if (content.part2) {
            navigateToPart(1, 2);
          } else if (content.part3) {
            navigateToPart(1, 3);
          } else {
            setTestState(EnumSimulatedTestSessionStatus.FINISHED);
            console.log(speakingSources);
            alert("End of test");
          }
        } else {
          navigateToPart(question + 1, 1);
        }
        break;
      case 3:
        if (question === content.part3.length) {
          setTestState(EnumSimulatedTestSessionStatus.FINISHED);
          console.log(speakingSources);
          alert("End of test");
        } else {
          navigateToPart(question + 1, 3);
        }
        break;
      default:
        break;
    }
  };

  const getNextButtonText = () => {
    if (currentPart === 1 && question === content.part1.length) {
      if (content.part2) {
        return "Part 2";
      } else if (content.part3) {
        return "Part 3";
      } else {
        return t("speaking.endTest");
      }
    } else if (currentPart === 3 && question === content.part3.length) {
      return t("speaking.endTest");
    } else {
      return t("nextQuestion");
    }
  };

  return (
    <div className="flex w-[800px] flex-col items-center gap-10 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-heading-5 font-semibold">{`Question ${question}`}</h4>
        <p className="text-center">
          {currentPart === 1 && content.part1[question - 1]}
          {currentPart === 3 && content.part3[question - 1]}
        </p>
      </div>
      <RecordingButton onStop={handleNextQuestion} duration={30} />
      <Button
        type="button"
        variant={question === content.part1.length ? "default" : "ghost"}
        className="w-full flex-1 sm:w-fit"
        onClick={handleNextQuestion}
      >
        <div className="flex items-center gap-2">
          {getNextButtonText()}
          <ArrowRight className="size-4" />
        </div>
      </Button>
    </div>
  );
};

const SpeakingPartTwo = ({ content, audioSrc }: SpeakingQuestionProps) => {
  const { navigateToPart, speakingSources } = useSpeakingTestState();
  const { stopRecording } = useAudioRecording();
  const { setTestState } = useRecordingStore();
  const { t } = useTranslation("simulatedTest");

  const handleNextPart = () => {
    stopRecording();
    if (content.part3) {
      navigateToPart(1, 3);
    } else {
      setTestState(EnumSimulatedTestSessionStatus.FINISHED);
      console.log(speakingSources);
      alert("End of test");
    }
  };

  return (
    <div className="grid w-[880px] grid-cols-12 gap-6">
      <div className="col-span-8 flex flex-col justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-12">
        {formatPartTwoContent(content.part2[0])}
      </div>
      <div className="col-span-4 flex flex-col items-center justify-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white p-10">
        <p className="text-center">{t("speaking.preparePartTwo")}</p>
        <div className="relative h-full w-fit overflow-visible">
          <RecordingButton onStop={handleNextPart} duration={120} />
        </div>
        <Button type="button" className="w-full flex-1 sm:w-fit" onClick={handleNextPart}>
          <div className="flex items-center gap-2">
            {content.part3 ? "Part 3" : t("speaking.endTest")}
            <ArrowRight className="size-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};

const SpeakingQuestion = ({ content, audioSrc }: SpeakingQuestionProps) => {
  const {
    position: { part },
  } = useSpeakingTestState();

  return (
    <Fragment>
      {part === 1 || part === 3 ? (
        <SpeakingPartOneAndThree content={content} audioSrc={audioSrc} />
      ) : (
        <SpeakingPartTwo content={content} audioSrc={audioSrc} />
      )}
    </Fragment>
  );
};
export default SpeakingQuestion;
