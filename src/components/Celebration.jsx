import { memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function Celebration({ surprise, shake }) {
  const reducedMotion = useReducedMotion();

  if (!surprise && !shake) return null;

  return (
    <AnimatePresence>
      {shake && (
        <motion.div
          key="shake-overlay"
          className="pointer-events-none fixed inset-0 z-40"
          initial={{ x: 0 }}
          animate={
            reducedMotion
              ? {}
              : { x: [0, -6, 6, -4, 4, -2, 2, 0] }
          }
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        />
      )}

      {surprise?.type === "lol" && (
        <motion.span
          key={`lol-${surprise.id}`}
          className="pointer-events-none fixed left-1/2 top-1/3 z-40 -translate-x-1/2 text-5xl font-bold text-[#FF4D6D]"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8], y: -40 }}
          transition={{ duration: 1.8 }}
          aria-hidden="true"
        >
          LOL
        </motion.span>
      )}

      {surprise?.type === "emojiBurst" && (
        <motion.div
          key={`emoji-${surprise.id}`}
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
          aria-hidden="true"
        >
          {["😂", "🥰", "😏", "💕", "✨"].map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0.5],
                x: (i - 2) * 60,
                y: [0, -80 - i * 20],
              }}
              transition={{ duration: 1.5, delay: i * 0.08 }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      )}

      {surprise?.type === "spin" && (
        <motion.div
          key={`spin-${surprise.id}`}
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
          aria-hidden="true"
        >
          <motion.span
            className="text-6xl"
            animate={{ rotate: 720, scale: [1, 1.5, 0] }}
            transition={{ duration: 1.2 }}
          >
            🙈
          </motion.span>
        </motion.div>
      )}

      {surprise?.type === "fireworks" && (
        <motion.div
          key={`fw-${surprise.id}`}
          className="pointer-events-none fixed inset-0 z-40"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
              style={{
                background: ["#FF4D6D", "#FF758F", "#FFC2D1", "#E1BEE7"][i % 4],
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((i / 8) * Math.PI * 2) * 120,
                y: Math.sin((i / 8) * Math.PI * 2) * 120,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(Celebration);
