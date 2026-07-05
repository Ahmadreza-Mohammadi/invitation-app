import "dotenv/config";
import cors from "cors";
import express from "express";
import { createClient } from "@supabase/supabase-js";

function env(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : undefined;
}

function resolveSupabaseConfig() {
  const url = env("SUPABASE_URL")
    ?.replace(/\/rest\/v1\/?$/, "")
    .replace(/\/$/, "");

  const key =
    env("SUPABASE_SECRET_KEY") ||
    env("SUPABASE_SERVICE_ROLE_KEY") ||
    env("SUPABASE_PUBLISHABLE_KEY") ||
    env("SUPABASE_ANON_KEY");

  return { url, key };
}

const PORT = Number(env("PORT")) || 3001;
const { url: supabaseUrl, key: supabaseKey } = resolveSupabaseConfig();

if (!supabaseUrl || !supabaseKey) {
  console.error(`
[api] Missing Supabase config in .env

Required:
  SUPABASE_URL=https://YOUR_PROJECT.supabase.co

And ONE of these keys (recommended: SUPABASE_SECRET_KEY on server):
  SUPABASE_SECRET_KEY=sb_secret_...
  SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
  SUPABASE_ANON_KEY=eyJ... (Legacy anon JWT)
`);
  process.exit(1);
}

if (supabaseKey.startsWith("sb_publishable_")) {
  console.warn(
    "[api] Using publishable key on server. Prefer SUPABASE_SECRET_KEY for backend.",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "32kb" }));

const VALID_TYPES = new Set(["yes", "official"]);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, supabase: Boolean(supabaseUrl && supabaseKey) });
});

app.post("/api/responses", async (req, res) => {
  const {
    response_type,
    language = "en",
    selected_options = null,
    selected_labels = null,
    selected_time = null,
  } = req.body ?? {};

  if (!VALID_TYPES.has(response_type)) {
    res.status(400).json({ ok: false, error: "Invalid response_type" });
    return;
  }

  if (response_type === "official") {
    if (
      !Array.isArray(selected_options) ||
      selected_options.length === 0 ||
      typeof selected_time !== "string" ||
      !selected_time.trim()
    ) {
      res.status(400).json({ ok: false, error: "Missing picks or time" });
      return;
    }
  }

  const { error } = await supabase.from("invitation_responses").insert({
    response_type,
    language: language === "fa" ? "fa" : "en",
    selected_options,
    selected_labels,
    selected_time,
  });

  if (error) {
    console.error("[api] Supabase insert failed:", error.message);
    if (error.message?.includes("Invalid API key")) {
      console.error(
        "[api] Fix .env: use full key from Supabase → Settings → API (secret or Legacy anon JWT)",
      );
    }
    res.status(500).json({ ok: false, error: "Failed to save response" });
    return;
  }

  res.status(201).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`[api] Running on http://localhost:${PORT}`);
});
