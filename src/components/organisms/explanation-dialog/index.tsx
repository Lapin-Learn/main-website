import parse from "html-react-parser";
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
      <DialogContent className="gap-2 md:h-[500px]">
        <DialogHeader>
          <DialogTitle>
            <h4 className="text-heading-4 font-semibold">{t("explanation.title")}</h4>
          </DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto">
          {parse(currentQuestion?.question?.explanation ?? "")}
        </div>
        <DialogFooter className="items-end md:w-full md:justify-center">
          <Button variant="black" className="w-full" onClick={() => setShowExplanation(false)}>
            {t("explanation.understood")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
