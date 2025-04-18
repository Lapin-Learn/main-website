import AudioPlayer from "@/components/molecules/audio-player";
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

  if (currentQuestion.question.contentType === EnumDLContentType.PRONOUNCIATION) return null;

  return (
    <div className="mt-4 w-full px-4 md:px-56">
      {audioId && audio?.url && (
        <AudioPlayer
          src={audio.url}
          isAudioPlaying={isAudioPlaying}
          className="h-12 w-full rounded-xl"
        />
      )}
      {content.paragraph && (
        <ScrollArea className="h-60 rounded-lg border bg-white px-2 md:rounded-xl md:px-4">
          <p className="my-2 md:my-4">{content.paragraph}</p>
        </ScrollArea>
      )}
      {content.question && (
        <p className={cn("my-2 md:my-4 font-semibold text-center")}>{content.question}</p>
      )}
    </div>
  );
};

export default QuestionCard;
