import { Switch } from "@components/ui/locale-switch";
import { t } from "i18next";
import { useEffect, useState } from "react";

import i18n from "@/i18n/i18n";
import { cn } from "@/lib/utils";

type ChangeLanguageSwitchProps = {
  className?: string;
  hideLabel?: boolean;
};

function ChangeLanguageSwitch(props: ChangeLanguageSwitchProps) {
  const { className, hideLabel = false } = props;

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("i18nextLng") || "en";
      setLanguage(storedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "vi" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);

    if (typeof window !== "undefined") {
      localStorage.setItem("i18nextLng", newLang);
    }
  };

  return (
    <div className={cn("flex items-center justify-between px-2", className)}>
      {!hideLabel && (
        <div className="flex flex-col justify-center gap-1">
          <p className="text-xs text-neutral-400">{t("language.title")}</p>
          <p className="text-sm">{t(`language.${language}`)}</p>
        </div>
      )}
      <Switch checked={language === "vi"} onCheckedChange={toggleLanguage} />
    </div>
  );
}

export default ChangeLanguageSwitch;
