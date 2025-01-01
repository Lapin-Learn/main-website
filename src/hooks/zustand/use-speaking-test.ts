import { create } from "zustand";

import { EnumMode, EnumSimulatedTestSessionStatus } from "@/lib/enums";

export type RecordingStatus = "inactive" | "recording";

interface RecordingState {
  testState: EnumSimulatedTestSessionStatus;
  permission: boolean;
  stream: MediaStream | null;
  recordingStatus: RecordingStatus;
  audioChunks: Blob[];
  audio: string | null;
}

interface RecordingActions {
  setTestState: (state: EnumSimulatedTestSessionStatus) => void;
  setPermission: (permission: boolean) => void;
  setStream: (stream: MediaStream) => void;
  stopStream: () => void;
  setRecordingStatus: (status: RecordingStatus) => void;
  setAudioChunks: (chunks: Blob[]) => void;
  setAudio: (audio: string | null) => void;
  reset: () => void;
}

const initialState: RecordingState = {
  testState: EnumSimulatedTestSessionStatus.NOT_STARTED,
  permission: false,
  stream: null,
  recordingStatus: "inactive",
  audioChunks: [],
  audio: null,
};

export const useRecordingStore = create<RecordingState & RecordingActions>((set) => ({
  ...initialState,
  setTestState: (state) => set({ testState: state }),
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
  setAudioChunks: (chunks) => set({ audioChunks: chunks }),
  setAudio: (audio) => set({ audio }),
  reset: () => set({ ...initialState }),
}));

type SpeakingTestState = {
  position: {
    part: number;
    question: number;
  };
  mode: EnumMode | null;
  showInstruction: boolean;
  speakingSources: string[];
};

type SpeakingTestActions = {
  navigateToPart: (questionNo: number, partNo: number) => void;
  addSpeakingSource: (source: string) => void;
  reset: () => void;
};

const initialTestState: SpeakingTestState = {
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
  reset: () => set({ ...initialTestState }),
}));
