import { useEffect, useMemo, useState } from "react";

import { getAuthValueFromStorage } from "@/services";

import { AiAssistant } from "../organisms/landing-page/ai-assistant";
import Footer from "../organisms/landing-page/footer";
import { Gamification } from "../organisms/landing-page/gamification";
import { HeroBanner } from "../organisms/landing-page/hero-banner";
import { MobileApp } from "../organisms/landing-page/mobile-app";
import { SimulatedTest } from "../organisms/landing-page/simulated-test";
import TopNavigationBar from "../organisms/landing-page/top-navigation-bar";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const id = useMemo(() => `hero-banner-${Math.random().toString(36).substr(2, 9)}`, []);

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

  useEffect(() => {
    setIsLoggedIn(typeof window !== "undefined" && getAuthValueFromStorage() !== null);
  }, []);

  return (
    <div className="relative w-screen overflow-hidden">
      <TopNavigationBar isScrolled={isScrolled} isLoggedIn={isLoggedIn} />
      <HeroBanner id={id} isLoggedIn={isLoggedIn} />
      <Gamification />
      <SimulatedTest />
      <AiAssistant isLoggedIn={isLoggedIn} />
      <MobileApp />
      <Footer />
    </div>
  );
}
