import { ReactNode, useEffect, useState } from "react";

import TopNavigationBar from "../organisms/landing-page/top-navigation-bar";

type LandingPageLayoutProps = {
  children: ReactNode;
  id?: string;
  isLoggedIn?: boolean;
};

export default function LandingPageLayout({
  children,
  id = "",
  isLoggedIn = false,
}: LandingPageLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <div className="relative w-screen overflow-hidden">
      <TopNavigationBar isScrolled={isScrolled} isLoggedIn={isLoggedIn} />
      {children}
    </div>
  );
}
