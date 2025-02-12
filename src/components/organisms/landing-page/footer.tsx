import EmailIcon from "@/assets/icons/email";
import FacebookLogo from "@/assets/icons/FacebookLogo";

const Footer = () => {
  return (
    <div className="bg-[#6B96D5] py-6 text-white md:px-40">
      <div className="container mx-auto flex flex-col justify-center gap-4 px-4 md:flex-row md:items-center md:justify-between md:gap-0">
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
  );
};
export default Footer;
