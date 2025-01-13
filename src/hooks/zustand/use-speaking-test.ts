import { create } from "zustand";

import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";

export enum EnumRecordingStatus {
  inactive = "inactive",
  recording = "recording",
}

export type RecordingStatus = keyof typeof EnumRecordingStatus;
type RecordingState = {
  recordingStatus: RecordingStatus;
  audioLevel: number;
  progress: number;
  audioChunks: Blob[];
  audio: string | null;
};

type RecordingActions = {
  setRecordingStatus: (status: RecordingStatus) => void;
  setAudioLevel: (level: number) => void;
  setProgress: (fn: (prev: number) => number) => void;
  setProgressValue: (value: number) => void;
  setAudioChunks: (chunks: Blob[]) => void;
  setAudio: (audio: string | null) => void;
  reset: () => void;
};

const initialState: RecordingState = {
  recordingStatus: EnumRecordingStatus.inactive,
  audioLevel: 0,
  progress: 0,
  audioChunks: [],
  audio: null,
};

export const useRecordingStore = create<RecordingState & RecordingActions>((set) => ({
  ...initialState,
  setRecordingStatus: (status) => set({ recordingStatus: status }),
  setAudioLevel: (level) => set({ audioLevel: level }),
  setProgress: (fn) => set((state) => ({ progress: fn(state.progress) })),
  setProgressValue: (value) => set({ progress: value }),
  setAudioChunks: (chunks) => set({ audioChunks: chunks }),
  setAudio: (audio) => set({ audio }),
  reset: () => set({ ...initialState }),
}));

type SpeakingSource = {
  url: string;
  blob: Blob;
  file: File;
  partNo: number;
  questionNo: number;
};

type SpeakingTestState = {
  testState: EnumSimulatedTestSessionStatus;
  position: {
    part: number;
    question: number;
  };
  mode: EnumMode | null;
  showInstruction: boolean;
  speakingSources: SpeakingSource[];
};

type SpeakingTestActions = {
  setTestState: (state: EnumSimulatedTestSessionStatus) => void;
  navigateToPart: (questionNo: number, partNo: number) => void;
  addSpeakingSource: (source: SpeakingSource) => void;
  setInitialPart: (part: number) => void;
  setMode: (mode: EnumMode) => void;
  reset: () => void;
};

const initialTestState: SpeakingTestState = {
  testState: EnumSimulatedTestSessionStatus.NOT_STARTED,
  position: {
    part: 1,
    question: 1,
  },
  mode: null,
  showInstruction: true,
  speakingSources: [],
};

export const useSpeakingTestState = create<SpeakingTestState & SpeakingTestActions>((set) => ({
  ...initialTestState,
  setTestState: (state) => set({ testState: state }),
  navigateToPart: (questionNo, partNo) =>
    set((state) => ({
      showInstruction: state.position.part !== partNo,
      position: {
        part: partNo,
        question: questionNo,
      },
    })),
  addSpeakingSource: (source) =>
    set((state) => ({ speakingSources: [...state.speakingSources, source] })),
  setInitialPart: (part) => set((state) => ({ position: { ...state.position, part } })),
  setMode: (mode) => set({ mode }),
  reset: () => set({ ...initialTestState }),
}));
