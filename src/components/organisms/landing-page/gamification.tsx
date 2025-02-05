import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { RiveAboutUsIntroduce } from "@/components/rive/about-us-introduce";

import { GamificationItemList } from "./gamification-item-list";

const imgs: ReactNode[] = [
  <img
    src="/fallback_rive/gamification-0.svg"
    alt="gamification-lesson"
    className="max-h-[400px]"
  />,
  <img
    src="/fallback_rive/gamification-1.svg"
    alt="gamification-levelup"
    className="max-h-[400px]"
  />,
  <img src="/fallback_rive/gamification-2.svg" alt="gamification-shop" className="max-h-[400px]" />,
];

export const Gamification = () => {
  const { t } = useTranslation("landingPage");
  const [activeItem, setActiveItem] = useState<string>("0");

  useEffect(() => {
    const progressChanging = setInterval(() => {
      setActiveItem((prev) => {
        return ((parseInt(prev) + 1) % 3).toString();
      });
    }, 10000); // 10s
    return () => {
      clearInterval(progressChanging);
    };
  }, []);

  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-background px-4 py-6 md:max-h-screen md:px-20 md:py-12">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-12">
        <RiveAboutUsIntroduce
          variant={Number(activeItem)}
          fallback={imgs[Number(activeItem)]}
          className="col-span-1 flex min-h-[400px] flex-col items-center justify-center md:col-span-6 md:col-start-1"
        />
        <div className="col-span-1 flex flex-col justify-center gap-10 md:col-span-5 md:col-start-7">
          <h3 className="text-heading-5 font-bold md:text-heading-3">{t("gamification.title")}</h3>
          <GamificationItemList activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
      </div>
    </div>
  );
};
