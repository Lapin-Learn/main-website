import FillInTheBlanksQuestionGroup from "./fill-in-the-blanks-question-group";
import MatchingHeadingsQuestionGroup from "./matching_headings-question-group";
import MultipleChoiceQuestionGroup from "./multiple-choice-question-group";

// TODO: Factory method here?
const QuestionGroup = {
  MultipleChoice: MultipleChoiceQuestionGroup,
  FillInBlanks: FillInTheBlanksQuestionGroup,
  MatchingHeadings: MatchingHeadingsQuestionGroup,
};
export default QuestionGroup;
