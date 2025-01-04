import { SpeakingContent } from "@/lib/types/simulated-test.type";

export const getNextButtonText = (
  isCountingDown: boolean,
  currentPart: number,
  question: number,
  content: SpeakingContent
): string => {
  if (isCountingDown) {
    if (
      (currentPart === 1 && question < content.part1.length) ||
      (currentPart === 3 && question < content.part3.length)
    ) {
      return "speaking.nextQuestionInSeconds";
    } else if (currentPart === 1 && question === content.part1.length) {
      if (content.part2 || content.part3) {
        return "speaking.nextPartInSeconds";
      } else {
        return "speaking.endTestInSeconds";
      }
    } else if (currentPart === 3 && question === content.part3.length) {
      return "speaking.endTestInSeconds";
    } else if (currentPart === 2) {
      if (content.part3) {
        return "speaking.nextPartInSeconds";
      } else {
        return "speaking.endTestInSeconds";
      }
    } else {
      return "speaking.nextPartInSeconds";
    }
  }

  if (currentPart === 1 && question === content.part1.length) {
    if (content.part2) {
      return "Part 2";
    } else if (content.part3) {
      return "Part 3";
    } else {
      return "speaking.endTest";
    }
  } else if (currentPart === 3 && question === content.part3.length) {
    return "speaking.endTest";
  } else if (currentPart === 2) {
    if (content.part3) {
      return "Part 3";
    } else {
      return "speaking.endTest";
    }
  } else {
    return "nextQuestion";
  }
};
