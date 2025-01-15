import { JSONContent } from "@tiptap/core";

import { EnumQuestionGroup, EnumSkill, EnumSpeakingCriteria, EnumWritingCriteria } from "../enums";
import { Option } from "./common.type";
import type {
  ReadingListeningSession,
  SpeakingSession,
  WritingSession,
} from "./simulated-test-session.type";

export type BandScoreSkill = {
  bandScore: number;
  skill: EnumSkill;
};
export type UserBandScoreOverall = {
  bandScores: BandScoreSkill[];
  overallBandScore: number | null;
};

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

export type QuestionGroup =
  | QuestionGroupMultipleChoice
  | QuestionGroupFillInBlanks
  | QuestionGroupMatchingHeadings
  | QuestionGroupMatchingInformation;

type BaseQuestionGroup = {
  part: number;
  questionCard: string;
  startQuestionNo: number;
  endQuestionNo: number;
};

export type QuestionGroupMultipleChoice = BaseQuestionGroup & {
  questionType: EnumQuestionGroup.multipleChoice;
  questions: MultipleChoiceQuestion[];
};

type MultipleChoiceQuestion = {
  questionNo: number[];
  question: string;
  options: Option[];
};

export type QuestionGroupFillInBlanks = BaseQuestionGroup & {
  questionType: EnumQuestionGroup.fillInBlanks;
  questions: JSONContent | object;
};

type MatchingHeadingsQuestion = {
  questionNo: number;
  question: string;
  options: Option[];
};

export type QuestionGroupMatchingHeadings = BaseQuestionGroup & {
  questionType: EnumQuestionGroup.matchingHeadings;
  questions: MatchingHeadingsQuestion[];
};

export type QuestionGroupMatchingInformation = BaseQuestionGroup & {
  questionType: EnumQuestionGroup.matchingInformation;
  questionDescription: string | JSONContent | object;
  options: Option[];
  questions: {
    questionNo: number;
    question: string;
  }[];
};

// _____________________________________________________________________________
export type ReadingContent = {
  part: number;
  startQuestionNo: number;
  endQuestionNo: number;
  content: JSONContent | string | string[];
  questionGroups: QuestionGroup[];
};

export type SpeakingContent = {
  part: number;
  heading?: string;
  content: string[];
};

export type PartDetail = {
  questionTypes: string[];
  startQuestionNo: number;
  endQuestionNo: number;
  questionTypesIndices: {
    name: string;
    endIndex: number;
    startIndex: number;
  }[];
};

export type SkillTest = {
  id: number;
  skill: EnumSkill;
  partsDetail: PartDetail[];
};

export type SimulatedTest = SimulatedTestSimple & {
  skillTests: SkillTest[];
};

export type SimulatedTestSession = WritingSession | ReadingListeningSession | SpeakingSession;

export type SimulatedTestAnswer = {
  questionNo: number;
  answer: string | null;
};

export type STSkillTestAnswer = {
  type: "exact" | "variant";
  valid: string;
  variants?: string[];
};

export type STSkillPageProps = {
  skillTestId: number;
  sessionId: number;
};

export type SkillTestGuidance = {
  explanationInText: string;
  explanationResource: string;
  tip: string;
};

export type SimulatedTestSessionsHistory = Pick<
  SimulatedTestSession,
  "id" | "elapsedTime" | "estimatedBandScore" | "mode"
> &
  Pick<SimulatedTestSimple, "testName"> & {
    totalQuestions: number;
    skill: EnumSkill;
    createdAt: Date;
  };

export type AnalysisData = {
  name: string;
  answers: {
    rightOnTotal: string;
    unanswered: string;
  };
  accuracy: number;
  questions: {
    questionNo: number;
    status: boolean;
    guidance: SkillTestGuidance | null;
  }[];
};

export type STCriteriaEvaluation = {
  part?: string | "Overall";
  score?: number;
} & {
  [key in EnumWritingCriteria | EnumSpeakingCriteria]?: {
    score: number;
    evaluate: string;
  };
};
