/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { useMicrophone } from "@/components/providers/microphone-permission-provider";

import { useToast } from "./use-toast";
import { useRecordingStore } from "./zustand/use-speaking-test";

function useAudioRecording({
  onStop,
}: {
  onStop?: (src: { audioBlob: Blob; audioUrl: string }) => void;
} = {}) {
  // Make sure this hook only works inside MicrophonePermissionProvider
  const { stream, requestPermission } = useMicrophone();
  const { listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
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
  const { toast } = useToast();

  const mimeType = "audio/webm";

  const startRecording = useCallback(async () => {
    setRecordingStatus("recording");
    setAudio(null);
    setAudioChunks([]);

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
  }, [setAudio, setAudioChunks, setRecordingStatus, stream]);

  const stopRecording = useCallback(() => {
    if (listening) SpeechRecognition.stopListening();
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

  if (!browserSupportsSpeechRecognition) {
    toast({
      title: "Browser does not support speech recognition",
      variant: "destructive",
    });
  }

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
