import MicrophonePermissionProvider from "@/components/providers/microphone-permission-provider";
import useDailyLessonStore, { DLAnswer } from "@/hooks/zustand/use-daily-lesson-store";
import { EnumDLContentType } from "@/lib/enums";

import FillInTheBlank from "./fill-in-the-blank";
import Matching from "./matching";
import MultipleChoice from "./multiple-choice";
import Pronounciation from "./pronounciation";

export type BaseAnswerInputProps = AnswerInputProps & {
  isAnswered: boolean;
  currentQuestionIndex: number;
};

type AnswerInputProps = {
  className?: string;
  result?: DLAnswer;
  renderCheckButton: (getCorrectAnswers: () => DLAnswer, disabled: boolean) => JSX.Element;
  lessonId: string | number;
};

const AnswerInput = (props: AnswerInputProps) => {
  const {
    lessonState: { currentQuestion },
    learnerAnswers,
  } = useDailyLessonStore();
  if (!currentQuestion?.question) return null;
  const { contentType, content } = currentQuestion.question;
  const index = currentQuestion.index;
  const isAnswered = currentQuestion ? learnerAnswers[currentQuestion.index] !== undefined : false;

  switch (contentType) {
    case EnumDLContentType.MULTIPLE_CHOICE:
      return (
        <MultipleChoice
          {...content}
          {...props}
          isAnswered={isAnswered}
          currentQuestionIndex={index}
        />
      );
    case EnumDLContentType.MATCHING:
      return (
        <Matching {...content} {...props} currentQuestionIndex={index} isAnswered={isAnswered} />
      );
    case EnumDLContentType.PRONOUNCIATION:
      return (
        <MicrophonePermissionProvider>
          <Pronounciation
            key={index}
            currentQuestionIndex={index}
            isAnswered={isAnswered}
            {...props}
          />
        </MicrophonePermissionProvider>
      );
    case EnumDLContentType.FILL_IN_THE_BLANK:
      return (
        <FillInTheBlank
          {...content}
          {...props}
          currentQuestionIndex={index}
          isAnswered={isAnswered}
        />
      );
    default:
      return null;
  }
};

export default AnswerInput;
