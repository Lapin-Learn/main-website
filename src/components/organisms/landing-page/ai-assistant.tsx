import { CheckIcon } from "lucide-react";

import Star from "@/assets/icons/landing-page/star";
import { PulsatingButton } from "@/components/ui/pulsating-button";

const description = [
  "Nhận xét chi tiết các phần thi Writing và Speaking, bao gồm đánh giá theo từng tiêu chí cụ thể và band điểm dự kiến.",
  "Chủ động và linh hoạt thời gian hơn.",
  "Chi phí tiết kiệm gấp 10 lần.",
];

export const AiAssistant = () => {
  return (
    <div className="relative flex max-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background md:px-32 md:py-20">
      <div className="flex size-full flex-col gap-10 rounded-3xl bg-[#D9F0FF] md:px-16 md:py-12">
        <div className="flex flex-col gap-5">
          <h4 className="text-heading-4 font-bold">TRẢI NGHIỆM HỌC CÙNG VỚI TRỢ LÝ AI</h4>
          <div className="flex flex-col gap-3">
            {description.map((desc, index) => (
              <div key={index} className="flex flex-row gap-2">
                <div className="relative size-4 rounded-full bg-blue-500">
                  <CheckIcon strokeWidth={4} className="absolute-center size-2.5 text-white" />
                </div>
                <p className="text-small">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <PulsatingButton
          className="w-fit rounded-full bg-[#1C64F2] px-6 py-3.5"
          pulseStyle="rounded-full"
        >
          <p className="text-small font-medium">Đăng ký miễn phí ngay</p>
        </PulsatingButton>
      </div>
      <Star className="absolute bottom-36 left-8 size-8 rotate-[-0.5rad]" />
      <Star className="absolute bottom-12 left-10 size-16 rotate-[0.4rad]" />
      <Star className="absolute bottom-16 right-4 size-16 rotate-[-0.5rad]" />
      <Star className="absolute bottom-32 right-20 size-3.5 rotate-12" />
      <Star className="absolute bottom-40 right-10 size-8 rotate-12" />
    </div>
  );
};
