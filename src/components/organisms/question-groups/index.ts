import fillInTheBlanksQuestionGroup from "./fill-in-the-blanks-question-group";
import MultipleChoiceQuestionGroup from "./multiple-choice-question-group";

// TODO: Factory method here?
const QuestionGroup = {
  MultipleChoice: MultipleChoiceQuestionGroup,
  FillInBlanks: fillInTheBlanksQuestionGroup,
};
export default QuestionGroup;
