import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import ExitDialog from "@/components/organisms/simulated-test-dialog/exit-dialog";
import StartDialog from "@/components/organisms/simulated-test-dialog/start-dialog";
import { Button } from "@/components/ui";
import useCountdown from "@/hooks/use-countdown";

type HeaderProps = {
  currentPart: number;
};
export default function Header({ currentPart }: HeaderProps) {
  const { time, resume, isEnd } = useCountdown(60 * 40); // 40 minutes
  const { t } = useTranslation("simulatedTest");
  useEffect(() => {
    if (isEnd) {
      // TODO: submit the test
    }
  }, [isEnd]);

  return (
    <>
      <StartDialog onClose={() => resume()} />
      <div className="grid h-20 w-full place-items-center border-b bg-white px-8 shadow-sm">
        <div className="flex flex-col items-center">
          <h6 className="text-lg font-bold uppercase">Reading passage {currentPart}</h6>
          <div className="text-sm font-semibold text-neutral-300">Road to IELTS - test 1</div>
        </div>
        <ExitDialog
          triggerButton={
            <Button className="absolute left-8" variant="ghost">
              <ChevronLeft size={20} />
              {t("exitDialog.exitBtn")}
            </Button>
          }
        />

        <div className="absolute right-8 w-24 rounded-md bg-secondary p-2 text-center text-lg font-bold text-secondary-foreground">
          {time}
        </div>
      </div>
    </>
  );
}
