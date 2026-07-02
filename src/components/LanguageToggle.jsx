import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../i18n/LanguageContext";

function LanguageToggle() {
  const { t, toggleLanguage } = useTranslation();
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      className="lang-toggle absolute top-4 z-30 rounded-full border border-white/60 bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-rose-700 shadow-md backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reducedMotion ? {} : { scale: 1.05 }}
      whileTap={reducedMotion ? {} : { scale: 0.96 }}
      aria-label={t.language.aria}
    >
      {t.language.switchTo}
    </motion.button>
  );
}

export default memo(LanguageToggle);
