import { create } from "zustand";

import { DLQuestion } from "@/lib/types";

export type SpeakingAnswer = {
  correct_letters?: string;
};

export type LessonResult = {
  percent: number;
  exp: number;
  carrot: number;
  timer: number;
  [key: string]: number;
};

export type DLAnswer = {
  numberOfCorrect: number;
  totalOfQuestions: number;
} & SpeakingAnswer;

type State = {
  lessonInformation: {
    questions: DLQuestion[];
    totalQuestions: number;
  };
  lessonState: {
    currentQuestion: {
      index: number;
      question: DLQuestion;
    } | null;
    isCompleted: boolean;
    isStarted: boolean;
    startTime: number;
    result: LessonResult | null;
  };
  learnerAnswers: DLAnswer[];
};

type Action = {
  startLesson: (questions: DLQuestion[]) => void;
  nextQuestion: VoidFunction;
  clear: VoidFunction;
  answerQuestion: (newAnswer: DLAnswer) => void;
  setResult: (result: LessonResult) => void;
};

const initialValue: State = {
  lessonInformation: {
    questions: [],
    totalQuestions: 0,
  },
  lessonState: {
    currentQuestion: null,
    isCompleted: false,
    isStarted: false,
    startTime: 0,
    result: null,
  },
  learnerAnswers: [],
};

const useDailyLessonStore = create<State & Action>((set, get) => ({
  ...initialValue,
  startLesson: (questions) =>
    set((state) => ({
      lessonInformation: {
        ...state.lessonInformation,
        questions,
        totalQuestions: questions.length,
      },
      lessonState: {
        ...state.lessonState,
        currentQuestion: questions.length > 0 ? { index: 0, question: questions[0] } : null,
        isStarted: true,
        startTime: Date.now(),
      },
    })),
  clear: () => {
    set({
      ...initialValue,
      learnerAnswers: [],
    });
  },
  nextQuestion: () => {
    const {
      lessonState,
      lessonInformation: { totalQuestions, questions },
    } = get();
    const { currentQuestion, isCompleted } = lessonState;
    if (currentQuestion && currentQuestion.index < totalQuestions - 1) {
      set({
        lessonState: {
          ...lessonState,
          currentQuestion: {
            index: currentQuestion.index + 1,
            question: questions[currentQuestion.index + 1],
          },
        },
      });
    } else {
      if (!isCompleted) {
        set({
          lessonState: {
            ...lessonState,
            isCompleted: true,
          },
        });
      }
    }
  },
  answerQuestion: (newAnswer) => {
    const {
      learnerAnswers,
      lessonState: { currentQuestion },
    } = get();
    if (!currentQuestion) return;
    learnerAnswers[currentQuestion.index] = newAnswer;
    set({ learnerAnswers });
  },
  setResult: (result) => {
    set((state) => ({
      lessonState: {
        ...state.lessonState,
        result,
      },
    }));
  },
}));

export default useDailyLessonStore;
