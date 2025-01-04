import { create } from "zustand";

import { SimulatedTest, SkillTest } from "@/lib/types/simulated-test.type";

type State = {
  test: SimulatedTest | null;
  skillTest: SkillTest | null;
  open: boolean;
};

const useSelectModeDialog = create<
  State & {
    setData: (state: Partial<State>) => void;
    setOpen: (open: boolean) => void;
  }
>((set) => ({
  test: null,
  skillTest: null,
  open: false,
  setData: (newState: Partial<State>) => set((state) => ({ ...state, ...newState })),
  setOpen: (open) => set((state) => ({ ...state, open })),
}));

export default useSelectModeDialog;
