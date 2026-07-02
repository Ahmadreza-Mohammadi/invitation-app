import { funnyMessages } from "../i18n/funnyMessages";

export function getRandomMessage(lang = "en", exclude = null) {
  const messages = funnyMessages[lang] ?? funnyMessages.en;
  const pool = exclude ? messages.filter((m) => m !== exclude) : messages;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const SURPRISE_EVENTS = [
  "confetti",
  "heartRain",
  "spin",
  "shake",
  "emojiBurst",
  "lol",
  "heartExplosion",
  "fireworks",
];

export function getRandomSurprise() {
  return SURPRISE_EVENTS[Math.floor(Math.random() * SURPRISE_EVENTS.length)];
}
