import { create } from "zustand";

type State = {
  currentPart: number;
  currentQuestion: number;
  answerSheet: Record<string, string | null>;
};

type Action = {
  navigateToPart: (questionNo: number, partNo: number) => void;
  setAnswer: (question: number, answer: string) => void;
  clearAnswer: (question: number) => void;
  resetTest: () => void;
};

const initialState: State = {
  currentPart: 0,
  currentQuestion: 1,
  answerSheet: {
    "30": "a",
  },
};

const useSimulatedTest = create<State & Action>((set) => ({
  ...initialState,
  navigateToPart: (questionNo, partNo) => set({ currentPart: partNo, currentQuestion: questionNo }),
  setAnswer: (question, answer) =>
    set((state) => ({ answerSheet: { ...state.answerSheet, [question]: answer } })),
  clearAnswer: (question) =>
    set((state) => ({ answerSheet: { ...state.answerSheet, [question]: null } })),
  resetTest: () => set({ ...initialState }),
}));

export default useSimulatedTest;
