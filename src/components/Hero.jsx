import { memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../i18n/LanguageContext";

const introVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.5, delayChildren: 0.35 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const heartVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
};

function Hero({ phase, celebrationStep, onContinue }) {
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation();

  const isIntro = phase === "intro";
  const isQuestion = phase === "question";
  const isCelebrating = phase === "celebrating";
  const isEnding = phase === "ending" || phase === "official";

  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-center sm:px-10 sm:py-10"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reducedMotion ? 0.2 : 1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {(isIntro || isQuestion) && !isEnding && (
        <motion.div
          className="relative mb-6 flex h-24 w-24 items-center justify-center sm:mb-8 sm:h-28 sm:w-28"
          variants={heartVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF758F] to-[#FF4D6D] opacity-30 blur-2xl"
            animate={
              reducedMotion
                ? { scale: 1 }
                : { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="relative text-5xl sm:text-6xl"
            animate={
              reducedMotion ? {} : { y: [0, -8, 0], rotate: [0, 4, -4, 0] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            ❤️
          </motion.span>
        </motion.div>
      )}

      {isIntro && (
        <motion.div
          className="flex w-full max-w-sm flex-col items-center"
          variants={introVariants}
          initial="hidden"
          animate="visible"
        >
          {t.intro.lines.map((line) => (
            <motion.p
              key={line.text}
              variants={lineVariants}
              className={`leading-relaxed text-rose-900/85 ${
                line.isTitle
                  ? "font-display text-4xl font-semibold text-rose-950 sm:text-5xl"
                  : "mt-3 text-base sm:text-lg"
              }`}
              style={
                line.isTitle ? { fontFamily: "var(--font-display)" } : undefined
              }
            >
              {line.text}
            </motion.p>
          ))}

          <motion.button
            type="button"
            variants={lineVariants}
            onClick={onContinue}
            className="btn-yes mt-10 rounded-2xl px-10 py-3.5 text-base font-semibold text-white shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D] focus-visible:ring-offset-2"
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.96 }}
            animate={
              reducedMotion
                ? {}
                : {
                    boxShadow: [
                      "0 8px 28px rgba(255, 77, 109, 0.35)",
                      "0 12px 36px rgba(255, 77, 109, 0.5)",
                      "0 8px 28px rgba(255, 77, 109, 0.35)",
                    ],
                  }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {t.intro.continue}
          </motion.button>

          <motion.p
            variants={lineVariants}
            className="mt-4 text-xs text-rose-500/70"
          >
            {t.intro.continueHint}
          </motion.p>
        </motion.div>
      )}

      {isQuestion && (
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm"
        >
          <motion.h2
            className="text-2xl font-medium leading-snug text-rose-900 sm:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.question.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-sm text-rose-700/65 sm:text-base"
          >
            {t.question.subtitle}
          </motion.p>
        </motion.div>
      )}

      {isCelebrating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <motion.div
            className="glass-card relative overflow-hidden rounded-3xl border border-white/70 px-5 py-7 shadow-xl shadow-rose-200/40 sm:px-7 sm:py-8"
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <motion.div
              className="pointer-events-none absolute -end-4 -top-4 text-5xl opacity-20"
              animate={reducedMotion ? {} : { rotate: [0, 15, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              aria-hidden="true"
            >
              🎉
            </motion.div>

            <motion.div
              className="mb-5 flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              <motion.span
                className="text-5xl sm:text-6xl"
                animate={
                  reducedMotion
                    ? {}
                    : { scale: [1, 1.18, 1], rotate: [0, -8, 8, 0] }
                }
                transition={{ duration: 0.7, ease: "easeOut" }}
                aria-hidden="true"
              >
                🎊
              </motion.span>
              <motion.h2
                className="text-2xl font-bold text-rose-950 sm:text-3xl"
                style={{ fontFamily: "var(--font-display)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
              >
                {t.celebration.title}
              </motion.h2>
            </motion.div>

            <div className="space-y-4 text-center">
              <AnimatePresence mode="popLayout">
                {t.celebration.lines.map((line, index) =>
                  celebrationStep >= index + 1 ? (
                    <motion.div
                      key={line.headline}
                      layout
                      initial={{
                        opacity: 0,
                        y: 18,
                        scale: 0.94,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        duration: reducedMotion ? 0.15 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="rounded-2xl bg-white/55 px-4 py-3.5 backdrop-blur-sm"
                    >
                      <motion.span
                        className="mb-1.5 block text-2xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        aria-hidden="true"
                      >
                        {line.emoji}
                      </motion.span>
                      <p
                        className="text-lg font-semibold leading-snug text-rose-900 sm:text-xl"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {line.headline}
                      </p>
                    </motion.div>
                  ) : null,
                )}
              </AnimatePresence>
            </div>

            {celebrationStep >= t.celebration.lines.length && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <motion.button
                  type="button"
                  onClick={onContinue}
                  className="btn-yes w-full rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg sm:text-base"
                  whileHover={reducedMotion ? {} : { scale: 1.03 }}
                  whileTap={reducedMotion ? {} : { scale: 0.97 }}
                  animate={
                    reducedMotion
                      ? {}
                      : {
                          boxShadow: [
                            "0 8px 28px rgba(255, 77, 109, 0.35)",
                            "0 12px 36px rgba(255, 77, 109, 0.55)",
                            "0 8px 28px rgba(255, 77, 109, 0.35)",
                          ],
                        }
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t.intro.continue}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {isEnding && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-3xl font-semibold text-rose-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
            animate={
              reducedMotion
                ? {}
                : { scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }
            }
            transition={{ duration: 4, repeat: Infinity }}
          >
            {t.ending.title}
          </motion.h2>
        </motion.div>
      )}
    </motion.div>
  );
}

export default memo(Hero);
