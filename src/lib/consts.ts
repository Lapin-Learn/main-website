import CarrotBasket from "@/assets/carrot-basket.svg";
import icons from "@/assets/icons";
import AllSkillsIcon from "@/assets/icons/skills/all";
import ListeningIcon from "@/assets/icons/skills/listening";
import ReadingIcon from "@/assets/icons/skills/reading";
import SpeakingIcon from "@/assets/icons/skills/speaking";
import WritingIcon from "@/assets/icons/skills/writing";
import { Shop } from "@/lib/types/shop.type.ts";

import {
  EnumBandScore,
  EnumDLContentType,
  EnumItemShop,
  EnumQuestionGroup,
  EnumSkill,
  EnumSpeakingCriteria,
  EnumWritingCriteria,
  ExtendEnumSkill,
} from "./enums";

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
  { value: EnumDLContentType.MULTIPLE_CHOICE, label: "Multiple choice" },
  { value: EnumDLContentType.FILL_IN_THE_BLANK, label: "Fill in the blanks" },
  { value: EnumDLContentType.MATCHING, label: "Matching" },
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

export const MIC_TEST_DURATION = 10;
export const NEXT_QUESTION_COUNT_DOWN = 3;
export const SPEAKING_PART_ONE_AND_THREE_DURATION = 30 * 1000; //5 * 60 * 1000
export const SPEAKING_PART_TWO_PREPARE_DURATION = 10; //1 * 60
export const SPEAKING_PART_TWO_DURATION = 20 * 1000; //2 * 60 * 1000

export const PART_TITLES: { [key: number]: string } = {
  1: "PART 1: INSTRUCTION AND INTERVIEW",
  2: "PART 2: TOPIC",
  3: "PART 3: TOPIC DISCUSSION",
};

export const PART_INSTRUCTIONS: { [key: number]: string[] } = {
  1: [
    "In this first part, the examiner will ask you some questions about yourself.",
    "DO NOT give out real personal information on your answers.",
  ],
  2: [
    "In this part you will be given a topic and you have 1-2 minutes to talk about it.",
    "Before you talk, you have 1 minute to think about what you’re going to say, and you can make some notes if you wish.",
  ],
  3: [
    "In this part, you will be asked some more general questions based on the topic from part 2.",
  ],
};

export const MAPPED_SKILL_ICON: Record<EnumSkill, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [EnumSkill.reading]: ReadingIcon,
  [EnumSkill.listening]: ListeningIcon,
  [EnumSkill.writing]: WritingIcon,
  [EnumSkill.speaking]: SpeakingIcon,
};

export const MAPPED_SKILL_ICON_FILLED: Record<
  EnumSkill,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  [EnumSkill.reading]: icons.ReadingFilled,
  [EnumSkill.listening]: icons.ListeningFilled,
  [EnumSkill.writing]: icons.WritingFilled,
  [EnumSkill.speaking]: icons.SpeakingFilled,
};

export const MAPPED_SPEAKING_CRITERIA_TITLES: Record<string, string> = {
  [EnumSpeakingCriteria.FluencyAndCoherence]: "Fluency and Coherence",
  [EnumSpeakingCriteria.Pronunciation]: "Pronunciation",
  [EnumSpeakingCriteria.LexicalResource]: "Lexical Resource",
  [EnumSpeakingCriteria.GrammaticalRangeAndAccuracy]: "Grammatical Range and Accuracy",
};

export const MAPPED_WRITING_CRITERIA_TITLES: Record<string, string> = {
  [EnumWritingCriteria.TaskAchievement]: "Task Achievement",
  [EnumWritingCriteria.CoherenceAndCohesion]: "Coherence and Cohesion",
  [EnumWritingCriteria.LexicalResource]: "Lexical Resource",
  [EnumWritingCriteria.GrammaticalRangeAndAccuracy]: "Grammatical Range and Accuracy",
};

export const FIREBASE_ANALYTICS_EVENTS = {
  screenView: "screen_view",
  login: "login",
  startSimulatedTest: "start_simulated_test",
};

export const SKILLS_LIST = [
  ...Object.keys(MAPPED_SKILL_ICON).map((key) => ({
    label: key as EnumSkill,
    IconOutlined: MAPPED_SKILL_ICON[key as EnumSkill],
    IconFilled: MAPPED_SKILL_ICON_FILLED[key as EnumSkill],
  })),
];

export const ALL_SKILLS_LIST = [
  {
    label: ExtendEnumSkill.allSkills,
    IconOutlined: AllSkillsIcon,
    IconFilled: AllSkillsIcon,
  },
  ...SKILLS_LIST,
];

const carrotSubscription: Shop = {
  id: "subscription",
  name: EnumItemShop.SUBSCRIPTION,
  price: { 500: 10000, 2500: 45000, 5000: 90000 },
  image: {
    url: CarrotBasket,
  },
  imageId: "",
  description: "Buy bill to get more time",
  popular: "1",
  isPopular: false,
  duration: 0,
};

export { carrotSubscription };
