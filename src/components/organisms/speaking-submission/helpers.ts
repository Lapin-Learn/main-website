import { SpeakingSession } from "@/lib/types/simulated-test-session.type";
import { assertFallback } from "@/lib/utils";

export type ExtendedSpeakingResponse = SpeakingSession["responses"][0] & {
  start: number;
  end: number;
  duration: number;
};

export const parseTimestampsToStartEnd = (
  items: SpeakingSession["responses"]
): ExtendedSpeakingResponse[] => {
  const sortedItems = items.sort((a, b) => {
    if (a.timeStamp && b.timeStamp) {
      return a.timeStamp - b.timeStamp;
    }
    return 0;
  });

  const startEndItems = sortedItems.reduce((acc, item, index) => {
    if (index === 0) {
      return [
        ...acc,
        {
          ...item,
          start: 0,
          end: assertFallback(item.timeStamp, 0),
          duration: assertFallback(item.timeStamp, 0),
        },
      ];
    } else {
      return [
        ...acc,
        {
          ...item,
          start: assertFallback(sortedItems[index - 1].timeStamp, 0),
          end: assertFallback(item.timeStamp, 0),
          duration:
            assertFallback(item.timeStamp, 0) - assertFallback(sortedItems[index - 1].timeStamp, 0),
        },
      ];
    }
  }, [] as ExtendedSpeakingResponse[]);
  return startEndItems;
};
