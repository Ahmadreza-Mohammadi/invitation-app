import { memo, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#FF4D6D", "#FF758F", "#FFC2D1", "#FFE5EC", "#E1BEE7", "#FFFFFF"];

function Confetti({ active, onComplete, count = 80 }) {
  const reducedMotion = useReducedMotion();

  const pieces = useMemo(
    () =>
      Array.from({ length: reducedMotion ? 30 : count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        rotation: Math.random() * 720,
        size: 6 + Math.random() * 8,
        delay: Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 120,
      })),
    [count, reducedMotion],
  );

  useEffect(() => {
    if (!active || !onComplete) return undefined;
    const timer = setTimeout(onComplete, reducedMotion ? 800 : 2800);
    return () => clearTimeout(timer);
  }, [active, onComplete, reducedMotion]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: "-5%",
            width: piece.size,
            height: piece.size * 0.6,
            backgroundColor: piece.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: reducedMotion ? 400 : window.innerHeight + 100,
            x: piece.drift,
            rotate: piece.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: reducedMotion ? 0.8 : 2.2 + Math.random(),
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default memo(Confetti);
