import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

import { HeroBannerImage } from "@/assets/icons/landing-page/hero-banner-image";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export const HeroBanner = () => {
  const { t } = useTranslation("landingPage");
  return (
    <div className="relative flex h-[800px] w-full items-center justify-center bg-linear-hero-banner md:h-screen">
      <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-12 md:gap-4">
        <div className="hidden md:col-span-1 md:block" />
        <div className="z-10 col-span-1 flex h-fit flex-col gap-5 p-2 md:col-span-5 md:gap-10 md:p-10">
          <div className="flex flex-col gap-5">
            <HeroHighlight>
              <motion.h3
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: [20, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-heading-5 font-bold md:text-heading-2 md:leading-[48px]"
              >
                <Trans
                  i18nKey="landingPage:heroBanner.title"
                  components={[
                    <span className="text-orange-700" />,
                    <Highlight className="rounded-full bg-gradient-to-r from-secondary to-secondary px-2 py-0.5 italic md:px-4" />,
                  ]}
                />
              </motion.h3>
            </HeroHighlight>
            <p className="text-small md:text-xl">{t("heroBanner.description")}</p>
          </div>
          <button className="w-fit rounded-full bg-red-yellow-linear px-5 py-3 hover:opacity-90 md:px-6 md:py-3.5">
            <div className="flex items-center gap-2 text-white">
              <p className="font-medium">{t("heroBanner.registerNow")}</p>
              <ArrowRight className="size-6" />
            </div>
          </button>
        </div>
        <div className="z-10 col-span-1 flex h-fit flex-col items-center justify-center md:col-span-6">
          <HeroBannerImage className="h-fit w-[360px] md:w-[480px]" />
        </div>
        <div className="hidden md:col-span-1 md:block" />
        <InteractiveGridPattern
          width={64}
          height={64}
          squares={[80, 80]}
          squaresClassName="hover:fill-orange-200"
        />
      </div>
    </div>
  );
};
