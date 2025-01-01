import { AudioLines } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui";
import AudioRipple from "@/components/ui/audio-ripple";

import { AudioProgress } from "./audio-progress";

type SpeakingAudioPlayerProps = {
  audioSrc: string;
};

const SpeakingAudioPlayer = ({ audioSrc }: SpeakingAudioPlayerProps) => {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioSrc, audioRef]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleAudioEnded = () => {
    setProgress(0);
  };

  return (
    <div className="relative h-full w-fit overflow-visible">
      <AudioRipple audioLevel={60} />
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
            className="absolute-center z-10 size-16 rounded-full bg-white shadow-xl transition-colors hover:bg-neutral-50"
          >
            <AudioLines color="#A9421C" className="size-8" />
          </Button>
        </AudioProgress>
      </div>
      <audio
        ref={audioRef}
        src={audioSrc || ""}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />
    </div>
  );
};

export default SpeakingAudioPlayer;
