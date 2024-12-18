import { create } from "zustand";

import { EnumSkill } from "@/lib/enums";
import { SimulatedTest, SkillTest } from "@/lib/types/simulated-test.type";

type State = {
  test: SimulatedTest | null;
  skillTest: SkillTest | null;
  skill: EnumSkill;
  open: boolean;
};

const useSelectModeDialog = create<
  State & {
    setData: (state: Omit<State, "open">) => void;
    setOpen: (open: boolean) => void;
  }
>((set) => ({
  test: null,
  skillTest: null,
  skill: EnumSkill.reading,
  open: false,
  setData: (newState: Omit<State, "open">) => set((state) => ({ ...newState, state })),
  setOpen: (open) => set((state) => ({ ...state, open })),
}));

export default useSelectModeDialog;
