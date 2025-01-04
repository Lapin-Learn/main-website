import { create } from "zustand";

import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";

export type RecordingStatus = "inactive" | "recording";
interface RecordingState {
  permission: boolean;
  stream: MediaStream | null;
  recordingStatus: RecordingStatus;
  audioLevel: number;
  progress: number;
  audioChunks: Blob[];
  audio: string | null;
}

interface RecordingActions {
  setPermission: (permission: boolean) => void;
  setStream: (stream: MediaStream) => void;
  stopStream: () => void;
  setRecordingStatus: (status: RecordingStatus) => void;
  setAudioLevel: (level: number) => void;
  setProgress: (fn: (prev: number) => number) => void;
  setProgessValue: (value: number) => void;
  setAudioChunks: (chunks: Blob[]) => void;
  setAudio: (audio: string | null) => void;
  reset: () => void;
}

const initialState: RecordingState = {
  permission: false,
  stream: null,
  recordingStatus: "inactive",
  audioLevel: 0,
  progress: 0,
  audioChunks: [],
  audio: null,
};

export const useRecordingStore = create<RecordingState & RecordingActions>((set) => ({
  ...initialState,
  setPermission: (permission) => set({ permission }),
  setStream: (stream) =>
    set((state) => {
      if (state.stream) {
        state.stream.getTracks().forEach((track) => track.stop());
      }
      return { permission: true, stream };
    }),
  stopStream: () =>
    set((state) => {
      if (state.stream) {
        state.stream.getTracks().forEach((track) => track.stop());
      }
      return { stream: null };
    }),
  setRecordingStatus: (status) => set({ recordingStatus: status }),
  setAudioLevel: (level) => set({ audioLevel: level }),
  setProgress: (fn) => set((state) => ({ progress: fn(state.progress) })),
  setProgessValue: (value) => set({ progress: value }),
  setAudioChunks: (chunks) => set({ audioChunks: chunks }),
  setAudio: (audio) => set({ audio }),
  reset: () => set({ ...initialState }),
}));

type SpeakingTestState = {
  testState: EnumSimulatedTestSessionStatus;
  position: {
    part: number;
    question: number;
  };
  mode: EnumMode | null;
  showInstruction: boolean;
  speakingSources: string[];
};

type SpeakingTestActions = {
  setTestState: (state: EnumSimulatedTestSessionStatus) => void;
  navigateToPart: (questionNo: number, partNo: number) => void;
  addSpeakingSource: (source: string) => void;
  setInitialPart: (part: number) => void;
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
  reset: () => set({ ...initialTestState }),
}));
