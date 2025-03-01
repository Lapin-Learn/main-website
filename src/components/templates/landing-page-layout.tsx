import { ReactNode, useEffect, useState } from "react";

import TopNavigationBar from "../organisms/landing-page/top-navigation-bar";

type LandingPageLayoutProps = {
  children: ReactNode;
  isLoggedIn?: boolean;
};

export default function LandingPageLayout({
  children,
  isLoggedIn = false,
}: LandingPageLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
