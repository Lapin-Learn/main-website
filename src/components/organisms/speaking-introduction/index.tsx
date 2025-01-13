import { useTranslation } from "react-i18next";

import InstructionCarousel from "./instruction-carousel";
import MicTest, { MicTestProps } from "./mic-test";

const SpeakingIntroduction = (props: MicTestProps) => {
  const { mode } = props;
  const { t } = useTranslation("simulatedTest");

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h4 className="text-heading-4 font-semibold">{t(`mode.${mode}`)}</h4>
      <div className="flex flex-col items-center gap-10">
        <InstructionCarousel mode={mode} />
        <MicTest {...props} />
      </div>
    </div>
  );
};

export default SpeakingIntroduction;
