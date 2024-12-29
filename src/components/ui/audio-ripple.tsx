import React from "react";

interface AudioRippleProps {
  minWidth?: number;
  maxWidth?: number;
  numCircles?: number;
  audioLevel?: number;
}

const AudioRipple = React.memo(function AudioRipple({
  audioLevel = 0,
  minWidth = 0,
  maxWidth = 60,
  numCircles = 6,
}: AudioRippleProps) {
  const circles = Array.from({ length: numCircles });
  const scaledSize = Math.min(maxWidth, Math.max(minWidth, audioLevel * 1));

  return (
    <div className="absolute-center text-center">
      <div className="relative size-24">
        {circles.map((_, index) => (
          <div
            key={index}
            className="ripple-circle absolute-center bg-secondary"
            style={{
              width: `${scaledSize}px`,
              height: `${scaledSize}px`,
              opacity: 0.8 - index * 0.2,
              animationDelay: `${index * 0.3}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
});

export default AudioRipple;
