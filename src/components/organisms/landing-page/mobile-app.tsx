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
      <div className="z-10 grid h-full grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
        <div className="hidden md:col-span-1 md:block" />
        <div className="col-span-1 flex flex-col px-4 py-8 md:col-span-4 md:p-10">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="text-heading-5 font-semibold md:text-heading-3">
                HỌC MỌI LÚC MỌI NƠI VỚI PHIÊN BẢN DI ĐỘNG
              </h3>
              <p className="text-small opacity-70 md:text-body">
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
        <div className="hidden md:col-span-1 md:block" />
        <div className="relative col-span-1 flex h-[440px] items-center justify-center gap-24 md:col-span-5">
          <img
            src={MobileAppImage1}
            alt="Mobile App 1"
            className="absolute bottom-28 left-8 w-36 md:bottom-16 md:left-6 md:w-60"
          />
          <img
            src={MobileAppImage2}
            alt="Mobile App 2"
            className="absolute right-8 top-28 w-36 md:right-8 md:top-16 md:w-60"
          />
        </div>
        <div className="hidden md:col-span-1 md:block" />
      </div>
      <Donut className="absolute -left-32 hidden md:block" />
      <Flower className="absolute right-36 w-32 md:right-[672px] md:top-32 md:w-36" />
      <Star1 className="absolute bottom-16 right-64 md:bottom-8 md:right-[440px]" />
      <Star2 className="absolute -right-24 top-64 md:-top-20 md:right-20" />
    </div>
  );
};
