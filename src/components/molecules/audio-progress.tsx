import { cn } from "@/lib/utils";

interface Props {
  max?: number;
  value: number;
  min?: number;
  gaugePrimaryColor?: string;
  gaugeSecondaryColor?: string;
  className?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
  hideProgress?: boolean;
}

export function AudioProgress({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor = "#FCE3B4",
  gaugeSecondaryColor = "#EFEFEF",
  className,
  children,
  hideProgress = false,
}: Props) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div
      className={cn("relative size-20 text-sm font-semibold", className)}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--transition-length": "0.5s",
          "--transition-step": "50ms",
          "--delay": "0s",
          "--percent-to-deg": "3.6deg",
          transform: "translateZ(0)",
        } as React.CSSProperties
      }
    >
      {!hideProgress && (
        <svg fill="none" className="size-full" strokeWidth="2" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="overflow-v opacity-100"
            style={
              {
                stroke: gaugeSecondaryColor,
                strokeDasharray: `${circumference} ${circumference}`,
                transform:
                  "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor)))) scaleY(-1)",
                transition: "all var(--transition-length) ease var(--delay)",
                transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              } as React.CSSProperties
            }
          />
          {currentPercent > 0 && (
            <circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="10"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-100"
              style={
                {
                  stroke: gaugePrimaryColor,
                  "--stroke-percent": currentPercent,
                  strokeDasharray:
                    "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                  transition:
                    "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
                  transitionProperty: "stroke-dasharray,transform",
                  transform:
                    "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
                  transformOrigin: "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
                } as React.CSSProperties
              }
            />
          )}
        </svg>
      )}
      {children}
    </div>
  );
}
