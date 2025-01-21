import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

import { assertFallback } from "@/lib/utils";

import { ExtendedSpeakingResponse } from "../organisms/speaking-submission/helpers";
import { useSpeakingResource } from "../organisms/speaking-submission/SpeakingResource";
import FakeAudioPlayer from "./fake-audio-player";

type SpeakingSingleQuestionSubmissionProps = {
  question: string;
  no: number;
  partNo: number;
  submission: ExtendedSpeakingResponse | null;
};

function SpeakingSingleQuestionSubmission(props: SpeakingSingleQuestionSubmissionProps) {
  const { question, no, partNo, submission } = props;
  const { t } = useTranslation("simulatedTest");
  const {
    volume,
    setVolume,
    isPlaying,
    setIsPlaying,
    isCanPlayThrough,
    playAudio,
    pauseAudio,
    currentTime,
  } = useSpeakingResource();
  const isBeforeCurrentTime = currentTime < assertFallback(submission?.start, 0);
  const isAfterCurrentTime = currentTime > assertFallback(submission?.end, 0);
  const isCurrentQuestion =
    currentTime >= assertFallback(submission?.start, 0) &&
    currentTime <= assertFallback(submission?.end, 0);
  const fakeDuration = assertFallback(submission?.end, 0) - assertFallback(submission?.start, 0);

  const getFakeCurrentTime = () => {
    if (isBeforeCurrentTime) return 0;
    if (isAfterCurrentTime) return fakeDuration;
    return currentTime - assertFallback(submission?.start, 0);
  };

  const handleChangeVolume = (volume: number[]) => {
    setVolume(volume[0]);
  };
  const handleChangeCurrentTime = (currentTime: number[]) => {
    playAudio({
      question: no,
      part: partNo,
      realTimestamp: currentTime[0] + assertFallback(submission?.start, 0),
    });
  };
  const handlePlay = () => {
    setIsPlaying(true);
    playAudio({
      question: no,
      part: partNo,
      realTimestamp: isCurrentQuestion ? undefined : assertFallback(submission?.start, 0),
    });
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {partNo == 2 ? (
        <>
          <strong>
            {t("question", { ns: "common" })} {no}:
          </strong>
          <p>{parse(question)}</p>
        </>
      ) : (
        <p>
          <strong>
            {t("question", { ns: "common" })} {no}:
          </strong>
          &nbsp;{question}
        </p>
      )}
      {submission ? (
        <>
          <FakeAudioPlayer
            className="rounded-lg border px-5 py-3"
            volume={volume}
            onChangeVolume={handleChangeVolume}
            onChangeCurrentTime={handleChangeCurrentTime}
            onPause={pauseAudio}
            onPlay={handlePlay}
            duration={fakeDuration}
            disabled={!isCanPlayThrough}
            isPlaying={isPlaying && isCurrentQuestion}
            currentTime={getFakeCurrentTime()}
          />
          {/* Transcript, calling browser API */}
          {/* <div className="border-l-2 border-neutral-100 pl-4">
            <p className="text-neutral-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div> */}
        </>
      ) : (
        <div className="grid h-20 place-items-center italic text-muted-foreground">
          {t("result.unanswered")}
        </div>
      )}
    </div>
  );
}

export default SpeakingSingleQuestionSubmission;
