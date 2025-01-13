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

  if (part === 2) {
    return <SpeakingPartTwo {...props} />;
  }
  return <SpeakingPartOneAndThree {...props} />;
};

export default SpeakingQuestion;
