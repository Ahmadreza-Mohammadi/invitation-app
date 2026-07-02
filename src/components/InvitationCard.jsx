import { memo, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../i18n/LanguageContext";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function InvitationCard({ visible, onOfficial }) {
  const reducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (!visible) {
      setSelectedIds(new Set());
      setSelectedTime("");
    }
  }, [visible]);

  const toggleOption = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canSubmit = selectedIds.size > 0 && selectedTime.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const picks = t.invitation.details
      .filter((d) => selectedIds.has(d.id))
      .map((d) => d.label);
    onOfficial?.({ picks, time: selectedTime });
  };

  if (!visible) return null;

  return (
    <motion.div
      className="flex w-full flex-1 items-center justify-center px-6 py-8"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="glass-card mx-auto max-h-[min(72dvh,580px)] w-full max-w-md overflow-y-auto rounded-3xl border border-white/70 p-6 shadow-2xl shadow-rose-200/40 sm:p-8">
        <motion.h3
          className="text-center text-2xl font-semibold text-rose-900"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {t.invitation.title}
        </motion.h3>
        <motion.p
          className="mt-2 text-center text-sm text-rose-600/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {t.invitation.pickHint}
        </motion.p>

        <motion.ul
          className="mt-5 space-y-2"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {t.invitation.details.map((detail) => {
            const isSelected = selectedIds.has(detail.id);
            return (
              <motion.li key={detail.id} variants={itemVariants}>
                <button
                  type="button"
                  onClick={() => toggleOption(detail.id)}
                  className={`invitation-option flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start backdrop-blur-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D] focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-2 border-[#FF4D6D] bg-[#FF4D6D]/15 shadow-md shadow-rose-200/50"
                      : "border border-white/60 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {detail.icon}
                  </span>
                  <span className="flex-1 text-base font-medium text-rose-900/90 sm:text-lg">
                    {detail.label}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      isSelected
                        ? "bg-[#FF4D6D] text-white"
                        : "bg-white/80 text-rose-300"
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          className="mt-6 rounded-2xl border border-white/60 bg-white/45 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.5 }}
        >
          <p
            className="text-center text-base font-semibold text-rose-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.invitation.timeLabel}
          </p>
          <p className="mt-1 text-center text-xs text-rose-600/70">
            {t.invitation.timeHint}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {t.invitation.timeSlots.map((slot) => {
              const isActive = selectedTime === slot.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => setSelectedTime(slot.value)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D] ${
                    isActive
                      ? "bg-[#FF4D6D] text-white shadow-md"
                      : "bg-white/70 text-rose-800 hover:bg-white"
                  }`}
                  aria-pressed={isActive}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-center text-xs text-rose-600/75">
              {t.invitation.customTimeLabel}
            </span>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="time-input w-full rounded-xl border border-rose-200/80 bg-white/80 px-4 py-2.5 text-center text-base font-medium text-rose-900 outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D]"
            />
          </label>
        </motion.div>

        {!canSubmit && (
          <p className="mt-4 text-center text-xs text-rose-500/80">
            {t.invitation.validationHint}
          </p>
        )}

        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="btn-yes mt-5 w-full rounded-2xl py-4 text-lg font-semibold text-white shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D6D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.65 }}
          whileHover={reducedMotion || !canSubmit ? {} : { scale: 1.03 }}
          whileTap={reducedMotion || !canSubmit ? {} : { scale: 0.97 }}
        >
          {t.invitation.officialButton}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default memo(InvitationCard);
