import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas-lite";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export const HeroBanner = () => {
  const { t } = useTranslation("landingPage");
  const { rive, RiveComponent } = useRive({
    src: "hero_banner.riv",
    stateMachines: "main",
    autoplay: false,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (rive) {
          if (entry.isIntersecting) {
            rive.play();
          } else {
            rive.reset({
              stateMachines: "main",
            });
          }
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (ref && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rive]);

  return (
    <div className="relative flex h-[800px] w-full flex-col items-center justify-center bg-linear-hero-banner px-4 py-20 md:h-screen md:px-20 md:py-40">
      <div className="flex h-full flex-col items-center gap-8 md:grid md:grid-cols-12 md:gap-6">
        <div className="bg-red z-10 col-start-1 flex h-fit flex-col gap-5 md:col-span-5 md:col-start-2 md:gap-10">
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
            to="/log-in"
            className="w-fit rounded-full bg-red-yellow-linear px-5 py-3 hover:opacity-90 md:px-6 md:py-3.5"
          >
            <div className="flex items-center gap-2 text-white">
              <p className="font-medium">{t("heroBanner.registerNow")}</p>
              <ArrowRight className="size-6" />
            </div>
          </Link>
        </div>
        <div
          className="pointer-events-none z-10 col-span-1 flex size-full flex-1 flex-col items-center justify-center shadow-sm md:col-span-6 md:col-start-7"
          ref={ref}
        >
          <RiveComponent />
        </div>
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
