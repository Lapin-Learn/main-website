export enum EnumRole {
  admin = "admin",
  learner = "learner",
}

export enum EnumSkill {
  reading = "reading",
  listening = "listening",
  writing = "writing",
  speaking = "speaking",
}

export enum ExtendEnumSkill {
  reading = "reading",
  listening = "listening",
  writing = "writing",
  speaking = "speaking",
  allSkills = "allSkills",
}
export enum EnumBandScore {
  PRE_IELTS = "pre_ielts",
  BAND_45 = "4.5",
  BAND_5 = "5.0",
  BAND_55 = "5.5",
  BAND_6 = "6.0",
  BAND_65 = "6.5",
  BAND_7 = "7.0",
}

export enum EnumCEFRLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  Any = "Any",
}

export enum EnumRank {
  bronze = "bronze",
  silver = "silver",
  gold = "gold",
  platinum = "platinum",
  diamond = "diamond",
  master = "master",
}

export enum EnumGender {
  MALE = "male",
  FEMALE = "female",
}

export enum EnumActionOTP {
  resetPassword = "reset-password",
  verifyEmail = "verify-mail",
}

export enum EnumAction {
  DAILY_STREAK = "daily_streak",
  FREEZE_STREAK = "freeze_streak",
}

export enum EnumQuestionGroup {
  multipleChoice = "multiple_choice",
  matchingHeadings = "matching_headings",
  matchingInformation = "matching_information",
  fillInBlanks = "fill_in_blanks",
}

export enum EnumQuestionGroupLabel {
  // Multiple choice group
  // Output: A, B, C, D, E, F, G,... or True, False, Not Given or Yes, No, Not Given
  multipleChoice = "multiple_choice",
  TFNG = "true_false_not_given",
  YNNG = "yes_no_not_given",
  listOfOptions = "list_of_options",

  // Fill in the blanks group
  // Output: short text
  summaryFlowChartCompletion = "summary_flow_chart_completion",
  noteFormCompletion = "note_form_completion",
  tableCompletion = "table_completion",
  mapPlanDiagramLabelling = "map_plan_diagram_labelling",
  tableNoteFlowChartCompletion = "table_note_flow_chart_completion",
  shortAnswer = "short_answer",
  diagramLabelCompletion = "diagram_label_completion",
  summaryCompletion = "summary_completion",

  // Matching group
  // Output: A, B, C, D, E, F, G,...
  matching = "matching",
  matchingInformation = "matching_information",
  matchingFeatures = "matching_features",
  matchingHeadings = "matching_headings",
  matchingInformationToParagraph = "matching_information_to_paragraph",
  matchingSentenceEndings = "matching_sentence_endings",
}

export enum EnumMode {
  PRACTICE = "practice",
  FULL_TEST = "full_test",
}

export enum EnumSimulatedTestSessionStatus {
  IN_PROGRESS = "in_progress",
  FINISHED = "finished",
  NOT_STARTED = "not_started",
  CANCELED = "canceled",
  IN_EVALUATING = "in_evaluating",
}

export enum EnumTourElement {
  TIMER = "timer",
  CONTENT = "content",
  ANSWER_SHEET = "answer-sheet",
  QUESTION_NAVIGATOR = "question-navigator",
  BACK_AND_NEXT = "back-and-next",
  SUBMIT = "submit",
  QUIT = "quit",
}

export enum EnumWritingCriteria {
  Overall = "overall",
  TaskAchievement = "TR",
  CoherenceAndCohesion = "CC",
  LexicalResource = "LR",
  GrammaticalRangeAndAccuracy = "GRA",
}

export enum EnumSpeakingCriteria {
  Overall = "overall",
  FluencyAndCoherence = "FC",
  LexicalResource = "LR",
  GrammaticalRangeAndAccuracy = "GRA",
  Pronunciation = "P",
}

export enum EnumMissionCategory {
  COMPLETE_LESSON_WITH_PERCENTAGE_SCORE = "COMPLETE_LESSON_WITH_PERCENTAGE_SCORE",
  COMPLETE_LESSON_WITH_DIFFERENT_SKILLS = "COMPLETE_LESSON_WITH_DIFFERENT_SKILLS",
  TOTAL_DURATION_OF_LEARN_DAILY_LESSON = "TOTAL_DURATION_OF_LEARN_DAILY_LESSON",
  EXCEED_LEARNING_STREAK_WITHOUT_BREAK = "EXCEED_LEARNING_STREAK_WITHOUT_BREAK",
}

export enum EnumItemShop {
  STREAK_FREEZE = "STREAK_FREEZE",
  RANDOM_GIFT = "RANDOM_GIFT",
  ULTIMATE_TIME = "ULTIMATE_TIME",
  IDENTIFICATION = "IDENTIFICATION",
  SUBSCRIPTION = "SUBSCRIPTION",
}

export enum EnumRandomGiftType {
  CARROTS = "carrots",
  ITEM = "item",
}
