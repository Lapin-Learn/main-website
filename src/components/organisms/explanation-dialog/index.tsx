import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";

export const ExplanationDialog = () => {
  const {
    lessonState: { currentQuestion },
    showExplanation,
    setShowExplanation,
  } = useDailyLessonStore();
  const { t } = useTranslation("question");

  return (
    <Dialog
      open={showExplanation}
      onOpenChange={(open) => {
        setShowExplanation(open);
      }}
    >
      <DialogContent className="max-h-[560px] max-w-4xl gap-6">
        <DialogHeader>
          <DialogTitle>
            <h4 className="text-heading-4 font-semibold">{t("explanation.title")}</h4>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[380px] overflow-y-auto">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: currentQuestion?.question?.explanation as string }}
          />
        </div>
        <DialogFooter className="items-end md:w-full md:justify-center">
          <Button
            variant="black"
            size="2xl"
            className="w-full"
            onClick={() => setShowExplanation(false)}
          >
            {t("explanation.understood")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
