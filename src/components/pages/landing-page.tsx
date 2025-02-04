import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import EmailIcon from "@/assets/icons/email";
import FacebookLogo from "@/assets/icons/FacebookLogo";
import Logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";
import { getAuthValueFromStorage } from "@/services";

import { AiAssistant } from "../organisms/landing-page/ai-assistant";
import { Gamification } from "../organisms/landing-page/gamification";
import { HeroBanner } from "../organisms/landing-page/hero-banner";
import { MobileApp } from "../organisms/landing-page/mobile-app";
import { SimulatedTest } from "../organisms/landing-page/simulated-test";
import ChangeLanguageSwitch from "../organisms/sidebar/change-language-switch";
import { Button, Separator } from "../ui";

export default function LandingPage() {
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

  const isLoggedIn = getAuthValueFromStorage();

  return (
    <main className="size-screen">
      <div className="relative">
        <nav
          className={cn(
            "fixed w-full top-0 z-50 flex h-16 items-center justify-between px-6 md:px-20",
            isScrolled ? "bg-white shadow" : "bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center" onClick={handleLogoClick}>
            <img src={Logo} alt="App Logo" className="h-4 cursor-pointer md:h-6" />
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <ChangeLanguageSwitch className="p-0" hideLabel />
            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLSe1gW2-jG6eVKI8s4HbKvD2YOACPJziW6_lQwMGDcduvhf7ug/viewform"
              target="_blank"
            >
              <Button
                variant="ghost"
                className="w-fit shrink-0 rounded-md px-3 py-2 text-xs text-neutral-300 md:rounded-lg md:px-6 md:py-3.5 md:text-small"
              >
                {t("navBar.feedback")}
              </Button>
            </Link>
            <Separator orientation="vertical" className="flex h-full min-h-6 bg-neutral-300" />
            <Link to={isLoggedIn ? "/practice" : "/sign-up"}>
              <Button className="w-fit rounded-md px-3 py-2 text-xs md:rounded-lg md:px-6 md:py-3.5 md:text-small">
                {t("navBar.start")}
              </Button>
            </Link>
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
              <a href="https://www.facebook.com/share/18rWuZv7q7/?mibextid=wwXIfr" target="_blank">
                <FacebookLogo className="size-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
