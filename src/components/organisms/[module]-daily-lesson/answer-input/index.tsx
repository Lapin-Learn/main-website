import useDailyLessonStore, { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { EnumDLContentType } from "@/lib/enums";

import Matching from "./matching";
import MultipleChoice from "./multiple-choice";

export type BaseAnswerInputProps = {
  // TODO: remove ?
  onAnswer?: (answer: DLAnswer) => void;
  result?: DLAnswer;
};

const AnswerInput = () => {
  const {
    lessonState: { currentQuestion },
  } = useDailyLessonStore();
  if (!currentQuestion?.question) return null;
  const { contentType, content } = currentQuestion.question;
  switch (contentType) {
    case EnumDLContentType.MULTIPLE_CHOICE:
      return <MultipleChoice {...content} />;
    case EnumDLContentType.MATCHING:
      return <Matching {...content} />;
    // case ContentTypeEnum.FILL_IN_THE_BLANK:
    //   return <FillInTheBlank {...content} {...rest} />;
    default:
      return null;
  }
};

export default AnswerInput;
