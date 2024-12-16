import { JSONContent } from "@tiptap/core";

import { EnumMode, EnumQuestionGroup, EnumSimulatedTestSessionStatus } from "../enums";
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

export type QuestionGroup =
  | QuestionGroupMultipleChoice
  | QuestionGroupFillInBlanks
  | QuestionGroupMatchingHeadings;

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
  options: string[];
};

export type QuestionGroupFillInBlanks = BaseQuestionGroup & {
  questionType: EnumQuestionGroup.fillInBlanks;
  questions: JSONContent | object;
};

type MatchingHeadingsQuestion = {
  questionNo: number;
  question: string;
  options: string[];
};

export type QuestionGroupMatchingHeadings = BaseQuestionGroup & {
  questionType: EnumQuestionGroup.matchingHeadings;
  questions: MatchingHeadingsQuestion[];
};

export type ReadingContent = {
  // type: EnumSkill.reading;
  part: number;
  startQuestionNo: number;
  endQuestionNo: number;
  content: JSONContent;
  questionGroups: QuestionGroup[];
};

type PartDetail = {
  questionTypes: string[];
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
  responses: object;
  results: object;
  skillTestId: number;
  status: EnumSimulatedTestSessionStatus;
  timeLimit: number;
};
