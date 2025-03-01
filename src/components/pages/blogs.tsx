import { useGetBlogs } from "@/hooks/react-query/use-public";
import { BlogResponse } from "@/lib/types";

import { BlogCard } from "../organisms/blogs/blog-card";
import { BlogsHeroBanner } from "../organisms/blogs/hero-banner";
import LandingPageLayout from "../templates/landing-page-layout";

export default function BlogsPage({ initialData }: { initialData?: BlogResponse }) {
  const { data } = useGetBlogs(initialData);

  return (
    <LandingPageLayout>
      <BlogsHeroBanner />
      <div className="flex flex-col gap-8 px-8 py-16 md:px-40 lg:px-80">
        {data && data.items.map((blog) => <BlogCard key={blog.id} blogContent={blog} />)}
      </div>
    </LandingPageLayout>
  );
}
