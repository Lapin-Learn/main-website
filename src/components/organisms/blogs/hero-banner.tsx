import { useTranslation } from "react-i18next";

import { Typography } from "@/components/ui";

export const BlogsHeroBanner = () => {
  const { t } = useTranslation("landingPage");

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-4 bg-linear-hero-banner px-4 py-12 md:px-20 md:py-24">
      <Typography variant="h2" className="text-primary-700">
        {t("blogs.title")}
      </Typography>
      <Typography variant="body1" className="max-w-3xl text-center">
        {t("blogs.description")}
      </Typography>
    </div>
  );
};
