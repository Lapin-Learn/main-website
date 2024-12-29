import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { useToast } from "./use-toast";
import { useSpeakingStore } from "./zustand/use-recording-store";

function useAudioRecording() {
  const { stream, setStream, audioChunks, setRecordingStatus, setAudioChunks, setAudio } =
    useSpeakingStore();
  const { listening } = useSpeechRecognition();
  const { toast } = useToast();
  const { t } = useTranslation("simulatedTest");
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const mimeType = "audio/webm";

  const getMicrophonePermission = useCallback(async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(streamData);
      } catch {
        toast({
          title: t("speaking.microphoneDeniedTitle"),
          description: t("speaking.microphoneDeniedDescription"),
        });
      }
    } else {
      toast({
        title: t("speaking.browserNotSupportTitle"),
        description: t("speaking.browserNotSupportDescription"),
      });
    }
  }, [setStream, toast]);

  const startRecording = useCallback(async () => {
    setRecordingStatus("recording");
    setAudio(null);
    setAudioChunks([]);

    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
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
      getMicrophonePermission();
    }
  }, [listening, setAudio, setAudioChunks, setRecordingStatus, stream]);

  const stopRecording = useCallback(() => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setAudioLevel(0);
    setRecordingStatus("inactive");

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
        setAudioChunks([]);
      };
    }
  }, [audioChunks, setAudio, setAudioChunks, setRecordingStatus]);

  const updateAudioLevel = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
    setAudioLevel(average);
    requestAnimationFrame(updateAudioLevel);
  }, []);

  return {
    getMicrophonePermission,
    startRecording,
    stopRecording,
    updateAudioLevel,
    isRecording,
    setIsRecording,
    audioLevel,
    setAudioLevel,
    audioContextRef,
    analyserRef,
    dataArrayRef,
  };
}

export default useAudioRecording;
