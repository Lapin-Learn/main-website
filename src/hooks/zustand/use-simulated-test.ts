import { create } from "zustand";

import { useGetSkillTestData } from "../react-query/use-simulated-test";

type State = {
  skillId: number;
  position: {
    part: number;
    question: number;
  };
};

type Action = {
  navigateToPart: (questionNo: number, partNo: number) => void;
  setCurrentQuestion: (questionNo: number) => void;
  resetTest: () => void;
};

const initialState: State = {
  skillId: 4,
  position: {
    part: 1,
    question: 1,
  },
};

const useSimulatedTestState = create<State & Action>((set, get) => ({
  ...initialState,
  navigateToPart: (questionNo, partNo) =>
    set({
      position: {
        part: partNo,
        question: questionNo,
      },
    }),
  resetTest: () => set({ ...initialState }),
  setCurrentQuestion: (questionNo) =>
    set({
      position: {
        ...get().position,
        question: questionNo,
      },
    }),
}));

const useSimulatedTestStore = () => {
  const props = useSimulatedTestState();
  const { data, isLoading, isSuccess } = useGetSkillTestData(props.skillId, props.position.part);

  return {
    ...props,
    testContent: data ?? null,
    isLoading,
    isSuccess,
  };
};

export default useSimulatedTestStore;

type AnswerState = {
  answerSheet: Record<string, string | null>;
  currentQuestion: number;
};

type AnswerAction = {
  resetAnswers: () => void;
  answer: (questionNo: number, answer: string | null) => void;
  setCurrentQuestion: (questionNo: number) => void;
};

export const useAnswerStore = create<AnswerState & AnswerAction>((set) => ({
  answerSheet: {},
  currentQuestion: 1,
  resetAnswers: () => {
    set({
      answerSheet: {},
      currentQuestion: 1,
    });
  },
  answer: (questionNo, answer) => {
    set((state) => ({
      answerSheet: { ...state.answerSheet, [questionNo]: answer?.length ? answer : null },
      currentQuestion: questionNo,
    }));
  },
  setCurrentQuestion: (questionNo) => set({ currentQuestion: questionNo }),
}));
