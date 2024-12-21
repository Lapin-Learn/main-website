import { EnumQuestionGroup } from "@/lib/enums";
import { QuestionGroup } from "@/lib/types/simulated-test.type";

import FillInBlanksQuestionGroup from "./fill-in-blanks-question-group";
import MatchingHeadingsQuestionGroup from "./matching-headings-question-group";
import MultipleChoiceQuestionGroup from "./multiple-choice-question-group";

const QuestionGroupFactory = ({ questionGroup }: { questionGroup: QuestionGroup }) => {
  switch (questionGroup.questionType) {
    case EnumQuestionGroup.fillInBlanks:
      return <FillInBlanksQuestionGroup {...questionGroup} />;
    case EnumQuestionGroup.matchingHeadings:
      return <MatchingHeadingsQuestionGroup {...questionGroup} />;
    default:
      return <MultipleChoiceQuestionGroup {...questionGroup} />;
  }
};
export default QuestionGroupFactory;
