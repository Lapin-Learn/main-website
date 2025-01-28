import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { HeroBannerImage } from "@/assets/icons/landing-page/hero-banner-image";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export const HeroBanner = () => {
  return (
    <div className="relative flex max-h-screen w-full flex-col items-center justify-center overflow-hidden bg-linear-hero-banner">
      <div className="grid grid-cols-12 items-center gap-4 p-4">
        <div className="col-span-1" />
        <div className="z-10 col-span-5 flex max-h-fit flex-col gap-10 p-10">
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
                className="text-heading-3 font-bold"
              >
                <span className="text-orange-700">VẪN LÀ IELTS</span> NHƯNG <br /> THEO CÁCH{" "}
                <Highlight className="rounded-full bg-gradient-to-r from-secondary to-secondary px-4 py-0.5 italic">
                  THÚ VỊ
                </Highlight>{" "}
                HƠN
              </motion.h3>
            </HeroHighlight>

            <p>
              Nền tảng học IELTS sáng tạo của chúng mình kết hợp sức mạnh của trò chơi hóa với kế
              hoạch học tập cá nhân hóa, giúp việc chuẩn bị cho kỳ thi IELTS trở nên thú vị và hiệu
              quả. Hãy bắt đầu hành trình chinh phục IELTS của bạn ngay hôm nay!
            </p>
          </div>
          <button className="w-fit rounded-full bg-red-yellow-linear px-6 py-3.5">
            <div className="flex items-center gap-2 text-white">
              <p className="font-medium">Đăng ký ngay</p>
              <ArrowRight className="size-6" />
            </div>
          </button>
        </div>
        <div className="col-span-1" />
        <div className="z-10 col-span-4 flex max-h-fit flex-col items-center justify-center">
          <HeroBannerImage className="max-w-md" />
        </div>
        <div className="col-span-1" />
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
