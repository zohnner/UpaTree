import { getCloudflareContext } from "@opennextjs/cloudflare";

// Lightweight session auth for the /admin tool: one shared password
// (a Cloudflare secret, not stored in the codebase or D1) and a
// stateless, HMAC-signed session cookie. No user accounts/roles — if
// per-staff logins are needed later, this is the place to grow into
// that (e.g. move to a `users` table in D1 + per-user password hashes).

export const SESSION_COOKIE_NAME = "uat_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

// These are Cloudflare secrets (`wrangler secret put ...` in prod,
// `.dev.vars` locally) — not declared in wrangler.jsonc, so they don't
// show up in the generated CloudflareEnv type. Cast locally instead.
interface AuthEnv {
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
}

function authEnv(): AuthEnv {
  return getCloudflareContext().env as unknown as AuthEnv;
}

function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );
  return bufferToBase64Url(signature);
}

/** Constant-time-ish comparison: hash both sides first so differing
 * lengths/content don't leak through comparison timing. */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [hashA, hashB] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const bytesA = new Uint8Array(hashA);
  const bytesB = new Uint8Array(hashB);
  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) diff |= bytesA[i] ^ bytesB[i];
  return diff === 0;
}

export async function checkPassword(candidate: string): Promise<boolean> {
  const { ADMIN_PASSWORD } = authEnv();
  if (!ADMIN_PASSWORD || !candidate) return false;
  return safeEqual(candidate, ADMIN_PASSWORD);
}

export async function createSessionCookieValue(): Promise<string> {
  const { SESSION_SECRET } = authEnv();
  if (!SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not configured.");
  }
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  const signature = await hmac(SESSION_SECRET, payload);
  return `${payload}.${signature}`;
}

export async function isValidSession(
  cookieValue: string | undefined
): Promise<boolean> {
  if (!cookieValue) return false;

  const [payload, signature] = cookieValue.split(".");
  if (!payload || !signature) return false;

  const { SESSION_SECRET } = authEnv();
  if (!SESSION_SECRET) return false;

  const expected = await hmac(SESSION_SECRET, payload);
  if (expected !== signature) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  return true;
}
