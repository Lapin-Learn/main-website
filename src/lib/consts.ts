import { EnumBandScore } from "./enums";
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
