import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import EmailIcon from "@/assets/icons/email";
import FacebookLogo from "@/assets/icons/FacebookLogo";
import Logo from "@/assets/logo.svg";
import { useSignOut } from "@/hooks/react-query/useAuth";
import { useAccountIdentifier } from "@/hooks/react-query/useUsers";
import { useAuthStore } from "@/hooks/useAuthStore";
import { cn } from "@/lib/utils";
import { getAuthValueFromStorage } from "@/services";

import { AiAssistant } from "../organisms/landing-page/ai-assistant";
import { Gamification } from "../organisms/landing-page/gamification";
import { HeroBanner } from "../organisms/landing-page/hero-banner";
import { MobileApp } from "../organisms/landing-page/mobile-app";
import { SimulatedTest } from "../organisms/landing-page/simulated-test";
import { Button, Separator } from "../ui";

export default function HomePage() {
  const signOut = useSignOut();
  const { data, isError, isLoading } = useAccountIdentifier();
  const { accessToken, setAccessToken } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation("landingPage");

  useEffect(() => {
    const handleScroll = () => {
      const heroBannerHeight = document.getElementById("hero-banner")?.offsetHeight || 0;
      setIsScrolled(window.scrollY > heroBannerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!accessToken) {
    const token = getAuthValueFromStorage()?.accessToken;
    if (token) {
      setAccessToken(token);
    }
  }

  if (isError) {
    signOut.mutate();
    return <div>Session expired</div>;
  }

  return (
    <main className="size-screen">
      {isLoading ? (
        <div className="text-center text-2xl font-bold">Loading... </div>
      ) : (
        data && (
          <div className="relative">
            <nav
              className={cn(
                "fixed inset-x-0 top-0 z-50",
                isScrolled ? "bg-white shadow" : "bg-transparent"
              )}
            >
              <div className="mx-auto w-full max-w-7xl px-4">
                <div className="flex h-14 items-center justify-between">
                  <Link href="/" className="flex items-center" onClick={handleLogoClick}>
                    <img src={Logo} alt="App Logo" className="h-5 cursor-pointer md:h-6" />
                  </Link>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      className="w-fit rounded-md px-3 py-2 text-neutral-300 md:rounded-lg md:px-6 md:py-3.5"
                    >
                      {t("navBar.feedback")}
                    </Button>
                    <Separator
                      orientation="vertical"
                      className="flex h-full min-h-6 bg-neutral-300"
                    />
                    <Button className="w-fit rounded-md px-3 py-2 md:rounded-lg md:px-6 md:py-3.5">
                      {t("navBar.start")}
                    </Button>
                  </div>
                </div>
              </div>
            </nav>
            <div id="hero-banner">
              <HeroBanner />
            </div>
            <Gamification />
            <SimulatedTest />
            <AiAssistant />
            <MobileApp />
            <div className="bg-[#6B96D5] py-6 text-white md:px-40">
              <div className="container mx-auto flex flex-col justify-center gap-4 px-4 md:flex-row md:items-center md:justify-between md:gap-0">
                <p className="text-small">© 2025 LapinLearn. All rights reserved.</p>
                <div className="flex gap-4">
                  <a href="mailto:lapinlearnproject@gmail.com">
                    <EmailIcon className="size-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/18rWuZv7q7/?mibextid=wwXIfr"
                    target="_blank"
                  >
                    <FacebookLogo className="size-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </main>
  );
}
