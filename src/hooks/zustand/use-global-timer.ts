import { create } from "zustand";

export type TimerType = "countdown" | "stopwatch";

type State = {
  timers: Record<
    string,
    {
      type: TimerType;
      time: number; // in milliseconds
      isRunning: boolean;
      intervalId: NodeJS.Timeout | null;
    } | null
  >;
};

type Action = {
  createTimer: (key: string, type: TimerType, initialTime: number) => void;
  startTimer: (key: string) => void;
  stopTimer: (key: string) => void;
  resumeTimer: (key: string) => void;
  restartTimer: (key: string) => void;
  deleteTimer: (key: string) => void;
  resetTimer: (key: string, initialTime: number) => void;
  getTimer: (key: string) => State["timers"][string];
};

export const timerKeys = {
  testDetail: (sessionId: number) => `testDetail-${sessionId}`,
};
const useGlobalTimerStore = create<State & Action>((set, get) => ({
  timers: {},

  createTimer: (key, type, initialTime) =>
    set((state) => {
      if (state.timers[key]) {
        console.warn(`Timer with key "${key}" already exists`);
        return state;
      }
      return {
        timers: {
          ...state.timers,
          [key]: {
            type,
            time: initialTime,
            isRunning: false,
            intervalId: null,
          },
        },
      };
    }),

  startTimer: (key) =>
    set((state) => {
      const timer = state.timers[key];
      if (!timer) {
        console.error(`Timer with key "${key}" does not exist.`);
        return state;
      }
      if (timer.isRunning) {
        console.warn(`Timer with key "${key}" is already running.`);
        return state;
      }

      const intervalId = setInterval(() => {
        set((state) => {
          const currentTimer = state.timers[key];
          if (!currentTimer) return state;

          const newTime =
            currentTimer.type === "countdown"
              ? Math.max(currentTimer.time - 1000, 0)
              : currentTimer.time + 1000;

          // Stop countdown timer if time reaches 0
          if (currentTimer.type === "countdown" && newTime === 0) {
            clearInterval(currentTimer.intervalId!);
            return {
              timers: {
                ...state.timers,
                [key]: { ...currentTimer, time: newTime, isRunning: false },
              },
            };
          }

          return {
            timers: {
              ...state.timers,
              [key]: { ...currentTimer, time: newTime },
            },
          };
        });
      }, 1000);

      return {
        timers: {
          ...state.timers,
          [key]: { ...timer, isRunning: true, intervalId },
        },
      };
    }),

  stopTimer: (key) =>
    set((state) => {
      const timer = state.timers[key];
      if (!timer) {
        console.error(`Timer with key "${key}" does not exist.`);
        return state;
      }

      clearInterval(timer.intervalId!);
      return {
        timers: {
          ...state.timers,
          [key]: { ...timer, isRunning: false, intervalId: null },
        },
      };
    }),

  resumeTimer: (key) => get().startTimer(key),

  restartTimer: (key) =>
    set((state) => {
      const timer = state.timers[key];
      if (!timer) {
        console.error(`Timer with key "${key}" does not exist.`);
        return state;
      }

      clearInterval(timer.intervalId!);
      const initialTime = timer.type === "countdown" ? timer.time : 0; // Reset time based on type

      return {
        timers: {
          ...state.timers,
          [key]: { ...timer, time: initialTime, isRunning: false, intervalId: null },
        },
      };
    }),

  deleteTimer: (key) =>
    set((state) => {
      const timer = state.timers[key];
      if (!timer) {
        console.error(`Timer with key "${key}" does not exist.`);
        return state;
      }

      clearInterval(timer.intervalId!);
      const { [key]: _, ...remainingTimers } = state.timers;
      return { timers: remainingTimers };
    }),

  resetTimer: (key, initialTime) =>
    set((state) => {
      const timer = state.timers[key];
      if (!timer) {
        console.warn(`Timer with key "${key}" does not exist`);
        return state;
      }
      return {
        timers: {
          ...state.timers,
          [key]: {
            ...timer,
            initialTime,
            time: initialTime,
            running: false,
          },
        },
      };
    }),
  getTimer: (key) => get().timers[key],
}));

export default useGlobalTimerStore;
