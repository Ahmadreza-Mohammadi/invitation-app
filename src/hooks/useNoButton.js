import { useCallback, useRef, useState } from "react";
import { getRandomMessage, getRandomSurprise } from "../utils/messages";
import {
  clampPosition,
  getRandomPosition,
  getSpringConfig,
  pickBehavior,
} from "../utils/randomPosition";

const INITIAL_OFFSET = { x: 0, y: 0 };

export function useNoButton({ containerRef, reducedMotion = false, lang = "en" }) {
  const [position, setPosition] = useState(INITIAL_OFFSET);
  const [isEscaped, setIsEscaped] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [message, setMessage] = useState(null);
  const [messageKey, setMessageKey] = useState(0);
  const [motionState, setMotionState] = useState({
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    flip: false,
  });
  const [swapped, setSwapped] = useState(false);
  const [surprise, setSurprise] = useState(null);
  const lastMessage = useRef(null);
  const buttonSize = useRef({ width: 120, height: 48 });

  const triggerSurprise = useCallback(() => {
    if (Math.random() < 0.35) {
      setSurprise({ type: getRandomSurprise(), id: Date.now() });
    }
  }, []);

  const showMessage = useCallback(() => {
    const next = getRandomMessage(lang, lastMessage.current);
    lastMessage.current = next;
    setMessage(next);
    setMessageKey((k) => k + 1);
  }, []);

  const escape = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const { width, height } = buttonSize.current;
    const behavior = pickBehavior(attemptCount);
    const nextAttempt = attemptCount + 1;
    const spring = getSpringConfig(nextAttempt, reducedMotion);

    setIsEscaped(true);
    setAttemptCount(nextAttempt);
    showMessage();
    triggerSurprise();

    const nextPos = getRandomPosition(rect, width, height);

    setMotionState((prev) => ({
      rotate: prev.rotate,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      flip: prev.flip,
    }));

    switch (behavior) {
      case "move":
        setPosition(clampPosition(nextPos.x, nextPos.y, rect, width, height));
        break;
      case "jump":
        setPosition(
          clampPosition(nextPos.x, nextPos.y - 30, rect, width, height),
        );
        setTimeout(() => {
          setPosition(clampPosition(nextPos.x, nextPos.y, rect, width, height));
        }, reducedMotion ? 0 : 180);
        break;
      case "rotate":
        setPosition(clampPosition(nextPos.x, nextPos.y, rect, width, height));
        setMotionState((p) => ({
          ...p,
          rotate: p.rotate + (Math.random() > 0.5 ? 360 : -360),
        }));
        break;
      case "shrink":
        setPosition(clampPosition(nextPos.x, nextPos.y, rect, width, height));
        setMotionState((p) => ({ ...p, scaleX: 0.55, scaleY: 0.55 }));
        setTimeout(() => {
          setMotionState((p) => ({ ...p, scaleX: 1, scaleY: 1 }));
        }, reducedMotion ? 0 : 400);
        break;
      case "stretch":
        setPosition(clampPosition(nextPos.x, nextPos.y, rect, width, height));
        setMotionState((p) => ({
          ...p,
          scaleX: 1.35,
          scaleY: 0.65,
        }));
        setTimeout(() => {
          setMotionState((p) => ({ ...p, scaleX: 1, scaleY: 1 }));
        }, reducedMotion ? 0 : 350);
        break;
      case "teleport":
        setMotionState((p) => ({ ...p, opacity: 0 }));
        setTimeout(() => {
          setPosition(
            clampPosition(nextPos.x, nextPos.y, rect, width, height),
          );
          setMotionState((p) => ({ ...p, opacity: 1 }));
        }, reducedMotion ? 0 : 120);
        break;
      case "flip":
        setPosition(clampPosition(nextPos.x, nextPos.y, rect, width, height));
        setMotionState((p) => ({ ...p, flip: !p.flip }));
        break;
      case "shake":
        setMotionState((p) => ({ ...p, rotate: p.rotate + 12 }));
        setTimeout(() => {
          setPosition(
            clampPosition(nextPos.x, nextPos.y, rect, width, height),
          );
          setMotionState((p) => ({ ...p, rotate: 0 }));
        }, reducedMotion ? 0 : 200);
        break;
      case "vanish":
        setMotionState((p) => ({ ...p, opacity: 0 }));
        setTimeout(() => {
          setPosition(
            clampPosition(nextPos.x, nextPos.y, rect, width, height),
          );
          setMotionState((p) => ({ ...p, opacity: 1 }));
        }, reducedMotion ? 0 : 500);
        break;
      case "swap":
        setSwapped((s) => !s);
        setPosition(clampPosition(nextPos.x, nextPos.y, rect, width, height));
        break;
      default:
        setPosition(clampPosition(nextPos.x, nextPos.y, rect, width, height));
    }

    return spring;
  }, [
    attemptCount,
    containerRef,
    reducedMotion,
    showMessage,
    triggerSurprise,
    lang,
  ]);

  const registerButtonSize = useCallback((width, height) => {
    buttonSize.current = { width, height };
  }, []);

  const clearSurprise = useCallback(() => setSurprise(null), []);

  const clearMessage = useCallback(() => setMessage(null), []);

  return {
    position,
    isEscaped,
    attemptCount,
    message,
    messageKey,
    motionState,
    swapped,
    surprise,
    escape,
    registerButtonSize,
    clearSurprise,
    clearMessage,
    springConfig: getSpringConfig(attemptCount, reducedMotion),
  };
}
