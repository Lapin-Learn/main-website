import { EnumQuestionGroup } from "@/lib/enums";
import { QuestionGroup } from "@/lib/types/simulated-test.type";

import FillInBlanksQuestionGroup from "./fill-in-blanks-question-group";
import MatchingHeadingsQuestionGroup from "./matching-headings-question-group";
import MatchingInformationQuestionGroup from "./matching-information-question-group";
import MultipleChoiceQuestionGroup from "./multiple-choice-question-group";

type QuestionGroupFactoryProps = {
  questionGroup: QuestionGroup;
};

const QuestionGroupFactory = ({ questionGroup }: QuestionGroupFactoryProps) => {
  switch (questionGroup.questionType) {
    case EnumQuestionGroup.fillInBlanks:
      return <FillInBlanksQuestionGroup {...questionGroup} />;
    case EnumQuestionGroup.matchingHeadings:
      return <MatchingHeadingsQuestionGroup {...questionGroup} />;
    case EnumQuestionGroup.multipleChoice:
      return <MultipleChoiceQuestionGroup {...questionGroup} />;
    case EnumQuestionGroup.matchingInformation:
      return <MatchingInformationQuestionGroup {...questionGroup} />;
    default:
      return <div>Haven't supported yet</div>;
  }
};
export default QuestionGroupFactory;
