import { create } from "zustand";

import { MatchingAnswer } from "@/components/organisms/[module]-daily-lesson/answer-input/matching";
import { MultipleChoiceAnswer } from "@/components/organisms/[module]-daily-lesson/answer-input/multiple-choice";
import { DLQuestion } from "@/lib/types";
import { LessonResult } from "@/lib/types/daily-lesson.type";

export type SpeakingAnswer = {
  correct_letters?: string;
};

export type DLAnswer = {
  numberOfCorrect: number;
  totalOfQuestions: number;
} & SpeakingAnswer;

type DLHistoryAnswer = MatchingAnswer | MultipleChoiceAnswer;

type DLHistory<T = DLHistoryAnswer> = {
  answer: T;
  result: T;
};

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
    isAudioPlaying: boolean;
    startTime: number;
    result: LessonResult | null;
  };
  learnerAnswers: DLAnswer[];
  showExplanation: boolean;
  history: DLHistory[];
};

type Action = {
  startLesson: (questions: DLQuestion[]) => void;
  nextQuestion: VoidFunction;
  clear: VoidFunction;
  answerQuestion: (newAnswer: DLAnswer) => void;
  setResult: (result: LessonResult) => void;
  setShowExplanation: (show: boolean) => void;
  saveHistory: (answer: DLHistoryAnswer, result: DLHistoryAnswer) => void;
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
    isAudioPlaying: false,
    startTime: 0,
    result: null,
  },
  learnerAnswers: [],
  showExplanation: false,
  history: [],
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
        isAudioPlaying: true,
        startTime: Date.now(),
      },
    })),
  clear: () => {
    set({
      ...initialValue,
      learnerAnswers: [],
      history: [],
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
          isAudioPlaying: true,
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
    const { learnerAnswers, lessonState } = get();
    if (!lessonState.currentQuestion) return;
    learnerAnswers[lessonState.currentQuestion.index] = newAnswer;
    set({ learnerAnswers, lessonState: { ...lessonState, isAudioPlaying: false } });
  },
  setResult: (result) => {
    set((state) => ({
      lessonState: {
        ...state.lessonState,
        result,
      },
    }));
  },
  setShowExplanation: (show) => {
    set(() => ({
      showExplanation: show,
    }));
  },
  saveHistory: (answer, result) => {
    set((state) => ({
      history: [...state.history, { answer, result }],
    }));
  },
}));

export default useDailyLessonStore;
