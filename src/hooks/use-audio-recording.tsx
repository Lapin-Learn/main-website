import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import { useToast } from "./use-toast";
import { useRecordingStore } from "./zustand/use-speaking-test";

function useAudioRecording({
  onStop,
}: {
  onStop?: (src: { audioBlob: Blob; audioUrl: string }) => void;
} = {}) {
  const {
    stream,
    setStream,
    audioChunks,
    setRecordingStatus,
    setAudioLevel,
    setProgressValue,
    setAudioChunks,
    setAudio,
  } = useRecordingStore();
  const { listening } = useSpeechRecognition();
  const { toast } = useToast();
  const { t } = useTranslation("simulatedTest");
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioAnimationRef = useRef<number | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const mimeType = "audio/webm";

  // TODO: Extract to a provider component => more reusable, only a few components need to use this
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
  }, [setStream, t, toast]);

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
      getMicrophonePermission();
    }
  }, [listening, setAudio, setAudioChunks, setRecordingStatus, stream]);

  const stopRecording = useCallback(() => {
    SpeechRecognition.stopListening();
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
    getMicrophonePermission,
    startRecording,
    stopRecording,
    updateAudioLevel,
    audioContextRef,
    analyserRef,
    dataArrayRef,
  };
}

export default useAudioRecording;
