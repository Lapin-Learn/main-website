import { create } from "zustand";

export type RecordingStatus = "inactive" | "recording";
export type TestState = "not-started" | "in-progress" | "finished";

interface SpeakingState {
  testState: TestState;
  permission: boolean;
  stream: MediaStream | null;
  recordingStatus: RecordingStatus;
  audioChunks: Blob[];
  audio: string | null;
}

interface SpeakingActions {
  setTestState: (state: TestState) => void;
  setPermission: (permission: boolean) => void;
  setStream: (stream: MediaStream) => void;
  stopStream: () => void;
  setRecordingStatus: (status: RecordingStatus) => void;
  setAudioChunks: (chunks: Blob[]) => void;
  setAudio: (audio: string | null) => void;
  reset: () => void;
}

export const useSpeakingStore = create<SpeakingState & SpeakingActions>((set) => ({
  testState: "not-started",
  permission: false,
  stream: null,
  recordingStatus: "inactive",
  audioChunks: [],
  audio: null,
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
      testState: "not-started",
      stream: null,
      recordingStatus: "inactive",
      audioChunks: [],
      audio: null,
    }),
}));
