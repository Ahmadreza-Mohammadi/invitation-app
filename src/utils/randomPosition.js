const BEHAVIORS = [
  "move",
  "jump",
  "rotate",
  "shrink",
  "stretch",
  "teleport",
  "flip",
  "shake",
  "vanish",
  "swap",
];

export const ESCAPE_BLEED = 52;

export function pickBehavior(attemptCount) {
  const pool =
    attemptCount > 4
      ? BEHAVIORS
      : BEHAVIORS.filter((b) => b !== "swap" && b !== "vanish");
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomPosition(
  containerRect,
  width,
  height,
  padding = 12,
  bleed = ESCAPE_BLEED,
) {
  if (!containerRect || containerRect.width <= 0) {
    return { x: 0, y: 0 };
  }

  const minX = -bleed + padding;
  const minY = -bleed + padding;
  const maxX = containerRect.width - width + bleed - padding;
  const maxY = containerRect.height - height + bleed - padding;

  return {
    x: minX + Math.random() * Math.max(0, maxX - minX),
    y: minY + Math.random() * Math.max(0, maxY - minY),
  };
}

export function getSpringConfig(attemptCount, reducedMotion) {
  if (reducedMotion) {
    return { type: "tween", duration: 0.2 };
  }

  const stiffness = Math.min(900, 280 + attemptCount * 45);
  const damping = Math.max(12, 28 - attemptCount * 1.5);

  return { type: "spring", stiffness, damping, mass: 0.6 };
}

export function clampPosition(
  x,
  y,
  containerRect,
  width,
  height,
  padding = 8,
  bleed = ESCAPE_BLEED,
) {
  if (!containerRect) return { x, y };

  const minX = -bleed;
  const minY = -bleed;
  const maxX = containerRect.width - width + bleed;
  const maxY = containerRect.height - height + bleed;

  return {
    x: Math.max(minX, Math.min(x, maxX - padding)),
    y: Math.max(minY, Math.min(y, maxY - padding)),
  };
}
