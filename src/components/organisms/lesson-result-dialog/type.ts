import { EnumBandScore, EnumMileStone, EnumRank } from "@/lib/enums";
import { Mission } from "@/lib/types/mission.type";

type LevelRankProps = {
  type: EnumResultStepper.LEVEL_RANK;
  value: {
    level: number;
    rank: EnumRank | null;
  };
};

type ResultProps = {
  type: EnumResultStepper.RESULT;
  value: {
    percent: number;
    exp: number;
    carrot: number;
    timer: string;
  };
};

type MissionProps = {
  type: EnumResultStepper.MISSION_COMPLETED;
  value: Mission[];
};

type StreakProps = {
  type: EnumResultStepper.DAILY_STREAK;
  value: number;
};

type BandScoreProps = {
  type: EnumResultStepper.BAND_SCORE_UP;
  value: EnumBandScore;
};

enum EnumResultStepper {
  RESULT = "result",
  LEVEL_RANK = "level_rank",
  MISSION_COMPLETED = EnumMileStone.MISSION_COMPLETED,
  DAILY_STREAK = EnumMileStone.DAILY_STREAK,
  BAND_SCORE_UP = EnumMileStone.BAND_SCORE_UP,
  END = "end",
}

type StepperProps = ResultProps | LevelRankProps | MissionProps | StreakProps | BandScoreProps;

type ResultStepperContextType = {
  currentStep: EnumResultStepper;
  currentStepValue: StepperProps;
  nextMilestone: VoidFunction;
};

export { EnumResultStepper };
export type { LevelRankProps, ResultProps, ResultStepperContextType, StepperProps };
