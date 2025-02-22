// eslint-disable-next-line simple-import-sort/imports
import { Link } from "@tanstack/react-router";

import Logo from "@/assets/logo.svg";
import { Button, Separator } from "@/components/ui";
import { cn } from "@/lib/utils";

import { useTranslation } from "react-i18next";
import ChangeLanguageSwitch from "../sidebar/change-language-switch";

type TopNavigationBarProps = {
  isScrolled: boolean;
  isLoggedIn: boolean;
};

const TopNavigationBar = ({ isScrolled = false, isLoggedIn = false }: TopNavigationBarProps) => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { t } = useTranslation("landingPage");

  const navItems = [
    {
      label: t("navBar.feedback"),
      to: "https://docs.google.com/forms/d/e/1FAIpQLSe1gW2-jG6eVKI8s4HbKvD2YOACPJziW6_lQwMGDcduvhf7ug/viewform",
      visible: true,
    },
    {
      label: t("navigation.dailyLesson", { ns: "common" }),
      to: "/daily-lesson",
      visible: isLoggedIn,
    },
    { label: t("navigation.practice", { ns: "common" }), to: "/practice", visible: isLoggedIn },
    { label: "Blogs", to: "/blogs", visible: true },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full top-0 z-50 flex h-16 items-center justify-between px-6 md:px-20",
        isScrolled ? "bg-white shadow" : "bg-transparent"
      )}
    >
      <Link href="/" className="flex items-center" onClick={handleLogoClick}>
        <img src={Logo} alt="App Logo" className="h-4 cursor-pointer md:h-6" />
      </Link>
      <div className="flex items-center gap-2 md:gap-4">
        <ChangeLanguageSwitch className="p-0" hideLabel />
        {navItems
          .filter((item) => item.visible)
          .map((item, index) => (
            <>
              <Link key={index} to={item.to}>
                <Button
                  variant="ghost"
                  className="w-fit rounded-md px-3 py-2 text-xs text-neutral-300 md:rounded-lg md:px-6 md:py-3.5 md:text-small"
                >
                  {item.label}
                </Button>
              </Link>
              <Separator
                orientation="vertical"
                className="flex h-full min-h-6 bg-neutral-300 last:hidden"
              />
            </>
          ))}
        {!isLoggedIn && (
          <Link to={"/sign-up"}>
            <Button className="w-fit rounded-md px-3 py-2 text-xs md:rounded-lg md:px-6 md:py-3.5 md:text-small">
              {t("navBar.start")}
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TopNavigationBar;
