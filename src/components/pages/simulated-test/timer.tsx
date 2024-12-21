import useGlobalTimerStore, { timerKeys } from "@/hooks/zustand/use-global-timer";
import { formatTime } from "@/lib/utils";

type TimerProps = {
  sessionId: number;
};
export default function Timer({ sessionId }: TimerProps) {
  const { getTimer } = useGlobalTimerStore();

  return (
    <div className="timer absolute right-4 w-20 rounded-md bg-secondary p-1 text-center text-base font-bold text-secondary-foreground sm:right-8 sm:text-lg md:w-24 md:p-2">
      {formatTime((getTimer(timerKeys.testDetail(sessionId))?.time ?? 0) / 1000)}
    </div>
  );
}
