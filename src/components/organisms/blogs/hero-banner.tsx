import { Typography } from "@/components/ui";

export const BlogsHeroBanner = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-4 bg-linear-hero-banner px-4 py-12 md:px-20 md:py-24">
      <Typography variant="h2">Tổng quan về IELTS</Typography>
      <Typography variant="body1" className="max-w-3xl text-center">
        IELTS là một trong những bài thi quan trọng nhất mà bạn cần phải đối mặt khi muốn du học
        hoặc làm việc ở nước ngoài. Để đạt điểm số cao, bạn cần phải chuẩn bị kỹ lưỡng và kiên trì
        luyện tập.
      </Typography>
    </div>
  );
};
