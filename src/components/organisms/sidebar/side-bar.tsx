import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Edit, Menu, Store } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import PracticeIcon from "@/assets/icons/practice";
import AppIcon from "@/assets/images/app.jpg";
import Logo from "@/assets/logo.svg";
import { Switch } from "@/components/ui/switch";
import { useAccountIdentifier } from "@/hooks/react-query/useUsers";
import { EnumRole } from "@/lib/enums";
import { cn } from "@/lib/utils";

import { Separator } from "../../ui";
import { SideBarFeature, SideBarFeatureProps } from "./side-bar-feature";
import { SideBarProfile } from "./side-bar-profile";

const features: SideBarFeatureProps[] = [
  {
    to: "/practice",
    icon: <PracticeIcon />,
    label: "practice",
  },
  {
    to: "/shop",
    icon: <Store />,
    label: "shop",
  },
];

const adminFeatures: SideBarFeatureProps[] = [
  {
    to: "/content-editor",
    icon: <Edit fillOpacity={0} />,
    label: "contentEditor",
  },
];

export default function SideBar() {
  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng") || "en");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { checkRole } = useAccountIdentifier();
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "vi" : "en");
    i18n.changeLanguage(language === "en" ? "vi" : "en");
  };

  return (
    <>
      <div className="fixed flex w-full items-center justify-between bg-white p-4 pt-8 sm:hidden">
        <img
          src={Logo}
          alt="App Logo"
          className="h-6 cursor-pointer"
          onClick={() => navigate({ to: "/" })}
        />
        <button onClick={() => setSidebarOpen((prev) => !prev)} aria-label="Open Sidebar">
          <Menu size={24} />
        </button>
      </div>

      <aside
        className={cn(
          "fixed h-full border-r bg-white transition-all duration-500 ease-in-out sm:static",
          isSidebarOpen ? "right-0 w-[280px] sm:left-0" : "right-[-280px] w-0 sm:left-0 sm:w-fit"
        )}
      >
        <div className={"relative flex h-full flex-col px-3 pb-4 pt-9"}>
          <nav className="flex h-screen w-full flex-col justify-between">
            <div>
              <div
                className={cn(
                  "flex flex-row items-center justify-between",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <img
                  src={isSidebarOpen ? Logo : AppIcon}
                  className={cn(
                    "hidden h-6 transition-transform duration-300 ease-in-out sm:flex cursor-pointer",
                    isSidebarOpen ? "pl-4" : "h-10 rounded-md"
                  )}
                  alt="App Logo"
                  onClick={() => navigate({ to: "/" })}
                />

                <button
                  className={cn(
                    "grid size-9 cursor-pointer place-items-center rounded-full border bg-white text-neutral-400 shadow-md transition-transform duration-300 ease-in-out hover:text-neutral-700",
                    isSidebarOpen
                      ? "left-0 [&_svg]:rotate-180 [&_svg]:sm:rotate-0"
                      : "absolute right-0 hidden translate-x-1/2 sm:grid sm:place-items-center [&_svg]:rotate-180"
                  )}
                  onClick={() => setSidebarOpen((prev) => !prev)}
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              <Separator className="mt-6" />
              <ul className="flex w-full flex-col space-y-2 overflow-hidden pt-3">
                {(checkRole(EnumRole.learner) ? features : adminFeatures).map((feat, idx) => {
                  if (typeof feat === "object")
                    return <SideBarFeature key={idx} feature={feat} isExpanded={isSidebarOpen} />;
                  return <div key={idx} className="h-px w-full bg-border" />;
                })}
              </ul>
            </div>
            <div>
              <div className="hidden items-center justify-between px-2">
                <div className="flex flex-col justify-center gap-1">
                  <p className="text-xs text-neutral-400">{t("language.title")}</p>
                  <p className="text-sm">{t(`language.${language}`)}</p>
                </div>
                <Switch checked={language === "vi"} onCheckedChange={toggleLanguage} />
              </div>
              <SideBarProfile isSidebarOpen={isSidebarOpen} />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
