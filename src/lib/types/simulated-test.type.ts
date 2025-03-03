import { JSONContent } from "@tiptap/core";

import {
  EnumMode,
  EnumQuestionGroup,
  EnumSimulatedTestSessionStatus,
  EnumSkill,
  EnumSpeakingCriteria,
  EnumWritingCriteria,
} from "../enums";
import { Option } from "./common.type";
import type {
  ReadingListeningSession,
  SpeakingSession,
  WritingSession,
} from "./simulated-test-session.type";

export type BandScoreSkill = {
  estimatedBandScore: number;
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
  simulatedIeltsTests: Partial<SimulatedTestSimple>[];
};

export type SimulatedTestSimple = {
  id: number;
  collectionId: number;
  order: string;
  testName: string;
  totalTimeSpent: number;
  status: EnumSimulatedTestSessionStatus;
  estimatedBandScore: number | null;
};

export type QuestionGroup =
  | QuestionGroupMultipleChoice
  | QuestionGroupFillInBlanks
  | QuestionGroupMatchingHeadings
  | QuestionGroupMatchingInformation;

type BaseQuestionGroup = {
  questionCard: string;
  startQuestionNo: number;
  endQuestionNo: number;
  imageSrc?: string; // Additonal image
  questionDescription?: string; // HTML string
  options?: Option[];
};

export type QuestionGroupMultipleChoice = BaseQuestionGroup & {
  questionType: EnumQuestionGroup.multipleChoice | EnumQuestionGroup.TFNG | EnumQuestionGroup.YNNG;
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
  questionType:
    | EnumQuestionGroup.matchingHeadings
    | EnumQuestionGroup.matchingInformationToParagraph;
  questions: MatchingHeadingsQuestion[];
  numberOfParagraphs?: number;
};

export type QuestionGroupMatchingInformation = BaseQuestionGroup & {
  questionType: EnumQuestionGroup.matchingInformation;
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
  startQuestionNo: number;
  endQuestionNo: number;
  questionTypesIndices: {
    name: string;
    endIndex: number;
    startIndex: number;
  }[];
  part?: number;
};

export type SkillTest = {
  skillTestId: number;
  skill: EnumSkill;
  partsDetail: PartDetail[];
  status: EnumSimulatedTestSessionStatus;
  submittedAnswers: number;
  estimatedBandScore: number | null;
  correctAnswers: number;
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
  "id" | "elapsedTime" | "estimatedBandScore" | "mode" | "status"
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
  part: number | string;
  criterias: {
    [key in EnumWritingCriteria | EnumSpeakingCriteria]?: {
      score: number;
      evaluate: STCriteriaEvaluationResponse[];
    };
  };
};

export type STCriteriaEvaluationResponse = {
  correction: string;
  error: string;
  explanation: string;
  highlight: string[];
};

export type QuestionTypeAccuracy = {
  evaluationtype: string;
  accuracy: number;
};

export type SessionProgress = {
  estimatedBandScore: number;
  createdAt: string;
};

export type LatestInprogressSession = {
  sessionId: number;
  mode: EnumMode;
  status: EnumSimulatedTestSessionStatus;
  parts: number[];
  skill: EnumSkill;
  testName: string;
  testCollectionName: string;
};

export type BlogResponse = {
  items: Blog[];
  page: number;
  total: number;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  thumbnailId: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: {
    id: string;
    name: string;
    owner: string;
    permission: string;
    createdAt: string;
    updatedAt: string;
    uploadStatus: string;
    url: string;
  };
};
