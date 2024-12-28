import { EnumBandScore, EnumQuestionGroup, EnumSkill } from "./enums";
import { EnumQuestion } from "./types/question.type";

export const BAND_SCORES = {
  [EnumBandScore.PRE_IELTS]: "Pre IELTS",
  [EnumBandScore.BAND_45]: "Band 4.5",
  [EnumBandScore.BAND_5]: "Band 5.0",
  [EnumBandScore.BAND_55]: "Band 5.5",
  [EnumBandScore.BAND_6]: "Band 6.0",
  [EnumBandScore.BAND_65]: "Band 6.5",
  [EnumBandScore.BAND_7]: "Band 7.0",
};

export const CONTENT_TYPE_OPTIONS = [
  { value: EnumQuestion.MultipleChoice, label: "Multiple choice" },
  { value: EnumQuestion.FillInTheBlank, label: "Fill in the blanks" },
  { value: EnumQuestion.Matching, label: "Matching" },
];

export const DEFAULT_PAGE_SIZE = 10;

export const SIMULATED_TEST_TAGS = [
  {
    labelKey: "academic",
    value: "Academic",
  },
  {
    labelKey: "cambridge",
    value: "Cambridge",
  },
  {
    labelKey: "forecast",
    value: "Forecast",
  },
  {
    labelKey: "actual",
    value: "Actual",
  },
  {
    labelKey: "britishcouncil",
    value: "British Council",
  },
];

export const MAPPED_SIMULATED_TEST_TAGS: Record<string, string> = {
  Academic: "academic",
  Cambridge: "cambridge",
  Forecast: "forecast",
  Actual: "actual",
  "British Council": "britishcouncil",
};

export const DEFAULT_TIME_LIMIT: Record<EnumSkill, number> = {
  [EnumSkill.reading]: 60,
  [EnumSkill.listening]: 40,
  [EnumSkill.writing]: 60,
  [EnumSkill.speaking]: 15,
};

export const DEFAULT_QUESTION_NO_BY_SKILL: Record<
  EnumSkill,
  Record<string, { startQuestionNo: number; endQuestionNo: number }> | undefined
> = {
  [EnumSkill.listening]: {
    "1": {
      startQuestionNo: 1,
      endQuestionNo: 10,
    },
    "2": {
      startQuestionNo: 11,
      endQuestionNo: 20,
    },
    "3": {
      startQuestionNo: 21,
      endQuestionNo: 30,
    },
    "4": {
      startQuestionNo: 31,
      endQuestionNo: 40,
    },
  },
  [EnumSkill.reading]: {
    "1": {
      startQuestionNo: 1,
      endQuestionNo: 13,
    },
    "2": {
      startQuestionNo: 14,
      endQuestionNo: 26,
    },
    "3": {
      startQuestionNo: 27,
      endQuestionNo: 40,
    },
  },
  [EnumSkill.writing]: {
    "1": {
      startQuestionNo: 1,
      endQuestionNo: 1,
    },
    "2": {
      startQuestionNo: 2,
      endQuestionNo: 2,
    },
  },
  [EnumSkill.speaking]: undefined,
};

export const MAPPED_QUESTION_TYPE_LABELS = {
  [EnumQuestionGroup.fillInBlanks]: "Fill in the blanks",
  [EnumQuestionGroup.matchingInformation]: "Matching information",
  [EnumQuestionGroup.multipleChoice]: "Multiple choice",
  [EnumQuestionGroup.matchingHeadings]: "Matching headings",
};

// export const MAPPED_QUESTION_TYPE_GROUPS = {
//   [EnumQuestionGroup.fillInBlanks]: EnumQuestionGroup.fillInBlanks,
//   [EnumQuestionGroup.matchingInformation]: EnumQuestionGroup.matchingInformation,
//   [EnumQuestionGroup.TFNG]: EnumQuestionGroup.fillInBlanks,
//   [EnumQuestionGroup.multipleChoice]: EnumQuestionGroup.fillInBlanks,
//   [EnumQuestionGroup.matchingHeadings]: EnumQuestionGroup.matchingHeadings,

// }

export const WRITING_INSTRUCTIONS = [
  {
    title: "Part 1",
    content: "You should spend about 20 minutes on this task. Write at least 150 words.",
  },
  {
    title: "Part 2",
    content: "You should spend about 40 minutes on this task. Write at least 250 words.",
  },
];
