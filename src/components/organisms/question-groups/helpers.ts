import { EnumQuestionGroup } from "@/lib/enums";
import { QuestionGroupMultipleChoice } from "@/lib/types";

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

export { getQuestions };
