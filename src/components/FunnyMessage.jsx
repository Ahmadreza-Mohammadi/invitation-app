import { memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SPARKLES = ["✨", "💕", "😏", "💫", "🙈"];

function FunnyMessage({ message, messageKey }) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key={messageKey}
          className="pointer-events-none absolute inset-x-0 top-[24%] z-40 flex justify-center px-3 sm:top-[26%]"
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.25, y: 48, rotate: -10, filter: "blur(10px)" }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                }
          }
          exit={
            reducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0.8,
                  y: -24,
                  rotate: 6,
                  filter: "blur(8px)",
                }
          }
          transition={
            reducedMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 480, damping: 16, mass: 0.75 }
          }
        >
          <motion.div
            className="funny-message-glow absolute -inset-6 -z-10 rounded-[2rem] sm:-inset-8"
            aria-hidden="true"
          />

          {!reducedMotion &&
            SPARKLES.map((emoji, index) => (
              <motion.span
                key={`${messageKey}-${emoji}-${index}`}
                className="absolute z-10 select-none text-xl sm:text-2xl"
                style={{
                  left: `${8 + index * 20}%`,
                  top: index % 2 === 0 ? "-14px" : undefined,
                  bottom: index % 2 === 1 ? "-12px" : undefined,
                }}
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={{
                  opacity: [0, 1, 1, 0.6, 1],
                  scale: [0.4, 1.35, 1, 1.15, 1],
                  y: [0, -10, 0, -6, 0],
                  rotate: [0, 18, -12, 8, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: index * 0.18,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              >
                {emoji}
              </motion.span>
            ))}

          <motion.div
            className="funny-message-bubble relative w-full max-w-[94%] sm:max-w-md"
            animate={
              reducedMotion
                ? {}
                : {
                    rotate: [0, -2, 2, -1.5, 1.5, 0],
                    scale: [1, 1.03, 1, 1.02, 1],
                  }
            }
            transition={{
              duration: 0.55,
              repeat: Infinity,
              repeatDelay: 1.1,
              ease: "easeInOut",
            }}
          >
            <div className="funny-message-shimmer" aria-hidden="true" />
            <motion.p
              className="funny-message-text relative px-5 py-4 text-center text-lg font-bold leading-snug sm:px-8 sm:py-5 sm:text-xl"
              initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(FunnyMessage);
