import crypto from "node:crypto";
import { withDb } from "../../../lib/mongodb.js";
import { jsonResponse, readJson, isAllowedOrigin, methodNotAllowed, badRequestResponse } from "../../../lib/http.js";
import { createSession, sessionCookie } from "../../../lib/auth.js";
function verifyPassword(password, encoded) {
  const [salt, expectedHex] = String(encoded || "").split(":");
  if (!salt || !expectedHex || !/^[a-f0-9]{128}$/i.test(expectedHex)) return false;
  const actual = crypto.scryptSync(password, salt, 64), expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}
function clientKey(request) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  return crypto.createHash("sha256").update(ip).digest("hex");
}
async function recordAttempt(db, key) {
  const now = new Date();
  const result = await db.collection("admin_login_attempts").findOneAndUpdate({ _id: key }, [{
    $set: {
      count: { $cond: [{ $gt: ["$expiresAt", now] }, { $add: [{ $ifNull: ["$count", 0] }, 1] }, 1] },
      expiresAt: { $cond: [{ $gt: ["$expiresAt", now] }, "$expiresAt", new Date(now.getTime() + 15 * 60 * 1000)] },
      updatedAt: now
    }
  }], { upsert: true, returnDocument: "after" });
  return result?.value || result;
}
export async function onRequest({ request, env }) {
  if (request.method !== "POST") return methodNotAllowed("POST");
  if (!isAllowedOrigin(request, env)) return jsonResponse(403, { error: "Request origin is not allowed." });
  try {
    const body = await readJson(request);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const adminEmail = String(env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (!adminEmail || !env.ADMIN_PASSWORD_HASH || !env.SESSION_SECRET) return jsonResponse(503, { error: "Admin authentication is not configured." });
    if (password.length > 1024) return jsonResponse(400, { error: "Invalid sign-in details." });
    const result = await withDb(env, async db => {
      const key = clientKey(request), attempt = await recordAttempt(db, key);
      if (Number(attempt?.count || 0) > 5) return { response: jsonResponse(429, { error: "Too many sign-in attempts. Please wait 15 minutes before trying again." }) };
      if (email !== adminEmail || !verifyPassword(password, env.ADMIN_PASSWORD_HASH)) {
        await db.collection("admin_audit_logs").insertOne({ action: "login_failed", email: email.slice(0, 254), createdAt: new Date() }).catch(() => {});
        return { response: jsonResponse(401, { error: "Email or password is incorrect." }) };
      }
      await db.collection("admin_login_attempts").deleteOne({ _id: key });
      await db.collection("admin_audit_logs").insertOne({ action: "login_success", email: adminEmail, createdAt: new Date() }).catch(error => console.error("Admin audit write failed:", error.message));
      return { response: jsonResponse(200, { ok: true, email: adminEmail }, { "Set-Cookie": sessionCookie(createSession(adminEmail, env)) }) };
    });
    return result.response;
  } catch (error) {
    console.error("Admin login error:", error.message);
    return badRequestResponse(error, 503, "Sign-in is temporarily unavailable.");
  }
}
