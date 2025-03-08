import { getAuthValueFromStorage } from "@/services";

import { AiAssistant } from "../organisms/landing-page/ai-assistant";
import Footer from "../organisms/landing-page/footer";
import { Gamification } from "../organisms/landing-page/gamification";
import { HeroBanner } from "../organisms/landing-page/hero-banner";
import { MobileApp } from "../organisms/landing-page/mobile-app";
import { SimulatedTest } from "../organisms/landing-page/simulated-test";
import LandingPageLayout from "../templates/landing-page-layout";

export default function LandingPage() {
  const isLoggedIn = typeof window !== "undefined" && getAuthValueFromStorage() !== null;

  return (
    <LandingPageLayout isLoggedIn={isLoggedIn}>
      <HeroBanner isLoggedIn={isLoggedIn} />
      <Gamification />
      <SimulatedTest />
      <AiAssistant isLoggedIn={isLoggedIn} />
      <MobileApp />
      <Footer />
    </LandingPageLayout>
  );
}
