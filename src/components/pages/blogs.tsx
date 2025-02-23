import { useGetBlogs } from "@/hooks/react-query/use-public";

import { BlogCard } from "../organisms/blogs/blog-card";
import { BlogsHeroBanner } from "../organisms/blogs/hero-banner";
import LandingPageLayout from "../templates/landing-page-layout";

export default function BlogsPage() {
  const { data } = useGetBlogs();

  return (
    <LandingPageLayout>
      <BlogsHeroBanner />
      <div className="flex flex-col gap-8 px-8 py-16 md:px-40 lg:px-80">
        {data?.items.map((blog) => <BlogCard key={blog.id} blogContent={blog} />)}
      </div>
    </LandingPageLayout>
  );
}
