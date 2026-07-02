export const translations = {
  en: {
    intro: {
      lines: [
        { text: "Hey Sogand ❤️", isTitle: true },
        { text: "I've been wanting to ask you something for a while...", isTitle: false },
        { text: "It's a small question, but it matters to me...", isTitle: false },
        { text: "Are you ready?", isTitle: false },
      ],
      continue: "Tap to continue ✨",
      continueHint: "(your answer is waiting inside...)",
    },
    question: {
      title: "Will you go on a date with me?",
      subtitle: "No rush, Sogand... but I think you already know 💕",
    },
    celebration: {
      title: "YESSSS! 🥳",
      lines: [
        {
          headline: "I knew you'd say yes 😏",
          emoji: "😏",
        },
      ],
      swearButton: "✋ I swear I'll show up",
    },
    invitation: {
      title: "Pick Your Date Adventure",
      pickHint: "Tap everything that sounds fun",
      timeLabel: "What time works for you?",
      timeHint: "Pick a time below",
      timeSlots: [
        { value: "10:00", label: "10:00 AM" },
        { value: "13:00", label: "1:00 PM" },
        { value: "16:00", label: "4:00 PM" },
        { value: "19:00", label: "7:00 PM" },
        { value: "21:00", label: "9:00 PM" },
      ],
      customTimeLabel: "Or choose exact time",
      validationHint: "Pick at least one idea and a time ✨",
      details: [
        { id: "coffee", icon: "☕", label: "Coffee date?" },
        { id: "breakfast", icon: "🥐", label: "Breakfast date?" },
        { id: "dinner", icon: "🍽", label: "Fancy dinner?" },
        { id: "burgers", icon: "🍔", label: "Burgers & zero shame" },
        { id: "pizza", icon: "🍕", label: "Pizza night?" },
        { id: "movie", icon: "🎬", label: "Movie + overpriced popcorn" },
        { id: "icecream", icon: "🍦", label: "Ice cream after (mandatory)" },
        { id: "justus", icon: "❤️", label: "Honestly? Just us." },
      ],
      officialButton: "Let's Make It Official",
    },
    official: {
      title: "It's Official! 🎉",
      subtitle: "Best answer ever.",
    },
    ending: {
      title: "See you soon ❤️",
    },
    buttons: {
      yes: "❤️ YES",
      no: "🙈 NO",
      yesAria: "Yes, I will go on a date with you",
      noAria: "No button — good luck clicking it",
    },
    back: {
      label: "Back",
      aria: "Go back to previous step",
    },
    language: {
      switchTo: "فا",
      aria: "Switch to Persian",
    },
    pageTitle: "Date Invitation — Sogand",
  },
  fa: {
    intro: {
      lines: [
        { text: "سلام سوگند ❤️", isTitle: true },
        { text: "مدت‌ها بود می‌خواستم ازت یه چیزی بپرسم...", isTitle: false },
        { text: "یه سوال کوچیک دارم، فقط برام مهمه...", isTitle: false },
        { text: "آماده‌ای؟", isTitle: false },
      ],
      continue: "ادامه بده ✨",
      continueHint: "(جوابت اون ورونه...)",
    },
    question: {
      title: "دوست داری بریم قرار؟",
      subtitle: "عجله نکن سوگند جان... ولی فکر کنم خودت هم می‌دونی 💕",
    },
    celebration: {
      title: "آرهههه! 🥳",
      lines: [
        {
          headline: "میدونستم جوابت مثبته 😏",
          emoji: "😏",
        },
      ],
      swearButton: "✋ قول می‌دم، میام",
    },
    invitation: {
      title: "ماجراجویی قرارمون",
      pickHint: "هر چی جذابه بزن روش",
      timeLabel: "چه ساعتی برات خوبه؟",
      timeHint: "یه ساعت انتخاب کن",
      timeSlots: [
        { value: "10:00", label: "۱۰:۰۰ صبح" },
        { value: "13:00", label: "۱۳:۰۰ ظهر" },
        { value: "16:00", label: "۱۶:۰۰ عصر" },
        { value: "19:00", label: "۱۹:۰۰ شب" },
        { value: "21:00", label: "۲۱:۰۰ شب" },
      ],
      customTimeLabel: "یا ساعت دقیق انتخاب کن",
      validationHint: "حداقل یه ایده و یه ساعت انتخاب کن ✨",
      details: [
        { id: "coffee", icon: "☕", label: "قرار قهوه؟" },
        { id: "breakfast", icon: "🥐", label: "صبحونه بریم؟" },
        { id: "dinner", icon: "🍽", label: "شام شیک؟" },
        { id: "burgers", icon: "🍔", label: "برگر و بدون خجالت" },
        { id: "pizza", icon: "🍕", label: "شب پیتزا؟" },
        { id: "movie", icon: "🎬", label: "فیلم + پف‌فیل گرون" },
        { id: "icecream", icon: "🍦", label: "بعدش بستنی (اجباری)" },
        { id: "justus", icon: "❤️", label: "راستش؟ فقط خودمون." },
      ],
      officialButton: "رسمیش کنیم",
    },
    official: {
      title: "رسمی شد! 🎉",
      subtitle: "بهترین جواب ممکن.",
    },
    ending: {
      title: "به زودی می‌بینمت ❤️",
    },
    buttons: {
      yes: "❤️ آره",
      no: "🙈 نه",
      yesAria: "بله، قرار می‌ریم",
      noAria: "دکمه نه — موفق باشی کلیکش کنی",
    },
    back: {
      label: "برگشت",
      aria: "برگشت به مرحله قبل",
    },
    language: {
      switchTo: "EN",
      aria: "Switch to English",
    },
    pageTitle: "دعوت به قرار — سوگند",
  },
};

export function getTranslation(lang) {
  return translations[lang] ?? translations.en;
}
