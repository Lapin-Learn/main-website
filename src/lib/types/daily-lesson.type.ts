import { EnumBandScore, EnumMileStone, EnumMissionStatus, EnumRank, EnumSkill } from "../enums";
import type { Image } from "./common.type";
import { Quest, QuestType } from "./mission.type";
import { Level } from "./user.type";

export type QuestionTypeProgress = {
  bandScore: EnumBandScore;
  totalLearningXP: number;
};

export type DailyLesson = {
  id: number;
  name: string;
  order: number;
  bandScore: EnumBandScore;
};

export type QuestionType = {
  id: number;
  name: string;
  skill: EnumSkill;
  imageId: string | null; // The image ID to update via bucket service
  image: Image | null; // The image URL
  updatedAt: string;
  lessons: number;
};

export type LessonResult = {
  lessonId: number;
  bonusCarrot: number;
  bonusXP: number;
  correctAnswers: number;
  wrongAnswers: number;
  duration: number;
  milestones: Milestone[];
};

export type Instruction = {
  id: string;
  content: string;
  order: number;
  imageId: string;
  audioId: string;
  questionTypeId: number;
  image?: string;
  audio?: string;
};

export type Milestone = {
  type: EnumMileStone;
  newValue: Level | EnumRank | number | MissionMilestone[];
};

export type MissionMilestone = {
  current: number;
  id: string;
  mission: {
    id: string;
    quantity: number;
    quest: Quest;
    type: QuestType;
  };
  missionId: string;
  status: EnumMissionStatus;
};

export type SpeakingServiceResponse = {
  correct_letters: number[];
  original_ipa_transcript: string;
  original_transcript: string;
  pronunciation_accuracy: string;
  voice_ipa_transcript: string;
  voice_transcript: string;
};
