import { create } from "zustand";

import { Milestone } from "@/lib/types/daily-lesson.type";

type MilestoneState = {
  milestones: Milestone[];
};

type MilestoneActions = {
  setMilestones: (milestones: Milestone[]) => void;
};

type MilestoneStore = MilestoneState & MilestoneActions;

export const useMilestoneStore = create<MilestoneStore>((set) => ({
  milestones: [],
  setMilestones: (milestones: Milestone[]) => {
    const filteredMilestones = milestones.filter(
      (milestone) => milestone.type !== "band_score_question_type_up"
    );
    set({ milestones: filteredMilestones });
  },
}));
