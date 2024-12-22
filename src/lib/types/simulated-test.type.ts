import { JSONContent } from "@tiptap/core";

import { EnumMode, EnumQuestionGroup, EnumSimulatedTestSessionStatus } from "../enums";
import { EnumSkill } from "../enums";
import { Option } from "./common.type";

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
  content: JSONContent | string;
  questionGroups: QuestionGroup[];
};

export type PartDetail = {
  questionTypes: string[];
  startQuestionNo: number;
  endQuestionNo: number;
};

export type SkillTest = {
  id: number;
  skill: EnumSkill;
  partsDetail: PartDetail[];
};

export type SimulatedTest = Omit<SimulatedTestSimple, "collectionId"> & {
  skillTests: SkillTest[];
};

export type SimulatedTestSession = {
  elapsedTime: number;
  estimatedBandScore: number | null;
  id: number;
  learnerProfileId: string;
  mode: EnumMode;
  parts: number[];
  responses: SimulatedTestAnswer[];
  skillTest: SkillTest & {
    simulatedIeltsTest: Pick<SimulatedTestSimple, "id" | "testName">;
  };
  status: EnumSimulatedTestSessionStatus;
  timeLimit: number;
};

export type SimulatedTestAnswer = {
  questionNo: number;
  answer: string | null;
};
