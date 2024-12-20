import { PauseIcon, PlayIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import Icons from "@/assets/icons";
import { cn, formatTime } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";

const AUDIO_URL =
  "https://storage.googleapis.com/prep-storage-service/elements/elements/4fffd4ba72121ad9604d1282ff21e611-1727676956.mp3";

type AudioPlayerProps = {
  className?: string;
  /**
   * If true, the audio player can be paused, i.e. the audio will stop playing when the component is mounted
   */
  pausable?: boolean;
  /**
   * If true, the audio player can be played automatically, i.e. the audio will start playing when the component is mounted and the audio source is loaded
   */
  autoplay?: boolean;
  /**
   * If true, the audio player can be seeked, i.e. the user can change the current time of the audio
   */
  seekable?: boolean;
};

const AudioPlayer = ({
  className,
  pausable = true,
  autoplay = false,
  seekable = true,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1); // Volume range: 0 to 1
  const [duration, setDuration] = useState<number>(0); // State to store audio duration
  const [currentTime, setCurrentTime] = useState<number>(0); // State to store current time

  const handleCanPlayThrough = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const playAudio = () => {
    if (!pausable) return;
    if (audioRef.current) {
      audioRef.current.volume = volume; // Ensure volume is set
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (volumes: number[]) => {
    const newVolume = parseFloat(volumes[0].toFixed(2));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const getAudioDuration = (url: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
      });
      audio.addEventListener("error", (e) => {
        reject(e);
      });
    });
  };

  const handleSeek = (values: number[]) => {
    if (!seekable) return;
    const newTime = parseFloat(values[0].toFixed(1));
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      playAudio();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("canplaythrough", handleCanPlayThrough);
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  useEffect(() => {
    getAudioDuration(AUDIO_URL)
      .then((duration) => {
        setDuration(duration);
        if (autoplay) {
          playAudio();
        }
      })
      .catch((error) => console.error("Error loading audio duration:", error));
  }, [AUDIO_URL]);

  return (
    <div className={cn("flex w-full items-center space-x-3 bg-white p-8", className)}>
      <button
        onClick={isPlaying ? pauseAudio : playAudio}
        type="button"
        className="size-5 [&_svg]:fill-primary [&_svg]:text-primary"
      >
        {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
      </button>
      <Slider
        className="flex-1"
        min={0}
        max={duration}
        step={0.1}
        value={[currentTime]}
        onValueChange={handleSeek}
      />
      <div className="w-20 text-sm text-neutral-400">{`${formatTime(currentTime)}/${formatTime(duration)}`}</div>
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="size-5">
            {volume == 0 ? (
              <Icons.VolumeOff color="#7D7D7D" width={20} height={20} />
            ) : (
              <Icons.Volume color="#7D7D7D" width={20} height={20} />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-2">
          <div className="flex flex-col items-center gap-1">
            <Slider
              className="h-20"
              orientation="vertical"
              min={0}
              max={1}
              step={0.01}
              value={[volume]}
              onValueChange={handleVolumeChange}
            />
            <div className="mt-2 text-xs text-gray-400">{(volume * 100).toFixed(0)}%</div>
          </div>
        </PopoverContent>
      </Popover>
      <audio ref={audioRef} src={AUDIO_URL} hidden />
    </div>
  );
};

export default AudioPlayer;
