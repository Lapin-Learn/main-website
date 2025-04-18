import { Typography } from "@/components/ui";
import useBreakPoint from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";

const Transcript = ({
  orginalQuestion,
  correctLetters = [],
  orginalIPATranscript,
}: {
  orginalQuestion: string;
  correctLetters?: number[];
  orginalIPATranscript: string;
}) => {
  const isMobile = useBreakPoint() === "xs";
  const splitText = orginalQuestion.split(" ");
  const splitIPA = orginalIPATranscript.split(" ");
  const getColor = (index: number) => {
    if (index < correctLetters.length) {
      if (correctLetters[index] === 0) {
        return "text-red";
      } else if (correctLetters[index] === 2) {
        return "text-green";
      } else if (correctLetters[index] === 1) {
        return "text-orange-400";
      }
    }
    return "";
  };

  return (
    <div className="md:max-w-1/2 flex flex-col items-center justify-center gap-2">
      {/* TODO: handle audio source */}
      {/* <div className="size-24">
        <RiveSound />
      </div> */}
      <Typography variant={isMobile ? "h3" : "h2"} className="text-center font-medium">
        {splitText.map((word, index) => {
          return (
            <>
              <span key={index} className={cn("inline-block", getColor(index))}>
                {word}
              </span>
              &nbsp;
            </>
          );
        })}
      </Typography>
      {orginalIPATranscript && (
        <Typography variant={isMobile ? "h5" : "h4"} className="text-center font-normal opacity-80">
          {splitIPA.map((word, index) => {
            return (
              <>
                <span key={index} className={cn("inline-block", getColor(index))}>
                  {word}
                </span>
                &nbsp;
              </>
            );
          })}
        </Typography>
      )}
    </div>
  );
};

export default Transcript;
