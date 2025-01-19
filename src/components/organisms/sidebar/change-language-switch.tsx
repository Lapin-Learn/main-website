import { Switch } from "@components/ui/locale-switch";
import { t } from "i18next";
import { useState } from "react";

import i18n from "@/i18n/i18n";
import { cn } from "@/lib/utils";

type ChangeLanguageSwitchProps = {
  className?: string;
};

function ChangeLanguageSwitch(props: ChangeLanguageSwitchProps) {
  const { className } = props;
  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng") || "en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "vi" : "en");
    i18n.changeLanguage(language === "en" ? "vi" : "en");
  };

  return (
    <div className={cn("flex items-center justify-between px-2", className)}>
      <div className="flex flex-col justify-center gap-1">
        <p className="text-xs text-neutral-400">{t("language.title")}</p>
        <p className="text-sm">{t(`language.${language}`)}</p>
      </div>
      <Switch checked={language === "vi"} onCheckedChange={toggleLanguage} />
    </div>
  );
}

export default ChangeLanguageSwitch;
