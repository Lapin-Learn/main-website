import { EnumSkill } from "../enums";

export type SimulatedTestCollection = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  thumbnail: string | null;
  testCount: number;
  simulatedIeltsTests: SimulatedTestSimple[];
};

export type SimulatedTestSimple = {
  id: number;
  collectionId: number;
  order: string;
  testName: string;
};

type PartDetail = {
  questionTypes: string[];
};

type SkillTest = {
  id: number;
  skill: EnumSkill;
  partsDetail: PartDetail[];
};

export type SimulatedTest = Omit<SimulatedTestSimple, "collectionId"> & {
  skillTests: SkillTest[];
};
