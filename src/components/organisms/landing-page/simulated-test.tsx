import SimulatedTestImage1 from "@/assets/images/simulated-test-image-1.png";
import SimulatedTestImage2 from "@/assets/images/simulated-test-image-2.png";
import SimulatedTestImage3 from "@/assets/images/simulated-test-image-3.png";

export const SimulatedTest = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 bg-gradient-to-b from-[#F0FCFF] to-[#C7E1EF] py-14">
      <h4 className="text-heading-4 font-bold">THI THỬ VỚI 40+ ĐỀ THI</h4>
      <div className="flex flex-col gap-8">
        <img src={SimulatedTestImage1} alt="Simulated Test Image 1" />
        <img src={SimulatedTestImage2} alt="Simulated Test Image 2" />
        <img src={SimulatedTestImage3} alt="Simulated Test Image 3" />
      </div>
    </div>
  );
};
