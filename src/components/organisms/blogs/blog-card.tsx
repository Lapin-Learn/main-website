import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui";
import { Blog } from "@/lib/types";

export const BlogCard = ({ blogContent }: { blogContent: Blog }) => {
  const { t } = useTranslation("landingPage");

  return (
    <div className="flex flex-row gap-4 ">
      <img
        src={blogContent.thumbnail.url}
        alt={blogContent.thumbnail.name}
        className="aspect-[4/3] h-40 w-64 rounded-md object-cover"
      />
      <Link to={`/blogs/${blogContent.id}`} className="flex flex-col gap-2">
        <p className="text-small text-supporting-text">
          {t("blogs.createdAt")}: {format(blogContent.createdAt, "dd/MM/yyyy")}
        </p>
        <h3 className="text-heading-5 font-bold">{blogContent.title}</h3>
        <div
          className="prose line-clamp-3 text-small"
          dangerouslySetInnerHTML={{ __html: blogContent.content }}
        />
        <Button variant="link" className="w-fit gap-2 p-0">
          <p>{t("blogs.readMore")}</p>
          <ArrowRightIcon size={16} />
        </Button>
      </Link>
    </div>
  );
};
