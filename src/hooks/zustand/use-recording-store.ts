import { create } from "zustand";

import { EnumSimulatedTestSessionStatus } from "@/lib/enums";

export type RecordingStatus = "inactive" | "recording";

interface SpeakingState {
  testState: EnumSimulatedTestSessionStatus;
  permission: boolean;
  stream: MediaStream | null;
  recordingStatus: RecordingStatus;
  audioChunks: Blob[];
  audio: string | null;
}

interface SpeakingActions {
  setTestState: (state: EnumSimulatedTestSessionStatus) => void;
  setPermission: (permission: boolean) => void;
  setStream: (stream: MediaStream) => void;
  stopStream: () => void;
  setRecordingStatus: (status: RecordingStatus) => void;
  setAudioChunks: (chunks: Blob[]) => void;
  setAudio: (audio: string | null) => void;
  reset: () => void;
}

const initialState: SpeakingState = {
  testState: EnumSimulatedTestSessionStatus.NOT_STARTED,
  permission: false,
  stream: null,
  recordingStatus: "inactive",
  audioChunks: [],
  audio: null,
};

export const useSpeakingStore = create<SpeakingState & SpeakingActions>((set) => ({
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
  reset: () =>
    set({
      testState: EnumSimulatedTestSessionStatus.NOT_STARTED,
      stream: null,
      recordingStatus: "inactive",
      audioChunks: [],
      audio: null,
    }),
}));
