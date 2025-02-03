import React, { createContext, PropsWithChildren, useContext, useRef, useState } from "react";

import { ExtendedSpeakingResponse } from "./helpers";

interface SpeakingResourceContextProps {
  playAudio: ({
    question,
    part,
    realTimestamp,
  }: {
    question: number;
    part: number;
    realTimestamp?: number;
  }) => void;
  pauseAudio: () => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isCanPlayThrough: boolean;
  currentTime: number;
}

const SpeakingResourceContext = createContext<SpeakingResourceContextProps | undefined>(undefined);

export const SpeakingResourceProvider: React.FC<
  PropsWithChildren<{
    resource?: string;
    audioList: ExtendedSpeakingResponse[];
  }>
> = ({ children, resource }) => {
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0); // State to store current time
  const [isCanPlayThrough, setIsCanPlayThrough] = useState<boolean>(false);

  const playAudio = ({ realTimestamp }: { realTimestamp?: number }) => {
    if (audioRef.current) {
      setIsPlaying(true);
      if (realTimestamp || realTimestamp == 0) audioRef.current.currentTime = realTimestamp;
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <SpeakingResourceContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        isCanPlayThrough,
        playAudio,
        currentTime,
        pauseAudio,
      }}
    >
      {resource && (
        <audio
          ref={audioRef}
          src={resource}
          hidden
          onTimeUpdate={handleTimeUpdate}
          onCanPlay={() => setIsCanPlayThrough(true)}
          //   onLoadedMetadata={handleLoadedMetadata}
          preload="metadata"
        />
      )}
      {children}
    </SpeakingResourceContext.Provider>
  );
};

export const useSpeakingResource = (): SpeakingResourceContextProps => {
  const context = useContext(SpeakingResourceContext);
  if (!context) {
    throw new Error("useSpeakingResource must be used within a SpeakingResourceProvider");
  }
  return context;
};
