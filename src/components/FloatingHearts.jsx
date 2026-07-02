import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

function FloatingHearts({ count = 12, burst = false }) {
  const reducedMotion = useReducedMotion();

  const hearts = useMemo(
    () =>
      Array.from({ length: burst ? 30 : count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: burst ? 14 + Math.random() * 22 : 10 + (i % 5) * 4,
        delay: burst ? Math.random() * 0.5 : i * 0.35,
        duration: burst ? 2.5 + Math.random() * 2 : 10 + (i % 5) * 2,
        color:
          i % 3 === 0
            ? "rgba(255, 77, 109, 0.45)"
            : i % 3 === 1
              ? "rgba(255, 117, 143, 0.4)"
              : "rgba(255, 194, 209, 0.5)",
      })),
    [count, burst],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((heart, index) => (
        <motion.span
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            bottom: burst ? `${Math.random() * 40}%` : "-5%",
            fontSize: heart.size,
            color: heart.color,
          }}
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={
            reducedMotion
              ? { opacity: 0.5, y: 0, scale: 1 }
              : burst
                ? {
                    opacity: [0, 1, 0.8, 0],
                    y: [0, -120 - Math.random() * 200],
                    x: [(Math.random() - 0.5) * 80],
                    rotate: [0, Math.random() * 360],
                    scale: [0.5, 1.2, 0.8],
                  }
                : {
                    opacity: [0, 0.7, 0.5, 0],
                    y: [0, -window.innerHeight * 1.1],
                    rotate: [0, 360],
                    scale: [0.6, 1, 0.8],
                  }
          }
          transition={{
            duration: heart.duration,
            delay: burst ? heart.delay : heart.delay + index * 0.15,
            repeat: burst ? 0 : Infinity,
            ease: burst ? "easeOut" : "linear",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

export default memo(FloatingHearts);
