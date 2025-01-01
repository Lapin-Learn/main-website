import { AudioLines, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import SpeakingIcon from "@/assets/icons/skills/speaking-filled";
import { Button } from "@/components/ui";
import AudioRipple from "@/components/ui/audio-ripple";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useRecordingStore, useSpeakingTestState } from "@/hooks/zustand/use-speaking-test";

import { AudioProgress } from "../audio-progress";

declare global {
  interface Window {
    AudioContext: AudioContext;
    webkitAudioContext: AudioContext;
  }
}

type RecordingButtonProps = {
  duration: number;
  playBack?: boolean;
  onStart?: () => void;
  onStop?: () => void;
};

const RecordingButton = ({ duration, playBack = false, onStart, onStop }: RecordingButtonProps) => {
  const {
    startRecording,
    stopRecording,
    updateAudioLevel,
    isRecording,
    audioLevel,
    setAudioLevel,
    progress,
    setProgress,
    audioContextRef,
    analyserRef,
    dataArrayRef,
  } = useAudioRecording();
  const { audio, permission, recordingStatus, stream } = useRecordingStore();
  const { addSpeakingSource } = useSpeakingTestState();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartRecording = () => {
    if (onStart) {
      onStart();
    } else {
      startRecording();
    }
  };

  const handleStopRecording = () => {
    if (onStop) {
      onStop();
    } else {
      stopRecording();
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isRecording) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  useEffect(() => {
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

      if (stream) {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        updateAudioLevel();
      }

      //TODO: Handle unlimited recording
      intervalRef.current = setInterval(
        () => {
          setProgress((prev) => {
            if (prev >= (duration * 1000) / 100) {
              clearInterval(intervalRef.current!);
              handleStopRecording();
              return (duration * 1000) / 100;
            }
            return prev + 1;
          });
        },
        (duration * 1000) / 100
      );

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      setProgress(0);
      setAudioLevel(0);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      dataArrayRef.current = null;
    }
  }, [isRecording, stopRecording, duration, intervalRef]);

  useEffect(() => {
    if (audio && audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [audio, audioRef]);

  useEffect(() => {
    if (audio && !playBack) {
      addSpeakingSource(audio);
    }
  }, [audio, addSpeakingSource, playBack]);

  return (
    <div className="relative h-full w-fit overflow-visible">
      {(isRecording || isPlaying) && (
        <AudioRipple audioLevel={isRecording ? audioLevel : isPlaying ? 60 : 0} />
      )}
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
              playBack && isPlaying
                ? handlePlayPause
                : isRecording
                  ? handleStopRecording
                  : handleStartRecording
            }
            disabled={!permission}
            className="absolute-center z-10 size-16 rounded-full bg-white shadow-xl transition-colors hover:bg-neutral-50"
          >
            {playBack && isPlaying ? (
              <AudioLines color="#A9421C" className="size-8" />
            ) : recordingStatus === "recording" ? (
              <Square fill="#A9421C" strokeWidth={0} className="size-8" />
            ) : (
              <SpeakingIcon className="size-6" />
            )}
          </Button>
        </AudioProgress>
      </div>
      {playBack && (
        <audio
          ref={audioRef}
          src={audio || ""}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
        />
      )}
    </div>
  );
};

export default RecordingButton;
