import { PauseIcon, PlayIcon } from "lucide-react";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

import Icons from "@/assets/icons";
import { cn, formatTime } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";

type AudioPlayerProps = {
  className?: string;
  /**
   * If true, the audio player can be paused, i.e. the audio will stop playing when the component is mounted
   */
  pausable?: boolean;
  /**
   * If true, the audio player can be played automatically, i.e. the audio will start playing when the component is mounted and the audio src is loaded
   */
  autoplay?: boolean;
  /**
   * If true, the audio player can be seeked, i.e. the user can change the current time of the audio
   */
  seekable?: boolean;
  /**
   * The audio source URL
   */
  src: string;
  isAudioPlaying?: boolean;
};

const AudioPlayer = ({
  className,
  pausable = true,
  autoplay = true,
  seekable = true,
  isAudioPlaying,
  src,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1); // Volume range: 0 to 1
  const [duration, setDuration] = useState<number>(0); // State to store audio duration
  const [currentTime, setCurrentTime] = useState<number>(0); // State to store current time
  const [isCanPlayThrough, setIsCanPlayThrough] = useState<boolean>(false);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration !== Infinity) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const playAudio = () => {
    if (!pausable) return;
    if (audioRef.current && audioRef.current.duration) {
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

  const handleSeek = (values: number[]) => {
    if (!seekable) return;
    const newTime = parseFloat(values[0].toFixed(1));
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleLoadedMetadata = (event: SyntheticEvent<HTMLAudioElement>) => {
    setDuration(event.currentTarget.duration);
    if (autoplay) {
      playAudio();
    }
  };

  useEffect(() => {
    if (currentTime >= duration) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentTime, duration]);

  useEffect(() => {}, [audioRef.current?.duration]);

  useEffect(() => {
    if (!isAudioPlaying) {
      pauseAudio();
    }
  }, [isAudioPlaying]);

  return (
    <div className={cn("flex w-full items-center space-x-3 bg-white p-8", className)}>
      <button
        onClick={isPlaying ? pauseAudio : playAudio}
        type="button"
        className="size-5 [&_svg]:fill-primary-700 [&_svg]:text-primary-700"
        disabled={!isCanPlayThrough}
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
      <div className="w-20 text-sm text-neutral-400">{`${formatTime(currentTime)}/${duration && duration !== Infinity ? formatTime(duration) : "--:--"}`}</div>
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="size-5 [&_svg]:text-neutral-400">
            {volume == 0 ? (
              <Icons.VolumeOff width={20} height={20} />
            ) : (
              <Icons.Volume width={20} height={20} />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-10 p-2">
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
      <audio
        ref={audioRef}
        src={src}
        hidden
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={() => setIsCanPlayThrough(true)}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />
    </div>
  );
};

export default AudioPlayer;
