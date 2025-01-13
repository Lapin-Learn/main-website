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
    // if (
    //   (currentPart === 1 && question < content.part1.length) ||
    //   (currentPart === 3 && question < content.part3.length)
    // ) {
    //   return "speaking.nextQuestionInSeconds";
    // } else if (currentPart === 1 && question === content.part1.length) {
    //   if (content.part2 || content.part3) {
    //     return "speaking.nextPartInSeconds";
    //   } else {
    //     return "speaking.endTestInSeconds";
    //   }
    // } else if (currentPart === 3 && question === content.part3.length) {
    //   return "speaking.endTestInSeconds";
    // } else if (currentPart === 2) {
    //   if (content.part3) {
    //     return "speaking.nextPartInSeconds";
    //   } else {
    //     return "speaking.endTestInSeconds";
    //   }
    // } else {
    //   return "speaking.nextPartInSeconds";
    // }
  }

  if (isLastQuestion) {
    if (isLastPart) {
      return "speaking.endTest";
    } else {
      return "speaking.nextPart";
    }
  } else {
    return "nextQuestion";
  }
};
