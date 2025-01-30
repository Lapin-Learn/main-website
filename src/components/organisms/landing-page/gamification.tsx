import GamificationImage from "@/assets/icons/landing-page/gamification-image";

import { AnimatedListDemo } from "./item-list";

export const Gamification = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background md:max-h-screen">
      <div className="grid grid-cols-1 gap-4 px-4 py-6 md:grid-cols-12">
        <div className="hidden md:col-span-1 md:block" />
        <div className="col-span-1 flex flex-col justify-center gap-10 md:col-span-6">
          <div className="flex flex-col gap-4 md:gap-8">
            <h4 className="text-heading-5 font-bold md:text-heading-4">CHÚNG MÌNH CÓ GÌ?</h4>
            <AnimatedListDemo />
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center md:col-span-4">
          <GamificationImage className="h-fit w-[448px] md:w-[480px]" />
        </div>
        <div className="hidden md:col-span-1 md:block" />
      </div>
    </div>
  );
};
