import { useEffect, useId, useState } from "react";

import { getAuthValueFromStorage } from "@/services";

import { BlogCard } from "../organisms/blogs/blog-card";
import { BlogsHeroBanner } from "../organisms/blogs/hero-banner";
import TopNavigationBar from "../organisms/landing-page/top-navigation-bar";

export default function BlogsPage() {
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
      <BlogsHeroBanner />
      <div className="flex flex-col gap-8 px-40 py-16 md:px-80">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}
