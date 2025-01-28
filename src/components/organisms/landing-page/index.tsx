import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import EmailIcon from "@/assets/icons/email";
import FacebookLogo from "@/assets/icons/FacebookLogo";
import Logo from "@/assets/logo.svg";
import { Button, Separator } from "@/components/ui";
import { cn } from "@/lib/utils";

import { AiAssistant } from "./ai-assistant";
import { Gamification } from "./gamification";
import { HeroBanner } from "./hero-banner";
import { MobileApp } from "./mobile-app";
import { SimulatedTest } from "./simulated-test";

export const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <div className="relative">
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          isScrolled ? "bg-white shadow" : "bg-transparent"
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center">
              <img src={Logo} alt="App Logo" className="h-6 cursor-pointer" />
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="xl" className="w-fit text-neutral-300">
                Phản hồi
              </Button>
              <Separator orientation="vertical" className="flex h-full min-h-6 bg-neutral-300" />
              <Button size="xl" className="w-fit">
                Bắt đầu
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
        <div className="container mx-auto flex items-center justify-between px-4">
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
  );
};
