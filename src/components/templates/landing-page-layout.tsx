import { ReactNode, useEffect, useId, useState } from "react";

import { getAuthValueFromStorage } from "@/services";

import TopNavigationBar from "../organisms/landing-page/top-navigation-bar";

type LandingPageLayoutProps = {
  children: ReactNode;
};

export default function LandingPageLayout({ children }: LandingPageLayoutProps) {
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
      {children}
    </div>
  );
}
