import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import Icons from "@/assets/icons";
import { cn, formatTime } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Slider } from "../ui/slider";

type FakeAudioPlayerProps = {
  className?: string;
  seekable?: boolean;
  onClick?: VoidFunction;
  disabled?: boolean;
  isPlaying?: boolean;
  currentTime?: number;
  duration?: number;
  volume?: number;
  onChangeVolume: (volume: number[]) => void;
  onChangeCurrentTime: (currentTime: number[]) => void;
  onPlay?: VoidFunction;
  onPause?: VoidFunction;
};

const FakeAudioPlayer = ({
  className,
  volume = 1,
  onChangeVolume,
  disabled,
  isPlaying,
  currentTime = 0,
  duration,
  onChangeCurrentTime,
  onPlay,
  onPause,
}: FakeAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {}, [audioRef.current?.duration]);

  return (
    <div className={cn("flex w-full items-center space-x-3 bg-white p-8", className)}>
      <button
        onClick={isPlaying ? onPause : onPlay}
        type="button"
        className="size-5 [&_svg]:fill-primary-700 [&_svg]:text-primary-700"
        disabled={disabled}
      >
        {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
      </button>
      <Slider
        className="flex-1"
        min={0}
        max={duration}
        step={0.1}
        value={[currentTime]}
        onValueChange={onChangeCurrentTime}
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
              onValueChange={onChangeVolume}
            />
            <div className="mt-2 text-xs text-gray-400">{(volume * 100).toFixed(0)}%</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FakeAudioPlayer;
