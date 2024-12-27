import { Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import MicrophoneIcon from "@/assets/icons/skills/microphone-filled";
import { Button } from "@/components/ui";
import AudioRipple from "@/components/ui/audioRipple";
import { useSpeakingStore } from "@/hooks/zustand/use-recording-store";

import { AudioProgress } from "../../organisms/audio-progress";

declare global {
  interface Window {
    AudioContext: AudioContext;
    webkitAudioContext: AudioContext;
  }
}

type RecordingButtonProps = {
  duration: number;
};

const RecordingButton = ({ duration }: RecordingButtonProps) => {
  const {
    permission,
    stream,
    recordingStatus,
    audioChunks,
    setPermission,
    setStream,
    setRecordingStatus,
    setAudioChunks,
    setAudio,
  } = useSpeakingStore();

  const { listening } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const mimeType = "audio/webm";

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (error) {
        alert("Permission denied.");
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
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
      alert("No stream available for recording.");
    }
  };

  const stopRecording = () => {
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
  };

  useEffect(() => {
    let animationFrameId: number | null = null;
    const updateAudioLevel = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
      setAudioLevel(average);
      animationFrameId = requestAnimationFrame(updateAudioLevel);
    };

    if (isRecording) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        updateAudioLevel();
      });

      //TODO: Handle unlimited recording
      const interval = setInterval(
        () => {
          setProgress((prev) => {
            if (prev >= (duration * 1000) / 100) {
              clearInterval(interval);
              stopRecording();
              return (duration * 1000) / 100;
            }
            return prev + 1;
          });
        },
        (duration * 1000) / 100
      );

      return () => {
        clearInterval(interval);
      };
    } else {
      setProgress(0);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      dataArrayRef.current = null;
      setAudioLevel(0);
    }
  }, [isRecording]);

  return (
    <div className="relative h-full w-fit overflow-visible">
      {isRecording && <AudioRipple audioLevel={audioLevel} />}
      <div className="z-0 overflow-visible">
        <AudioProgress
          value={progress}
          max={100}
          min={0}
          gaugePrimaryColor="#FCE3B4"
          gaugeSecondaryColor="#EFEFEF"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={
              permission ? (isRecording ? stopRecording : startRecording) : getMicrophonePermission
            }
            className="absolute-center z-10 size-16 rounded-full bg-white shadow-xl transition-colors hover:bg-neutral-50"
          >
            {recordingStatus === "recording" && (
              <Square fill="red" strokeWidth={0} className="size-8" />
            )}
            {recordingStatus === "inactive" && <MicrophoneIcon />}
          </Button>
        </AudioProgress>
      </div>
    </div>
  );
};

export default RecordingButton;
