import { create } from "zustand";

import mockReadingContent from "@/lib/mock/mock-reading-content";
import { ReadingContent } from "@/lib/types/simulated-test.type";

import { useGetSkillTestData } from "./react-query/use-simulated-test";

type State = {
  skillId: number;
  currentPart: number;
  currentQuestion: number;
  answerSheet: Record<string, string | null>;
  testContent: ReadingContent | null;
};

type Action = {
  navigateToPart: (questionNo: number, partNo: number) => void;
  setAnswer: (question: number, answer: string) => void;
  clearAnswer: (question: number) => void;
  resetTest: () => void;
};

const initialState: State = {
  skillId: 4,
  currentPart: 0,
  currentQuestion: 1,
  answerSheet: {},
  testContent: null,
};

const useSimulatedTestState = create<State & Action>((set) => ({
  ...initialState,
  navigateToPart: (questionNo, partNo) =>
    set({
      currentPart: partNo,
      currentQuestion: questionNo,
      testContent: mockReadingContent.find((content) => content.part === partNo) || null,
    }),
  setAnswer: (question, answer) =>
    set((state) => ({ answerSheet: { ...state.answerSheet, [question]: answer } })),
  clearAnswer: (question) =>
    set((state) => ({ answerSheet: { ...state.answerSheet, [question]: null } })),
  resetTest: () => set({ ...initialState }),
}));

const useSimulatedTest = () => {
  const { testContent, ...props } = useSimulatedTestState();
  const {
    data: testContent2,
    isLoading,
    isSuccess,
  } = useGetSkillTestData(props.skillId, props.currentPart);
  return {
    ...props,
    testContent: testContent2 ?? null,
    isLoading,
    isSuccess,
  };
};
export default useSimulatedTest;
