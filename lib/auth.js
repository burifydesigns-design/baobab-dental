import crypto from "node:crypto";
import { jsonResponse } from "./http.js";
const COOKIE = "baobab_admin_session";
function parseCookies(header = "") {
  return Object.fromEntries(header.split(";").map(part => {
    const index = part.indexOf("=");
    if (index < 0) return ["", ""];
    try { return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())]; }
    catch { return ["", ""]; }
  }).filter(([key]) => key));
}
function sign(value, env) {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) throw new Error("SESSION_SECRET must contain at least 32 characters.");
  return crypto.createHmac("sha256", env.SESSION_SECRET).update(value).digest("base64url");
}
export function createSession(email, env) {
  const payload = Buffer.from(JSON.stringify({ sub: email, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  return payload + "." + sign(payload, env);
}
export function verifySession(request, env) {
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) return null;
  const token = parseCookies(request.headers.get("cookie") || "")[COOKIE];
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  try {
    const expected = sign(payload, env);
    const left = Buffer.from(signature), right = Buffer.from(expected);
    if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.sub || !Number.isFinite(data.exp) || data.exp < Date.now()) return null;
    return { email: data.sub };
  } catch { return null; }
}
export function sessionCookie(token) {
  return COOKIE + "=" + encodeURIComponent(token) + "; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800";
}
export function clearedSessionCookie() {
  return COOKIE + "=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0";
}
export function unauthorizedResponse() {
  return jsonResponse(401, { error: "Admin sign-in required." });
}
