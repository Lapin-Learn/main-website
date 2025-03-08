/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

import { useMicrophone } from "@/components/providers/microphone-permission-provider";

import { useRecordingStore } from "./zustand/use-speaking-test";

function useAudioRecording({
  onStop,
}: {
  onStop?: (src: { audioBlob: Blob; audioUrl: string }) => void;
} = {}) {
  // Make sure this hook only works inside MicrophonePermissionProvider
  const { stream, requestPermission } = useMicrophone();
  const {
    audioChunks,
    setRecordingStatus,
    setAudioLevel,
    setProgressValue,
    setAudioChunks,
    setAudio,
  } = useRecordingStore();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioAnimationRef = useRef<number | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const [SpeechRecognition, setSpeechRecognition] = useState<any>(null);
  const [listening, setListening] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-speech-recognition").then((module) => {
        setSpeechRecognition(module.default);
        setListening(module.useSpeechRecognition().listening);
      });
    }
  }, []);

  const mimeType = "audio/webm";

  const startRecording = useCallback(async () => {
    setRecordingStatus("recording");
    setAudio(null);
    setAudioChunks([]);

    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }

    if (stream) {
      const media = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current = media;
      mediaRecorder.current.start();

      const localAudioChunks: Blob[] = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
    } else {
      if (requestPermission) {
        await requestPermission();
      }
    }
  }, [listening, setAudio, setAudioChunks, setRecordingStatus, stream]);

  const stopRecording = useCallback(() => {
    if (SpeechRecognition) SpeechRecognition.stopListening();
    setAudioLevel(0);
    setRecordingStatus("inactive");
    setProgressValue(0);

    if (audioAnimationRef.current) {
      cancelAnimationFrame(audioAnimationRef.current);
    }

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current!.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
        setAudioChunks([]);
        if (onStop) {
          onStop({
            audioUrl,
            audioBlob,
          });
        }
      };
    }
  }, [audioChunks, setAudio, setAudioChunks, setRecordingStatus]);

  const updateAudioLevel = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
    setAudioLevel(average);
    audioAnimationRef.current = requestAnimationFrame(updateAudioLevel);
  }, []);

  return {
    startRecording,
    stopRecording,
    updateAudioLevel,
    audioContextRef,
    analyserRef,
    dataArrayRef,
  };
}

export default useAudioRecording;
