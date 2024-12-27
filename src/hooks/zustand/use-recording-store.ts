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
  setStream: (stream: MediaStream | null) => void;
  setRecordingStatus: (status: RecordingStatus) => void;
  setAudioChunks: (chunks: Blob[]) => void;
  setAudio: (audio: string | null) => void;
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
  setStream: (stream) => set({ stream }),
  setRecordingStatus: (status) => set({ recordingStatus: status }),
  setAudioChunks: (chunks) => set({ audioChunks: chunks }),
  setAudio: (audio) => set({ audio }),
}));
