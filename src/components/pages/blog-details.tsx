import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { useGetBlog } from "@/hooks/react-query/use-public";
import { Route } from "@/routes/blogs/$blogId";

import LandingPageLayout from "../templates/landing-page-layout";
import { Separator, Typography } from "../ui";

export const BlogDetailsPage = () => {
  const { blogId } = Route.useParams();
  const { data, isLoading } = useGetBlog(blogId);
  const { t } = useTranslation("landingPage");

  if (!data || isLoading) return null;

  return (
    <LandingPageLayout>
      <div className="flex flex-col gap-8 px-8 py-16 md:px-40 lg:px-96">
        <img
          src={data.thumbnail.url}
          alt={data.thumbnail.name}
          className="aspect-[16/9] h-auto w-full rounded-md object-cover"
        />
        <div className="flex flex-col gap-2">
          <Typography variant="h2">{data.title}</Typography>
          <Typography variant="subtitle2" className="text-supporting-text">
            {t("blogs.createdAt")}: {format(data.createdAt, "dd/MM/yyyy")}
          </Typography>
        </div>
        <Separator />
        <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </LandingPageLayout>
  );
};
