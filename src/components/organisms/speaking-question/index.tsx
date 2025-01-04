import { Fragment } from "react";

import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { SpeakingContent } from "@/lib/types/simulated-test.type";

import SpeakingPartOneAndThree from "./speaking-part-one-and-three";
import SpeakingPartTwo from "./speaking-part-two";

export type SpeakingQuestionProps = {
  content: SpeakingContent;
  audioSrc?: string;
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
