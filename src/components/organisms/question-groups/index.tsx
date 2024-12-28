import { EnumQuestionGroup } from "@/lib/enums";
import { QuestionGroup } from "@/lib/types/simulated-test.type";

import FillInBlanksQuestionGroup from "./fill-in-blanks-question-group";
import MatchingHeadingsQuestionGroup from "./matching-headings-question-group";
import MatchingInformationQuestionGroup from "./matching-information-question-group";
import MultipleChoiceQuestionGroup from "./multiple-choice-question-group";

const QuestionGroupFactory = ({
  questionGroup,
  disabled,
}: {
  questionGroup: QuestionGroup;
  disabled?: boolean;
}) => {
  switch (questionGroup.questionType) {
    case EnumQuestionGroup.fillInBlanks:
      return <FillInBlanksQuestionGroup {...questionGroup} disabled={disabled} />;
    case EnumQuestionGroup.matchingHeadings:
      return <MatchingHeadingsQuestionGroup {...questionGroup} disabled={disabled} />;
    case EnumQuestionGroup.multipleChoice:
      return <MultipleChoiceQuestionGroup {...questionGroup} disabled={disabled} />;
    case EnumQuestionGroup.matchingInformation:
      return <MatchingInformationQuestionGroup {...questionGroup} disabled={disabled} />;
    default:
      return <div>Haven't supported yet</div>;
  }
};
export default QuestionGroupFactory;
