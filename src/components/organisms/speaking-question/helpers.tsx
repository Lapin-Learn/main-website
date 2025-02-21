export const getNextButtonText = (
  isCountingDown: boolean,
  isLastPart: boolean,
  isLastQuestion: boolean
): string => {
  if (isCountingDown) {
    if (!isLastQuestion) {
      return "speaking.nextQuestionInSeconds";
    } else if (isLastPart && isLastQuestion) {
      return "speaking.endTestInSeconds";
    } else {
      return "speaking.nextPartInSeconds";
    }
  }

  return "speaking.answerQuestion";
};
