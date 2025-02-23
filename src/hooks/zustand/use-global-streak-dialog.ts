import { create } from "zustand";

type State = {
  open: boolean;
};

type Action = {
  setOpenDialog: () => void;
  setCloseDialog: () => void;
};

const useGlobalStreakDialog = create<State & Action>((set) => ({
  open: false,
  setOpenDialog: () => set({ open: true }),
  setCloseDialog: () => set({ open: false }),
}));

export default useGlobalStreakDialog;
