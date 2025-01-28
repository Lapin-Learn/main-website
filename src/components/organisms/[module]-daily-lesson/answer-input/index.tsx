import useDailyLessonStore, { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { EnumDLContentType } from "@/lib/enums";

import Matching from "./matching";
import MultipleChoice from "./multiple-choice";

export type BaseAnswerInputProps = AnswerInputProps & {
  isAnswered: boolean;
};

type AnswerInputProps = {
  result?: DLAnswer;
  renderCheckButton: (getCorrectAnswers: () => DLAnswer, disabled: boolean) => JSX.Element;
};

const AnswerInput = (props: AnswerInputProps) => {
  const {
    lessonState: { currentQuestion },
    learnerAnswers,
  } = useDailyLessonStore();
  if (!currentQuestion?.question) return null;
  const { contentType, content } = currentQuestion.question;
  const isAnswered = currentQuestion ? learnerAnswers[currentQuestion.index] !== undefined : false;

  switch (contentType) {
    case EnumDLContentType.MULTIPLE_CHOICE:
      return <MultipleChoice {...content} {...props} isAnswered={isAnswered} />;
    case EnumDLContentType.MATCHING:
      return (
        <Matching
          {...content}
          {...props}
          isAnswered={currentQuestion ? learnerAnswers[currentQuestion.index] !== undefined : false}
        />
      );
    // case ContentTypeEnum.FILL_IN_THE_BLANK:
    //   return <FillInTheBlank {...content} {...rest} />;
    default:
      return null;
  }
};

export default AnswerInput;
