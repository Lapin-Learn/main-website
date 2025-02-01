import { CheckIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import Star from "@/assets/icons/landing-page/star";
import { PulsatingButton } from "@/components/ui/pulsating-button";

export const AiAssistant = () => {
  const { t } = useTranslation("landingPage");
  return (
    <div className="relative flex max-h-screen w-full flex-col items-center justify-center bg-background px-4 py-9 md:px-32 md:py-20">
      <div className="flex size-full flex-col gap-6 rounded-3xl bg-[#D9F0FF] p-6 md:gap-10 md:px-16 md:py-12">
        <div className="flex flex-col gap-4 md:gap-5">
          <h3 className="text-heading-5 font-bold md:text-heading-3">{t("aiAssistant.title")}</h3>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-row gap-2">
                <div className="relative size-4 shrink-0 rounded-full bg-blue-500">
                  <CheckIcon strokeWidth={4} className="absolute-center size-2.5 text-white" />
                </div>
                <p className="text-small">{t(`aiAssistant.description.${index}`)}</p>
              </div>
            ))}
          </div>
        </div>
        <PulsatingButton
          className="w-fit rounded-full bg-[#1C64F2] px-5 py-2 hover:opacity-90 md:px-6 md:py-3.5"
          pulseStyle="rounded-full"
        >
          <p className="text-small font-medium">{t("aiAssistant.registerNow")}</p>
        </PulsatingButton>
      </div>
      <Star className="absolute bottom-36 left-8 hidden size-8 rotate-[-0.5rad] md:block" />
      <Star className="absolute bottom-12 left-10 hidden size-16 rotate-[0.4rad] md:block" />
      <Star className="absolute bottom-16 right-4 hidden size-16 rotate-[-0.5rad] md:block" />
      <Star className="absolute bottom-32 right-20 hidden size-3.5 rotate-12 md:block" />
      <Star className="absolute bottom-40 right-10 hidden size-8 rotate-12 md:block" />
    </div>
  );
};
