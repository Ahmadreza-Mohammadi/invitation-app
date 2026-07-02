import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useTranslation } from "../i18n/LanguageContext";

function BackButton({ onClick }) {
  const { t, isRtl } = useTranslation();
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="back-button absolute top-4 z-30 flex items-center gap-1 rounded-full border border-white/60 bg-white/75 px-3 py-2 text-sm font-medium text-rose-700/90 shadow-md backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
      initial={{ opacity: 0, x: isRtl ? 8 : -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRtl ? 8 : -8 }}
      whileHover={
        reducedMotion ? {} : { scale: 1.04, x: isRtl ? 2 : -2 }
      }
      whileTap={reducedMotion ? {} : { scale: 0.96 }}
      aria-label={t.back.aria}
    >
      {isRtl ? (
        <IoChevronForward className="text-base" aria-hidden="true" />
      ) : (
        <IoChevronBack className="text-base" aria-hidden="true" />
      )}
      {t.back.label}
    </motion.button>
  );
}

export default memo(BackButton);
