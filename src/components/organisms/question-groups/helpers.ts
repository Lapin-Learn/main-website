import { EnumQuestionGroup } from "@/lib/enums";
import { QuestionGroupMatchingHeadings, QuestionGroupMultipleChoice } from "@/lib/types";

const getTFNGQuestions = (questions: QuestionGroupMultipleChoice["questions"]) => {
  return questions.map((question) => {
    return {
      ...question,
      options: [
        {
          value: "True",
          label: "True",
        },
        {
          value: "False",
          label: "False",
        },
        {
          value: "Not Given",
          label: "Not Given",
        },
      ],
    };
  });
};

const getYNNGQuestions = (questions: QuestionGroupMultipleChoice["questions"]) => {
  return questions.map((question) => {
    return {
      ...question,
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
        {
          value: "Not Given",
          label: "Not Given",
        },
      ],
    };
  });
};

const getQuestions = (
  questionType: QuestionGroupMultipleChoice["questionType"],
  questions: QuestionGroupMultipleChoice["questions"]
) => {
  switch (questionType) {
    case EnumQuestionGroup.TFNG:
      return getTFNGQuestions(questions);
    case EnumQuestionGroup.YNNG:
      return getYNNGQuestions(questions);
    default:
      return questions;
  }
};

const getMatchingInformationToParagraphQuestions = (
  questions: QuestionGroupMatchingHeadings["questions"],
  numberOfParagraphs: QuestionGroupMatchingHeadings["numberOfParagraphs"] = 0
) => {
  const listOfOptions = Array.from({ length: numberOfParagraphs }, (_, index) => {
    return {
      value: String.fromCharCode(65 + index), // 65 is the char code for 'A'
      label: `Paragraph ${String.fromCharCode(65 + index)}`,
    };
  });

  return questions.map((question) => {
    return {
      ...question,
      options: listOfOptions,
    };
  });
};
export { getMatchingInformationToParagraphQuestions, getQuestions };
