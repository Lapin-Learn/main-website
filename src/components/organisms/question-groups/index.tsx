import parser from "html-react-parser";
import { createContext, useContext } from "react";

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
    case EnumQuestionGroup.matchingInformationToParagraph:
      return <MatchingHeadingsQuestionGroup {...questionGroup} />;

    case EnumQuestionGroup.multipleChoice:
    case EnumQuestionGroup.TFNG:
    case EnumQuestionGroup.YNNG:
      return <MultipleChoiceQuestionGroup {...questionGroup} />;

    case EnumQuestionGroup.matchingInformation:
      return <MatchingInformationQuestionGroup {...questionGroup} />;
    default:
      return <div>Haven't supported yet</div>;
  }
};

type QuestionGroupContext = {
  questionGroup: QuestionGroup;
};

const QuestionGroupContext = createContext<QuestionGroupContext | null>(null);

const useQuestionGroupContext = () => {
  const context = useContext(QuestionGroupContext);
  if (!context) {
    throw new Error("useQuestionGroupContext must be used within a QuestionGroupContext");
  }
  return context;
};

const QuestionGroupTemplate = ({ questionGroup }: { questionGroup: QuestionGroup }) => {
  const { imageSrc, startQuestionNo, endQuestionNo, questionCard, questionDescription } =
    questionGroup;

  return (
    <QuestionGroupContext.Provider
      value={{
        questionGroup,
      }}
    >
      <div>
        <div className="mb-2 font-bold">
          Question {startQuestionNo} - {endQuestionNo}.
        </div>
        <h6 className="mb-2 font-bold">{questionCard}</h6>
        {questionDescription && typeof questionDescription == "string" && (
          <div className="mb-2">{parser(questionDescription)}</div>
        )}
        {imageSrc ? (
          <img src={imageSrc} alt={`Image ${startQuestionNo}-${endQuestionNo}`} className="w-1/2" />
        ) : null}
        <QuestionGroupFactory questionGroup={questionGroup} />
      </div>
    </QuestionGroupContext.Provider>
  );
};

export default QuestionGroupTemplate;
export { useQuestionGroupContext };
