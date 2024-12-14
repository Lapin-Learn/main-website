import FillInTheBlanksQuestionGroup from "./fill-in-the-blanks-question-group";
import MultipleChoiceQuestionGroup from "./multiple-choice-question-group";

// TODO: Factory method here?
const QuestionGroup = {
  MultipleChoice: MultipleChoiceQuestionGroup,
  FillInBlanks: FillInTheBlanksQuestionGroup,
};
export default QuestionGroup;
