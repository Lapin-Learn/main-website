import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui";

export const BlogCard = () => {
  return (
    <div className="flex flex-row gap-4 ">
      <img
        src="https://picsum.photos/200"
        alt="Blog Cover"
        className="aspect-[4/3] h-40 w-64 rounded-md object-cover"
      />
      <Link to="/blogs/1" className="flex flex-col gap-2">
        <h3 className="text-heading-5 font-bold">Tổng quan về IELTS</h3>
        <p className="line-clamp-3 text-small">
          IELTS là một trong những bài thi quan trọng nhất mà bạn cần phải đối mặt khi muốn du học
          hoặc làm việc ở nước ngoài. Để đạt điểm số cao, bạn cần phải chuẩn bị kỹ lưỡng và kiên trì
          luyện tập. IELTS là một trong những bài thi quan trọng nhất mà bạn cần phải đối mặt khi
          muốn du học hoặc làm việc ở nước ngoài. Để đạt điểm số cao, bạn cần phải chuẩn bị kỹ lưỡng
          và kiên trì luyện tập. IELTS là một trong những bài thi quan trọng nhất mà bạn cần phải
          đối mặt khi muốn du học hoặc làm việc ở nước ngoài. Để đạt điểm số cao, bạn cần phải chuẩn
          bị kỹ lưỡng và kiên trì luyện tập. IELTS là một trong những bài thi quan trọng nhất mà bạn
          cần phải đối mặt khi muốn du học hoặc làm việc ở nước ngoài. Để đạt điểm số cao, bạn cần
          phải chuẩn bị kỹ lưỡng và kiên trì luyện tập.
        </p>
        <Button variant="link" className="w-fit gap-2 p-0">
          <p>Xem thêm</p>
          <ArrowRightIcon size={16} />
        </Button>
      </Link>
    </div>
  );
};
