import GamificationImage from "@/assets/icons/landing-page/gamification-image";

import { AnimatedListDemo } from "./item-list";

export const Gamification = () => {
  return (
    <div className="relative flex max-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-1" />
        <div className="col-span-6 flex flex-col justify-center gap-10">
          <div className="flex flex-col gap-8">
            <h4 className="text-heading-4 font-bold">CHÚNG MÌNH CÓ GÌ?</h4>
            <AnimatedListDemo />
          </div>
        </div>
        <div className="col-span-4 flex flex-col items-center justify-center">
          <GamificationImage className="max-w-md" />
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
};
