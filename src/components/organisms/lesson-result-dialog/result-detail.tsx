import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import TooltipWrapper from "@/components/molecules/tooltip-wrapper";
import { Card, CardTitle } from "@/components/ui";
import useDailyLessonStore from "@/hooks/zustand/use-daily-lesson-store";
import { cn } from "@/lib/utils";

import { DialogClose, DialogHeader, DialogTitle } from "../../ui/dialog";

type ResultDetailProps = {
  setResultDetail: (value: boolean) => void;
};

const ResultDetail = ({ setResultDetail }: ResultDetailProps) => {
  const { history } = useDailyLessonStore();

  const { t } = useTranslation("dailyLesson");
  return (
    <div className="relative flex flex-col space-y-2 p-8">
      <DialogClose className="absolute right-0 top-0 m-4" onClick={() => setResultDetail(false)}>
        <X className="size-6" />
      </DialogClose>
      <DialogHeader className="flex w-full flex-row items-center justify-center">
        <DialogTitle className="text-center">{t("result.detail")}</DialogTitle>
      </DialogHeader>
      {history.length === 0 ? (
        <div className="flex grow flex-col items-center justify-center">
          <p className="text-center text-heading-4 font-semibold">{t("result.noDetail")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 place-content-stretch place-items-stretch gap-4 overflow-y-scroll">
          {history.map((item) => {
            const content = Object.keys(item.answer);
            return content.map((key, index) => (
              <ResultDetailTooltip
                key={index}
                triggerNode={
                  <ResultDetailCard
                    title={key}
                    correct={
                      Array.isArray(item.answer[key]) && Array.isArray(item.result[key])
                        ? item.answer[key].join(", ") === item.result[key].join(", ")
                        : item.answer[key] === item.result[key]
                    }
                  />
                }
              >
                <div className="relative mt-2 flex size-full flex-col justify-center rounded-lg">
                  <div className="relative rounded-lg border border-neutral-100 bg-white p-4">
                    <div className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rotate-45 border border-b-0 border-r-0 border-neutral-100 bg-white" />
                    <div className="flex w-full flex-col space-y-4">
                      <div className="flex h-fit w-full flex-col">
                        <p className="text-body font-semibold text-black">
                          {t("result.yourAnswer")}
                        </p>
                        <p className="text-body font-normal text-black">{item.answer[key]}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-body font-semibold text-black">{t("result.result")}</p>
                        <p className="text-body font-normal text-black">{item.result[key]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ResultDetailTooltip>
            ));
          })}
        </div>
      )}
    </div>
  );
};

type ResultDetailTooltipProps = {
  triggerNode: React.ReactNode;
  children: React.ReactNode;
};

const ResultDetailTooltip = ({ triggerNode, children }: ResultDetailTooltipProps) => {
  return (
    <TooltipWrapper
      triggerNode={triggerNode}
      contentNode={children}
      sideOffset={0}
      className="m-0 flex w-full min-w-[430px] bg-transparent p-0 backdrop-blur-none"
    />
  );
};

const ResultDetailCard = ({ title, correct }: { title: string; correct: boolean }) => {
  const Icon = correct ? Check : X;
  return (
    <Card
      className={cn(
        "h-full w-full flex flex-row items-center justify-start p-4 rounded-md space-x-2 cursor-pointer shadow-none",
        correct ? "bg-green-surface" : "bg-red-surface"
      )}
    >
      <Icon
        className={cn(
          "size-6 p-1 shrink-0 rounded-full text-[#F9F7F7]",
          correct ? "] bg-green" : " bg-red"
        )}
        strokeWidth={3}
      />

      <CardTitle className="text-wrap text-left text-body font-semibold">{title}</CardTitle>
    </Card>
  );
};

export default ResultDetail;
