import { EnumAction, EnumRank } from "../enums";

export type StreakHistory = {
  date: string;
  actionName: EnumAction;
};

export type Streak = {
  id: number;
  current: number;
  target: number;
  record: number;
  extended: boolean;
};

export type GamificationProfile = {
  id: string;
  rank: EnumRank;
  levelId: number;
  xp: number;
  carrots: number;
  level: Level;
  streak: Streak;
};

export type Level = {
  id: number;
  xp: number;
};
