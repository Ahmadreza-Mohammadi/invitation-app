import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getTranslation } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "date-invitation-lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem(STORAGE_KEY) === "fa" ? "fa" : "en";
  });

  const t = useMemo(() => getTranslation(lang), [lang]);
  const isRtl = lang === "fa";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.title = t.pageTitle;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, isRtl, t.pageTitle]);

  const toggleLanguage = () => {
    setLang((current) => (current === "en" ? "fa" : "en"));
  };

  const value = useMemo(
    () => ({ lang, t, isRtl, toggleLanguage, setLang }),
    [lang, t, isRtl],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return context;
}
