import { EnumBandScore, EnumSkill } from "../enums";
import type { Image } from "./common.type";

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
};
