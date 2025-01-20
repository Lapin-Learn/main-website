import { EnumCEFRLevel, EnumDLContentType } from "@/lib/enums";
import { Audio, Image } from "@/lib/types";

export type QuestionCard = {
  paragraph: string;
  question: string;
};

export type BaseQuestion = {
  id: string;
  explanation: string | null;
  cefrLevel: EnumCEFRLevel;
  imageId: string | null;
  image: Image | null;
  audioId: string | null;
  audio: Audio | null;
  createdAt: string;
  updatedAt: string;
};

export type MultipleChoiceContent = {
  options: string[];
  answer: number[];
};

type MultipleChoiceQuestion = BaseQuestion & {
  contentType: EnumDLContentType.MULTIPLE_CHOICE;
  content: QuestionCard & MultipleChoiceContent;
};

export type Column = "columnA" | "columnB";
export type PairAnswer = Record<Column, string[]>;
export type MatchingContent = {
  columnA: {
    title: string;
    options: string[];
  };
  columnB: {
    title: string;
    options: string[];
  };
  answer: PairAnswer[];
};

type MatchingQuestion = BaseQuestion & {
  contentType: EnumDLContentType.MATCHING;
  content: QuestionCard & MatchingContent;
};

export type FillInTheBlankContentType = FillInTheBlankContent & {
  type: "text" | "blank" | "paragraph" | "break";
  text?: string;
};

export type FillInTheBlankContent = {
  content: FillInTheBlankContentType[];
};

type FillInTheBlankQuestion = BaseQuestion & {
  contentType: EnumDLContentType.FILL_IN_THE_BLANK;
  content: QuestionCard & FillInTheBlankContent;
};

type PronunciationQuestion = BaseQuestion & {
  contentType: EnumDLContentType.PRONUNCIATION;
  content: QuestionCard;
};

export type DLQuestion =
  | MultipleChoiceQuestion
  | MatchingQuestion
  | FillInTheBlankQuestion
  | PronunciationQuestion;
