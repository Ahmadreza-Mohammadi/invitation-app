import { memo, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNoButton } from "../hooks/useNoButton";
import { useTranslation } from "../i18n/LanguageContext";

function Buttons({
  visible,
  onYes,
  onEscape,
  onSurprise,
  shakeScreen,
}) {
  const reducedMotion = useReducedMotion();
  const { t, lang } = useTranslation();
  const containerRef = useRef(null);
  const noRef = useRef(null);

  const noButton = useNoButton({ containerRef, reducedMotion, lang });
  const {
    position,
    isEscaped,
    motionState,
    swapped,
    escape,
    registerButtonSize,
    springConfig,
    message,
    messageKey,
    surprise,
    clearSurprise,
  } = noButton;

  useEffect(() => {
    if (!noRef.current) return;
    const { offsetWidth, offsetHeight } = noRef.current;
    registerButtonSize(offsetWidth, offsetHeight);
  }, [registerButtonSize, visible, isEscaped, lang]);

  useEffect(() => {
    if (message) onEscape?.(message, messageKey);
  }, [message, messageKey, onEscape]);

  useEffect(() => {
    if (surprise) {
      onSurprise?.(surprise);
      const timer = setTimeout(clearSurprise, 2500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [surprise, onSurprise, clearSurprise]);

  const handleEscape = () => {
    escape();
    shakeScreen?.();
  };

  if (!visible) return null;

  const yesButton = (
    <motion.button
      type="button"
      layout
      layoutId="yes-btn"
      onClick={onYes}
      className="btn-yes relative z-20 min-w-[130px] rounded-2xl px-8 py-3.5 text-base font-semibold text-white shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D] focus-visible:ring-offset-2"
      whileHover={reducedMotion ? {} : { scale: 1.06 }}
      whileTap={reducedMotion ? {} : { scale: 0.96 }}
      animate={
        reducedMotion
          ? {}
          : {
              boxShadow: [
                "0 8px 32px rgba(255, 77, 109, 0.35)",
                "0 12px 40px rgba(255, 77, 109, 0.55)",
                "0 8px 32px rgba(255, 77, 109, 0.35)",
              ],
            }
      }
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-label={t.buttons.yesAria}
    >
      <motion.span
        animate={reducedMotion ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {t.buttons.yes}
      </motion.span>
    </motion.button>
  );

  const noButtonEl = (
    <motion.button
      ref={noRef}
      type="button"
      layout
      layoutId="no-btn"
      onMouseEnter={handleEscape}
      onFocus={handleEscape}
      onClick={(e) => {
        e.preventDefault();
        handleEscape();
      }}
      className="btn-no relative z-20 min-w-[110px] rounded-2xl px-7 py-3.5 text-base font-medium text-rose-700/80 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
      style={
        isEscaped
          ? {
              position: "absolute",
              left: position.x,
              top: position.y,
            }
          : undefined
      }
      animate={{
        rotate: motionState.rotate,
        scaleX: motionState.flip ? -motionState.scaleX : motionState.scaleX,
        scaleY: motionState.scaleY,
        opacity: motionState.opacity,
      }}
      transition={springConfig}
      aria-label={t.buttons.noAria}
    >
      {t.buttons.no}
    </motion.button>
  );

  return (
    <motion.div
      className="relative w-full overflow-visible px-6 pb-10 pt-2"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div
        ref={containerRef}
        className="relative mx-auto flex min-h-[140px] max-w-md items-center justify-center gap-4 overflow-visible sm:min-h-[160px] sm:gap-6"
      >
        {swapped && !isEscaped && noButtonEl}
        {yesButton}
        {!swapped && !isEscaped && noButtonEl}
        {isEscaped && noButtonEl}
      </div>
    </motion.div>
  );
}

export default memo(Buttons);
