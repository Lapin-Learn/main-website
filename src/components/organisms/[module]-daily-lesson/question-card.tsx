import AudioPlayer from "@/components/molecules/audio-player";
import { RiveSound } from "@/components/molecules/rive/sound";
import { Typography } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
import { EnumDLContentType } from "@/lib/enums";
import { DLQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

const QuestionCard = () => {
  const {
    lessonState: { currentQuestion, isAudioPlaying },
  } = useDailyLessonStore();
  if (!currentQuestion?.question) return null;
  const { content, audioId, audio } = currentQuestion.question as DLQuestion;
  if (currentQuestion.question.contentType === EnumDLContentType.PRONOUNCIATION)
    return (
      <div className="md:max-w-1/2 flex h-2/3 flex-row items-center justify-center gap-2">
        <div className="size-6">
          <RiveSound />
        </div>
        <Typography variant="h3" className="text-center">
          {content.question}
        </Typography>
      </div>
    );
  return (
    <div className="w-full px-4 md:px-56">
      {audioId && audio?.url && (
        <AudioPlayer
          src={audio.url}
          isAudioPlaying={isAudioPlaying}
          className="h-12 w-full rounded-xl"
        />
      )}
      {content.paragraph && (
        <ScrollArea className="h-60 rounded-xl border bg-white px-4">
          <p className="my-4">{content.paragraph}</p>
        </ScrollArea>
      )}
      {content.question && (
        <p className={cn("my-4 font-semibold text-center")}>{content.question}</p>
      )}
    </div>
  );
};

export default QuestionCard;
