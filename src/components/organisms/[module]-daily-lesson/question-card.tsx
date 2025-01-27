import AudioPlayer from "@/components/molecules/audio-player";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
import { EnumDLContentType } from "@/lib/enums";
import { DLQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

const QuestionCard = () => {
  const {
    lessonState: { currentQuestion },
  } = useDailyLessonStore();
  if (!currentQuestion?.question) return null;
  const { content, audioId, audio } = currentQuestion.question as DLQuestion;
  return (
    <div>
      {audioId && audio?.url && <AudioPlayer src={audio.url} />}
      {content.paragraph && (
        <ScrollArea className="h-60 rounded-md border bg-white px-4">
          <p className="my-4">{content.paragraph}</p>
        </ScrollArea>
      )}
      {content.question && (
        <p
          className={cn(
            "my-4 font-semibold",
            currentQuestion.question.contentType == EnumDLContentType.MULTIPLE_CHOICE &&
              "text-center"
          )}
        >
          {content.question}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
