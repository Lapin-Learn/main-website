import { create } from "zustand";

import { SkillTestGuidance, STSkillTestAnswer } from "@/lib/types/simulated-test.type";

type ResultState = {
  answerKeys: STSkillTestAnswer[];
  guidances: SkillTestGuidance[];
  status: boolean[];
};

type ResultActions = {
  setAnswerKeys: (answerKeys: STSkillTestAnswer[]) => void;
  setGuidances: (guidances: SkillTestGuidance[]) => void;
  setStatus: (status: boolean[]) => void;
  reset: () => void;
};

const initialState: ResultState = {
  answerKeys: [],
  guidances: [],
  status: [],
};

export const useResult = create<ResultState & ResultActions>((set) => ({
  ...initialState,
  setAnswerKeys: (answerKeys) => set({ answerKeys }),
  setGuidances: (guidances) => set({ guidances }),
  setStatus: (status) => set({ status }),
  reset: () => set(initialState),
}));
