import { Fragment } from "react";

import { useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";
import { SimulatedTestSession, SpeakingContent } from "@/lib/types/simulated-test.type";

import SpeakingPartOneAndThree from "./speaking-part-one-and-three";
import SpeakingPartTwo from "./speaking-part-two";

export type SpeakingQuestionProps = {
  content?: SpeakingContent;
  session: SimulatedTestSession;
  audioSrc?: string;
};

const SpeakingQuestion = (props: SpeakingQuestionProps) => {
  const {
    position: { part },
  } = useSpeakingTestState();

  return (
    <Fragment>
      {part === 1 || part === 3 ? (
        <SpeakingPartOneAndThree {...props} />
      ) : (
        <SpeakingPartTwo {...props} />
      )}
    </Fragment>
  );
};
export default SpeakingQuestion;
