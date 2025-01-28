import AudioPlayer from "@/components/molecules/audio-player";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
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
      {audioId && audio?.url && <AudioPlayer src={audio.url} className="h-12 w-96 rounded-xl" />}
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
