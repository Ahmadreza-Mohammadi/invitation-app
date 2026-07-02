import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

function AnimatedBackground({ intensity = "normal", brighter = false }) {
  const reducedMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: reducedMotion ? 8 : 24 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        top: `${(i * 23 + 11) % 100}%`,
        size: 2 + (i % 4),
        delay: (i % 8) * 0.6,
        duration: 12 + (i % 6) * 2,
      })),
    [reducedMotion],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: reducedMotion ? 6 : 18 }, (_, i) => ({
        id: i,
        left: `${(i * 29 + 3) % 100}%`,
        top: `${(i * 19 + 5) % 100}%`,
        delay: i * 0.4,
      })),
    [reducedMotion],
  );

  const glowIntensity = brighter ? 0.7 : intensity === "celebration" ? 0.55 : 0.35;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.3 : 2.2, ease: "easeOut" }}
      >
        <div
          className="absolute -left-20 -top-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: `rgba(255, 117, 143, ${glowIntensity})` }}
        />
        <div
          className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `rgba(225, 190, 231, ${glowIntensity})` }}
        />
        <div
          className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `rgba(255, 194, 209, ${glowIntensity * 0.8})` }}
        />
      </motion.div>

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/70"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={
            reducedMotion
              ? { opacity: 0.4 }
              : {
                  y: [0, -18, 0],
                  x: [0, 6, -4, 0],
                  opacity: [0.2, 0.7, 0.2],
                }
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-[10px] text-white/80"
          style={{ left: s.left, top: s.top }}
          animate={
            reducedMotion
              ? { opacity: 0.5 }
              : { opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

export default memo(AnimatedBackground);
