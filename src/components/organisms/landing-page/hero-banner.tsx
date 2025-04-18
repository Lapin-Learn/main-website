import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

import { RiveHeroBanner } from "@/components/rive/hero-banner";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

type HeroBannerProps = {
  isLoggedIn?: boolean;
};
export const HeroBanner = ({ isLoggedIn = false }: HeroBannerProps) => {
  const { t } = useTranslation("landingPage");

  return (
    <div className="relative flex h-[800px] w-full flex-col items-center justify-center bg-linear-hero-banner px-4 py-20 md:h-screen md:px-20 md:py-40">
      <div className="flex h-full flex-col items-center gap-6 md:grid md:grid-cols-12 md:gap-6">
        <div className="z-10 col-start-1 flex h-fit flex-col gap-5 md:col-span-5 md:col-start-2 md:gap-10">
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
          <Link
            to={isLoggedIn ? "/daily-lesson" : "/sign-up"}
            className="w-fit rounded-full bg-red-yellow-linear px-5 py-3 hover:opacity-90 md:px-6 md:py-3.5"
          >
            <div className="flex items-center gap-2 text-white">
              <p className="font-medium">
                {isLoggedIn ? t("navBar.start") : t("heroBanner.registerNow")}
              </p>
              <ArrowRight className="size-6" />
            </div>
          </Link>
        </div>
        <RiveHeroBanner
          className="pointer-events-none z-10 col-span-1 flex size-full flex-1 flex-col items-center justify-center md:col-span-6 md:col-start-7"
          fallback={<img src="/fallback_rive/hero-banner.svg" alt="hero-banner" />}
        />
        <InteractiveGridPattern
          height={64}
          width={64}
          squares={[80, 80]}
          squaresClassName="hover:fill-orange-100"
        />
      </div>
    </div>
  );
};
