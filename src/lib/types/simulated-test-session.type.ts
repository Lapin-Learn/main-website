import { EnumMode, EnumSimulatedTestSessionStatus, EnumSkill } from "../enums";
import {
  PartDetail,
  SimulatedTestAnswer,
  SimulatedTestSimple,
  SkillTestGuidance,
  STCriteriaEvaluation,
  STSkillTestAnswer,
} from "./simulated-test.type";

type BaseSTSession = {
  elapsedTime: number;
  estimatedBandScore: number | null;
  id: number;
  learnerProfileId: string;
  mode: EnumMode;
  parts: number[];
  status: EnumSimulatedTestSessionStatus;
  timeLimit: number;
  updatedAt: Date;
};

type ReadingListeningSession = BaseSTSession & {
  skillTest: {
    id: number;
    skill: EnumSkill.reading | EnumSkill.listening;
    partsDetail: PartDetail[];
    simulatedIeltsTest: Pick<SimulatedTestSimple, "id" | "testName">;
    answers: STSkillTestAnswer[];
    guidances: SkillTestGuidance[];
  };
  results: boolean[];
  responses: SimulatedTestAnswer[];
};

type WritingSession = BaseSTSession & {
  skillTest: {
    id: number;
    skill: EnumSkill.writing;
    partsDetail: PartDetail[];
    simulatedIeltsTest: Pick<SimulatedTestSimple, "id" | "testName">;
  };
  results: STCriteriaEvaluation[];
  responses: SimulatedTestAnswer[];
};

type SpeakingSession = BaseSTSession & {
  skillTest: {
    id: number;
    skill: EnumSkill.speaking;
    partsDetail: PartDetail[];
    simulatedIeltsTest: Pick<SimulatedTestSimple, "id" | "testName">;
  };
  results: STCriteriaEvaluation[];
  responses: {
    questionNo: number;
    partNo: number;
  }[];
};

export type { BaseSTSession, ReadingListeningSession, SpeakingSession, WritingSession };
