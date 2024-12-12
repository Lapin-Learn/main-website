import { create } from "zustand";

import { EnumSkill } from "@/lib/enums";
import { SimulatedTestSimple } from "@/lib/types/simulated-test.type";

type State = {
  test: SimulatedTestSimple | null;
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
  skill: EnumSkill.reading,
  open: false,
  setData: (newState: Omit<State, "open">) => set((state) => ({ ...newState, state })),
  setOpen: (open) => set((state) => ({ ...state, open })),
}));

export default useSelectModeDialog;
