import { create } from "zustand";

type State = {
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

export default useSimulatedTestState;

type AnswerState = {
  answerSheet: Record<string, string | null>;
  currentQuestion: number;
  elapsedTime: number;
};

type AnswerAction = {
  resetAnswers: () => void;
  answer: (questionNo: number, answer: string | null) => void;
  setCurrentQuestion: (questionNo: number) => void;
  setElapsedTime: (time: number) => void;
  loadAllAnswer: (answers: Record<string, string | null>) => void;
};

export const useAnswerStore = create<AnswerState & AnswerAction>((set) => ({
  answerSheet: {},
  currentQuestion: 1,
  elapsedTime: 0,
  resetAnswers: () => {
    set({
      answerSheet: {},
      currentQuestion: 1,
      elapsedTime: 0,
    });
  },
  answer: (questionNo, answer) => {
    set((state) => ({
      answerSheet: { ...state.answerSheet, [questionNo]: answer?.length ? answer : null },
      currentQuestion: questionNo,
    }));
  },
  setCurrentQuestion: (questionNo) => set({ currentQuestion: questionNo }),
  setElapsedTime: (time) => set({ elapsedTime: time }),
  loadAllAnswer: (answers) => set({ answerSheet: answers }),
}));
