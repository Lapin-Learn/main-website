import { useEffect, useId, useState } from "react";

import { getAuthValueFromStorage } from "@/services";

import TopNavigationBar from "../organisms/landing-page/top-navigation-bar";
import { Separator, Typography } from "../ui";

const blogContent = `<h2>Gamification là gì?</h2>
<p>Gamification là việc áp dụng các yếu tố của trò chơi như điểm số, cấp bậc, phần thưởng và thử thách vào các hoạt động không phải trò chơi. Khi đưa vào học IELTS, gamification giúp tạo ra một môi trường học tập thú vị hơn, giúp người học có thêm động lực để cải thiện kỹ năng tiếng Anh của mình.</p>

<h2>Lợi ích của gamification trong học IELTS</h2>
<h3>1. Tăng động lực học tập</h3>
<p>Việc học IELTS có thể kéo dài và đòi hỏi sự kiên trì. Tuy nhiên, khi áp dụng gamification, người học có thể nhận được phần thưởng khi hoàn thành các bài tập, thử thách hoặc đạt được một cột mốc nhất định.</p>

<h3>2. Cải thiện khả năng ghi nhớ và áp dụng kiến thức</h3>
<p>Các trò chơi và thử thách giúp não bộ ghi nhớ tốt hơn nhờ sự tương tác chủ động.</p>

<h3>3. Cá nhân hóa quá trình học</h3>
<p>Hệ thống gamification có thể theo dõi tiến trình học tập của từng cá nhân và đề xuất các thử thách phù hợp.</p>

<h3>4. Giảm căng thẳng và tạo môi trường học vui vẻ</h3>
<p>Học IELTS có thể gây áp lực, nhưng gamification giúp biến quá trình học thành một trò chơi thú vị.</p>

<h2>Ứng dụng gamification vào học IELTS như thế nào?</h2>
<h3>1. Hệ thống điểm và phần thưởng</h3>
<p>Người học có thể tích lũy điểm khi hoàn thành bài tập, thử thách hoặc đạt được tiến bộ nhất định.</p>

<h3>2. Thử thách hàng ngày</h3>
<p>Việc đặt ra các thử thách nhỏ giúp người học duy trì thói quen học tập đều đặn.</p>

<h3>3. Bảng xếp hạng và tính cạnh tranh</h3>
<p>Người học có thể so sánh tiến trình của mình với bạn bè hoặc cộng đồng học IELTS.</p>

<h3>4. Trò chơi hóa các kỹ năng IELTS</h3>
<ul>
    <li><strong>Listening:</strong> Biến các bài nghe thành trò chơi tìm từ khóa.</li>
    <li><strong>Reading:</strong> Tạo thử thách đọc hiểu với thời gian quy định.</li>
    <li><strong>Writing:</strong> Viết bài luận theo chủ đề và nhận phản hồi.</li>
    <li><strong>Speaking:</strong> Tham gia các cuộc hội thoại mô phỏng.</li>
</ul>

<h2>Kết luận</h2>
<p>Gamification đang mang lại một làn gió mới cho việc học IELTS. Nếu bạn đang gặp khó khăn trong việc duy trì hứng thú học IELTS, hãy thử ngay phương pháp gamification để biến quá trình này trở nên hấp dẫn hơn!</p>

<p><em>Bạn đã từng thử học IELTS bằng gamification chưa? Hãy chia sẻ trải nghiệm của bạn và cùng nhau khám phá những cách học sáng tạo hơn nhé!</em></p>`;

export const BlogDetailsPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const id = useId();

  useEffect(() => {
    const handleScroll = () => {
      const heroBannerHeight = document.getElementById(id)?.offsetHeight || 0;
      setIsScrolled(window.scrollY > heroBannerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLoggedIn = getAuthValueFromStorage() !== null;

  return (
    <div className="relative w-screen overflow-hidden">
      <TopNavigationBar isScrolled={isScrolled} isLoggedIn={isLoggedIn} />
      <div className="flex flex-col gap-8 px-8 py-16 md:px-40 lg:px-96">
        <img
          src="https://picsum.photos/200"
          alt="Blog Cover"
          className="aspect-[16/9] h-auto w-full rounded-md object-cover"
        />
        <div className="flex flex-col gap-2">
          <Typography variant="subtitle1" className="text-supporting-text">
            Created at: 22/02/2025
          </Typography>
          <Typography variant="h2">Tổng quan về IELTS</Typography>
        </div>
        <Separator />
        <div className="prose" dangerouslySetInnerHTML={{ __html: blogContent }} />
      </div>
    </div>
  );
};
