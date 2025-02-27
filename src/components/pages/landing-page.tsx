import { useMemo } from "react";

import { getAuthValueFromStorage } from "@/services";

import { AiAssistant } from "../organisms/landing-page/ai-assistant";
import Footer from "../organisms/landing-page/footer";
import { Gamification } from "../organisms/landing-page/gamification";
import { HeroBanner } from "../organisms/landing-page/hero-banner";
import { MobileApp } from "../organisms/landing-page/mobile-app";
import { SimulatedTest } from "../organisms/landing-page/simulated-test";
import LandingPageLayout from "../templates/landing-page-layout";

export default function LandingPage() {
  const id = useMemo(() => `hero-banner-${Math.random().toString(36).substr(2, 9)}`, []);
  const isLoggedIn = typeof window !== "undefined" && getAuthValueFromStorage() !== null;

  return (
    <LandingPageLayout id={id} isLoggedIn={isLoggedIn}>
      <HeroBanner id={id} isLoggedIn={isLoggedIn} />
      <Gamification />
      <SimulatedTest />
      <AiAssistant isLoggedIn={isLoggedIn} />
      <MobileApp />
      <Footer />
    </LandingPageLayout>
  );
}
