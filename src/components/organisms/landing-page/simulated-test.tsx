import { useTranslation } from "react-i18next";

import SimulatedTestImage1 from "@/assets/images/simulated-test-image-1.png";
import SimulatedTestImage2 from "@/assets/images/simulated-test-image-2.png";
import SimulatedTestImage3 from "@/assets/images/simulated-test-image-3.png";
import SimulatedTestMobile from "@/assets/images/simulated-test-image-mobile.png";

export const SimulatedTest = () => {
  const { t } = useTranslation("landingPage");
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 bg-linear-blue py-14 md:gap-10">
      <h3 className="text-heading-5 font-bold md:text-heading-3">{t("simulatedTest.title")}</h3>
      <div className="flex flex-col gap-6 md:gap-8">
        <img
          className="hidden max-w-4xl md:block"
          src={SimulatedTestImage1}
          alt="Simulated Test Image 1"
        />
        <img
          className="hidden max-w-4xl md:block"
          src={SimulatedTestImage2}
          alt="Simulated Test Image 2"
        />
        <img
          className="hidden max-w-4xl md:block"
          src={SimulatedTestImage3}
          alt="Simulated Test Image 3"
        />
        <img
          className="max-w-sm px-4 md:hidden"
          src={SimulatedTestMobile}
          alt="Simulated Test Mobile"
        />
        <img
          className="max-w-sm px-4 md:hidden"
          src={SimulatedTestMobile}
          alt="Simulated Test Mobile"
        />
      </div>
    </div>
  );
};
