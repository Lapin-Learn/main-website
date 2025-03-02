import { Headphones, RotateCcw, Send, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import SpeakingIcon from "@/assets/icons/skills/speaking-filled";
import { AudioProgress } from "@/components/molecules/audio-progress";
import { useMicrophone } from "@/components/providers/microphone-permission-provider";
import { Button, Typography } from "@/components/ui";
import AudioRipple from "@/components/ui/audio-ripple";
import useAudioRecording from "@/hooks/use-audio-recording";
import { useRecordingStore } from "@/hooks/zustand/use-speaking-test";
import { AudioSource } from "@/lib/types";
import { cn } from "@/lib/utils";

type RecordingBarProps = {
  sendAudio: (audio: AudioSource) => void;
  disabled?: boolean;
};
const RecordingBar = (props: RecordingBarProps) => {
  const { sendAudio, disabled = false } = props;
  const { permission, stream } = useMicrophone();
  const [speakingSrc, setSpeakingSrc] = useState<AudioSource | null>(null);
  const {
    startRecording,
    stopRecording,
    updateAudioLevel,
    audioContextRef,
    analyserRef,
    dataArrayRef,
  } = useAudioRecording({
    onStop: (audioSrc) => {
      setSpeakingSrc(audioSrc);
    },
  });

  const { audio, audioLevel, setProgressValue, setAudioLevel, progress, recordingStatus, reset } =
    useRecordingStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartRecording = () => {
    startRecording();
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
  }, [recordingStatus, stopRecording, intervalRef]);

  const handlePlayback = () => {
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const handleRerecord = () => {
    reset();
    startRecording();
  };

  const handleSendAudio = () => {
    if (speakingSrc) {
      sendAudio(speakingSrc);
      reset();
    }
  };

  return (
    <div className="fixed bottom-0 grid w-full place-items-center border-t bg-white">
      <div className="grid h-40 w-fit grid-cols-3 place-items-center content-center gap-x-4 gap-y-3 md:h-56 md:gap-x-10 md:gap-y-6">
        <Button
          variant="outline"
          size="icon"
          className="size-14 rounded-full p-1 disabled:hidden md:size-16"
          disabled={!audio || disabled}
          onClick={handleRerecord}
        >
          <RotateCcw className="size-5" />
        </Button>
        <div className="relative col-start-2 flex h-full w-fit flex-col justify-center overflow-visible">
          {(recordingStatus === "recording" || isPlaying) && (
            <AudioRipple
              audioLevel={recordingStatus === "recording" ? audioLevel : isPlaying ? 60 : 0}
            />
          )}
          <div className="z-0 overflow-visible">
            <AudioProgress
              value={progress}
              hideProgress
              max={100}
              min={0}
              gaugePrimaryColor="#FCE3B4"
              gaugeSecondaryColor="#EFEFEF"
            >
              {audio ? (
                <Button
                  variant="secondary"
                  className="absolute-center z-10 size-20 rounded-full shadow md:size-24 md:shadow-xl"
                  onClick={handleSendAudio}
                  disabled={disabled}
                >
                  <Send size={32} />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={
                    isPlaying
                      ? handlePlayPause
                      : recordingStatus === "recording"
                        ? stopRecording
                        : handleStartRecording
                  }
                  disabled={permission !== "granted" || disabled}
                  className="absolute-center z-10 size-20 rounded-full bg-white shadow transition-colors hover:bg-neutral-50 md:size-24 md:shadow-xl"
                >
                  {recordingStatus === "recording" ? (
                    <Square fill="#A9421C" strokeWidth={0} className="size-6 md:size-8" />
                  ) : (
                    <SpeakingIcon className="size-6 md:size-8" />
                  )}
                </Button>
              )}
            </AudioProgress>
          </div>
          {
            <audio
              ref={audioRef}
              src={audio || ""}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleAudioEnded}
            />
          }
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-14 rounded-full p-1 disabled:hidden md:size-16"
          disabled={!audio || disabled}
          onClick={handlePlayback}
        >
          <Headphones className="size-5" />
        </Button>
        <Typography
          className={cn("text-center text-muted-foreground", (!audio || disabled) && "hidden")}
        >
          Thu âm lại
        </Typography>
        <Typography className="col-start-2 text-center text-muted-foreground">
          {!audio ? "Thu âm" : "Gửi"}
        </Typography>
        <Typography
          className={cn(
            "col-start-3 text-center text-muted-foreground",
            (!audio || disabled) && "hidden"
          )}
        >
          Nghe lại
        </Typography>
      </div>
    </div>
  );
};

export default RecordingBar;
