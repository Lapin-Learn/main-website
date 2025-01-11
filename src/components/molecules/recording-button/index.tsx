import { AudioLines, Square } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

import SpeakingIcon from "@/assets/icons/skills/speaking-filled";
import { Button } from "@/components/ui";
import AudioRipple from "@/components/ui/audio-ripple";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useRecordingStore } from "@/hooks/zustand/use-speaking-test";
import { AudioSource } from "@/lib/types";

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
  onStop?: (src: AudioSource) => void;
  disabled?: boolean;
};

const RecordingButton = forwardRef<HTMLButtonElement, RecordingButtonProps>(
  ({ duration, playBack = false, onStart, onStop, disabled }: RecordingButtonProps, ref) => {
    const {
      startRecording,
      stopRecording,
      updateAudioLevel,
      audioContextRef,
      analyserRef,
      dataArrayRef,
    } = useAudioRecording({
      onStop,
    });
    const {
      audio,
      audioLevel,
      setProgressValue,
      setAudioLevel,
      progress,
      setProgress,
      permission,
      recordingStatus,
      stream,
    } = useRecordingStore();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleStartRecording = () => {
      if (onStart) {
        onStart();
      }
      startRecording();
    };

    const handleStopRecording = () => {
      stopRecording();
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
      if (audioRef.current && recordingStatus === "inactive") {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgressValue((currentTime / duration) * 100);
      }
    };

    const handleAudioEnded = () => {
      setIsPlaying(false);
      setProgressValue(0);
    };

    useEffect(() => {
      if (recordingStatus === "recording") {
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
        const intervalDuration = 100;
        const progressIncrement = 100 / (duration * 10);

        intervalRef.current = setInterval(() => {
          setProgress((prev: number) => {
            if (prev >= 100) {
              clearInterval(intervalRef.current!);
              handleStopRecording();
              return 100;
            }
            return prev + progressIncrement;
          });
        }, intervalDuration);

        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        };
      } else {
        setProgressValue(0);
        setAudioLevel(0);
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        analyserRef.current = null;
        dataArrayRef.current = null;
      }
    }, [recordingStatus, stopRecording, duration, intervalRef]);

    useEffect(() => {
      if (audio && audioRef.current) {
        setIsPlaying(true);
        audioRef.current.play();
      }
    }, [audio, audioRef]);

    return (
      <div className="relative flex h-full w-fit flex-col justify-center overflow-visible">
        {(recordingStatus === "recording" || isPlaying) && (
          <AudioRipple
            audioLevel={recordingStatus === "recording" ? audioLevel : isPlaying ? 60 : 0}
          />
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
                  : recordingStatus === "recording"
                    ? handleStopRecording
                    : handleStartRecording
              }
              disabled={!permission || disabled}
              className="absolute-center z-10 size-16 rounded-full bg-white shadow-xl transition-colors hover:bg-neutral-50"
              ref={ref}
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
  }
);

export default RecordingButton;
