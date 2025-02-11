import { Helmet } from "react-helmet";

const metaTags: Record<string, Record<string, string>> = {
  en: {
    ogTitle: "LapinLearn - learn IELTS with more interesting things",
    fbTitle:
      "Our creative IELTS learning platform combines the power of gamification with personalized study plans, making IELTS preparation fun and effective. Start your IELTS conquering journey today!",
    description: "Discover a wide range of services tailored to your needs.",
  },
  vi: {
    ogTitle: "LapinLearn - học IELTS với nhiều điều thú vị hơn",
    fbTitle: "LapinLearn - học IELTS với nhiều điều thú vị hơn",
    description:
      "Nền tảng học IELTS sáng tạo của chúng mình kết hợp sức mạnh của trò chơi hóa với kế hoạch học tập cá nhân hóa, giúp việc chuẩn bị cho kỳ thi IELTS trở nên thú vị và hiệu quả. Hãy bắt đầu hành trình chinh phục IELTS của bạn ngay hôm nay!",
  },
};

const MetaTags = ({ language = "vi" }: { language?: string }) => {
  const { ogTitle, fbTitle, description } = metaTags[language];

  return (
    <Helmet>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={fbTitle} />
    </Helmet>
  );
};

export default MetaTags;
