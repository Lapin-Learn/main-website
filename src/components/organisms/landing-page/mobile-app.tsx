import AppStore from "@/assets/icons/AppStore";
import GooglePlay from "@/assets/icons/GooglePlay";
import Donut from "@/assets/icons/landing-page/donut";
import Flower from "@/assets/icons/landing-page/flower";
import Star1 from "@/assets/icons/landing-page/star-1";
import Star2 from "@/assets/icons/landing-page/star-2";
import MobileAppImage1 from "@/assets/images/mobile-app-1.png";
import MobileAppImage2 from "@/assets/images/mobile-app-2.png";

export const MobileApp = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#0B2A46] text-white md:h-[500px]">
      <div className="z-10 grid h-full grid-cols-12 items-center gap-4">
        <div className="col-span-1" />
        <div className="col-span-4 flex flex-col gap-10 p-10">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <h3 className="text-heading-3 font-semibold leading-[150%]">
                HỌC MỌI LÚC MỌI NƠI VỚI PHIÊN BẢN DI ĐỘNG
              </h3>
              <p className="opacity-70">
                Bất kể bạn đang ở đâu, LapinLearn đều có thể đồng hành với bạn. Chỉ với 5 phút mỗi
                ngày, bạn vẫn có thể trau dồi kỹ năng IELTS của mình.
              </p>
            </div>
            <div className="flex gap-3">
              <button>
                <GooglePlay />
              </button>
              <button>
                <AppStore />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1" />
        <div className="relative col-span-5 flex items-center justify-center gap-24">
          <img
            src={MobileAppImage1}
            alt="Mobile App 1"
            className="absolute -bottom-40 max-w-md md:left-6"
          />
          <img
            src={MobileAppImage2}
            alt="Mobile App 2"
            className="absolute -top-40 max-w-md md:right-6"
          />
        </div>
        <div className="col-span-1" />
      </div>
      <Donut className="absolute -left-32" />
      <Flower className="absolute right-[672px]" />
      <Star1 className="absolute bottom-8 right-[440px]" />
      <Star2 className="absolute right-8 top-0" />
    </div>
  );
};
