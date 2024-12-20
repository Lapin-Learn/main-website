import { useCallback, useEffect, useRef, useState } from "react";

import { formatTime } from "@/lib/utils";

function useCountup(initialTime: number, onChangeTime?: (time: number) => void) {
  const [timeElapsed, setTimeElapsed] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(Date.now() - initialTime * 1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateTimer = useCallback(() => {
    const now = Date.now();
    const timeElapsed = Math.floor((now - startTimeRef.current) / 1000);
    setTimeElapsed(timeElapsed);
    if (onChangeTime) {
      onChangeTime(timeElapsed);
    }
  }, [onChangeTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(updateTimer, 1000);
      updateTimer(); // Initial call to set the correct time immediately
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateTimer, isRunning]);

  const restart = useCallback(() => {
    startTimeRef.current = Date.now();
    setTimeElapsed(0);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const pause = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRunning]);

  const resume = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - timeElapsed * 1000;
    }
  }, [isRunning, timeElapsed]);

  return {
    time: formatTime(timeElapsed),
    restart,
    stop,
    pause,
    resume,
    timeElapsed,
  };
}

export default useCountup;
