import { useId } from "react";

import { getAuthValueFromStorage } from "@/services";

import { AiAssistant } from "../organisms/landing-page/ai-assistant";
import Footer from "../organisms/landing-page/footer";
import { Gamification } from "../organisms/landing-page/gamification";
import { HeroBanner } from "../organisms/landing-page/hero-banner";
import { MobileApp } from "../organisms/landing-page/mobile-app";
import { SimulatedTest } from "../organisms/landing-page/simulated-test";
import LandingPageLayout from "../templates/landing-page-layout";

export default function LandingPage() {
  const id = useId();
  const isLoggedIn = getAuthValueFromStorage() !== null;

  return (
    <LandingPageLayout>
      <HeroBanner id={id} isLoggedIn={isLoggedIn} />
      <Gamification />
      <SimulatedTest />
      <AiAssistant isLoggedIn={isLoggedIn} />
      <MobileApp />
      <Footer />
    </LandingPageLayout>
  );
}
