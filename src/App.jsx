import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";
import Buttons from "./components/Buttons";
import Celebration from "./components/Celebration";
import Confetti from "./components/Confetti";
import FloatingHearts from "./components/FloatingHearts";
import FunnyMessage from "./components/FunnyMessage";
import Hero from "./components/Hero";
import InvitationCard from "./components/InvitationCard";
import BackButton from "./components/BackButton";
import LanguageToggle from "./components/LanguageToggle";
import { useTranslation } from "./i18n/LanguageContext";
import { saveOfficialResponse, saveYesResponse } from "./lib/responses";

const PHASES = {
  INTRO: "intro",
  QUESTION: "question",
  CELEBRATING: "celebrating",
  INVITATION: "invitation",
  OFFICIAL: "official",
  ENDING: "ending",
};

function App() {
  const reducedMotion = useReducedMotion();
  const { t, lang } = useTranslation();

  const [phase, setPhase] = useState(PHASES.INTRO);
  const [celebrationStep, setCelebrationStep] = useState(0);
  const [funnyMessage, setFunnyMessage] = useState(null);
  const [messageKey, setMessageKey] = useState(0);
  const [surprise, setSurprise] = useState(null);
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [fullScreenCelebration, setFullScreenCelebration] = useState(false);

  const isBright =
    phase === PHASES.CELEBRATING ||
    phase === PHASES.OFFICIAL ||
    phase === PHASES.ENDING;

  const handleContinue = useCallback(() => {
    if (phase === PHASES.INTRO) {
      setPhase(PHASES.QUESTION);
    } else if (phase === PHASES.CELEBRATING) {
      setPhase(PHASES.INVITATION);
    }
  }, [phase]);

  const handleEscape = useCallback((message, key) => {
    setFunnyMessage(message);
    setMessageKey(key);
  }, []);

  const handleSurprise = useCallback((event) => {
    setSurprise(event);
    if (event.type === "confetti" || event.type === "heartExplosion") {
      setConfetti(true);
    }
    if (event.type === "heartRain" || event.type === "heartExplosion") {
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 3000);
    }
    if (event.type === "shake") {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, []);

  const shakeScreen = useCallback(() => {
    if (Math.random() < 0.2) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, []);

  const handleYes = useCallback(() => {
    setCelebrationStep(0);
    setPhase(PHASES.CELEBRATING);
    setConfetti(true);
    setHeartBurst(true);
    setFunnyMessage(null);
    saveYesResponse(lang);
  }, [lang]);

  const handleOfficial = useCallback(
    ({ pickIds, picks, time }) => {
      setPhase(PHASES.OFFICIAL);
      setFullScreenCelebration(true);
      setConfetti(true);
      setHeartBurst(true);
      saveOfficialResponse({ lang, pickIds, picks, time });
    },
    [lang],
  );

  const handleBack = useCallback(() => {
    setFunnyMessage(null);
    setConfetti(false);
    setHeartBurst(false);
    setShake(false);
    setSurprise(null);

    switch (phase) {
      case PHASES.QUESTION:
        setPhase(PHASES.INTRO);
        break;
      case PHASES.CELEBRATING:
        setCelebrationStep(0);
        setPhase(PHASES.QUESTION);
        break;
      case PHASES.INVITATION:
        setCelebrationStep(1);
        setPhase(PHASES.CELEBRATING);
        break;
      case PHASES.OFFICIAL:
        setFullScreenCelebration(false);
        setPhase(PHASES.INVITATION);
        break;
      case PHASES.ENDING:
        setPhase(PHASES.INVITATION);
        break;
      default:
        break;
    }
  }, [phase]);

  const showBack =
    phase === PHASES.QUESTION ||
    phase === PHASES.CELEBRATING ||
    phase === PHASES.INVITATION ||
    phase === PHASES.OFFICIAL ||
    phase === PHASES.ENDING;

  useEffect(() => {
    if (phase !== PHASES.CELEBRATING) return undefined;

    const delays = reducedMotion ? [350] : [900];

    const timers = delays.map((delay, index) =>
      setTimeout(() => setCelebrationStep(index + 1), delay),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== PHASES.OFFICIAL) return undefined;

    const endingTimer = setTimeout(
      () => {
        setFullScreenCelebration(false);
        setPhase(PHASES.ENDING);
      },
      reducedMotion ? 1500 : 4000,
    );

    return () => clearTimeout(endingTimer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (!funnyMessage) return undefined;
    const t = setTimeout(() => setFunnyMessage(null), 4200);
    return () => clearTimeout(t);
  }, [funnyMessage, messageKey]);

  return (
    <div className="romantic-bg relative min-h-dvh overflow-x-hidden">
      <FloatingHearts count={14} />
      {heartBurst && <FloatingHearts burst />}

      <Confetti
        active={confetti}
        onComplete={() => setConfetti(false)}
      />

      <Celebration surprise={surprise} shake={shake} />

      <motion.div
        className="relative flex min-h-dvh items-center justify-center p-3 sm:p-6"
        animate={
          shake && !reducedMotion
            ? { x: [0, -5, 5, -3, 3, 0] }
            : phase === PHASES.ENDING && !reducedMotion
              ? { scale: [1, 1.02, 1] }
              : {}
        }
        transition={
          phase === PHASES.ENDING
            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.45 }
        }
      >
        <motion.div
          className="app-shell relative z-10 flex w-full max-w-[480px] min-h-[min(780px,92dvh)] flex-col overflow-hidden rounded-[2rem] border border-white/70 sm:max-w-[520px]"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: isBright ? "brightness(1.05)" : "brightness(1)",
          }}
          transition={{
            duration: reducedMotion ? 0.2 : 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="app-shell__bg absolute inset-0 bg-cover bg-center bg-no-repeat"
            aria-hidden="true"
          />
          <motion.div
            className="app-shell__overlay absolute inset-0"
            aria-hidden="true"
            animate={{
              backgroundColor: isBright
                ? "rgba(255, 245, 248, 0.28)"
                : "rgba(255, 245, 248, 0.42)",
            }}
            transition={{ duration: 1.2 }}
          />

          <AnimatedBackground
            intensity={
              phase === PHASES.QUESTION || phase === PHASES.INTRO
                ? "normal"
                : "celebration"
            }
            brighter={isBright}
          />

          <div className="relative z-10 flex flex-1 flex-col">
            <LanguageToggle />
            <AnimatePresence>
              {showBack && (
                <BackButton key="back-btn" onClick={handleBack} />
              )}
            </AnimatePresence>

            <FunnyMessage message={funnyMessage} messageKey={messageKey} />

            <AnimatePresence mode="wait">
              {!fullScreenCelebration && phase !== PHASES.ENDING && (
                <motion.div
                  key="main-content"
                  className="flex flex-1 flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {(phase === PHASES.INTRO ||
                    phase === PHASES.QUESTION ||
                    phase === PHASES.CELEBRATING) && (
                    <Hero
                      phase={phase}
                      celebrationStep={celebrationStep}
                      onContinue={handleContinue}
                    />
                  )}

                  <Buttons
                    visible={phase === PHASES.QUESTION}
                    onYes={handleYes}
                    onEscape={handleEscape}
                    onSurprise={handleSurprise}
                    shakeScreen={shakeScreen}
                  />

                  <InvitationCard
                    visible={phase === PHASES.INVITATION}
                    onOfficial={handleOfficial}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {fullScreenCelebration && (
              <motion.div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFE5EC]/90 via-[#FFC2D1]/80 to-[#FF758F]/70 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span
                  className="text-8xl"
                  animate={
                    reducedMotion
                      ? {}
                      : { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                >
                  💖
                </motion.span>
                <motion.h2
                  className="mt-6 px-6 text-center text-3xl font-semibold text-rose-900"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t.official.title}
                </motion.h2>
                <motion.p
                  className="mt-3 text-lg text-rose-800/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {t.official.subtitle}
                </motion.p>
              </motion.div>
            )}

            {phase === PHASES.ENDING && (
              <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <Hero
                  phase={phase}
                  celebrationStep={0}
                  onContinue={() => {}}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
