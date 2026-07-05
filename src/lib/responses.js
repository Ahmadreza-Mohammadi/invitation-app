const API_BASE = (import.meta.env.VITE_API_URL ?? "/api").replace(/\/$/, "");

export async function saveResponse(payload) {
  try {
    const res = await fetch(`${API_BASE}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (import.meta.env.DEV) {
        const body = await res.json().catch(() => ({}));
        console.error("[api] Failed to save response:", body.error ?? res.status);
      }
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error("[api] Network error:", err.message);
    }
    return { ok: false };
  }
}

export function saveYesResponse(lang) {
  return saveResponse({
    response_type: "yes",
    language: lang,
    selected_options: null,
    selected_labels: null,
    selected_time: null,
  });
}

export function saveOfficialResponse({ lang, pickIds, picks, time }) {
  return saveResponse({
    response_type: "official",
    language: lang,
    selected_options: pickIds,
    selected_labels: picks,
    selected_time: time,
  });
}
