const crypto = require("node:crypto");
const { sendJson, readJson, isAllowedOrigin } = require("../../lib/http");
const { createSession, setSessionCookie } = require("../../lib/auth");
const { getDb } = require("../../lib/mongodb");

function verifyPassword(password, encoded) {
  const [salt, expectedHex] = String(encoded || "").split(":");
  if (!salt || !expectedHex || !/^[a-f0-9]{128}$/i.test(expectedHex)) return false;
  const actual = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}
function clientKey(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const ip = forwarded || req.socket?.remoteAddress || "unknown";
  return crypto.createHash("sha256").update(ip).digest("hex");
}
async function recordAttempt(db, key) {
  const now = new Date();
  const result = await db.collection("admin_login_attempts").findOneAndUpdate(
    { _id: key },
    [{ $set: {
      count: { $cond: [{ $gt: ["$expiresAt", now] }, { $add: [{ $ifNull: ["$count", 0] }, 1] }, 1] },
      expiresAt: { $cond: [{ $gt: ["$expiresAt", now] }, "$expiresAt", new Date(now.getTime() + 15 * 60 * 1000)] },
      updatedAt: now
    } }],
    { upsert: true, returnDocument: "after" }
  );
  return result?.value || result;
}
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!isAllowedOrigin(req)) return sendJson(res, 403, { error: "Request origin is not allowed." });
  try {
    const body = await readJson(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const adminEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (!adminEmail || !process.env.ADMIN_PASSWORD_HASH || !process.env.SESSION_SECRET) return sendJson(res, 503, { error: "Admin authentication is not configured." });
    if (password.length > 1024) return sendJson(res, 400, { error: "Invalid sign-in details." });
    const db = await getDb();
    const key = clientKey(req);
    const attempt = await recordAttempt(db, key);
    if (Number(attempt?.count || 0) > 5) return sendJson(res, 429, { error: "Too many sign-in attempts. Please wait 15 minutes before trying again." });
    if (email !== adminEmail || !verifyPassword(password, process.env.ADMIN_PASSWORD_HASH)) {
      await db.collection("admin_audit_logs").insertOne({ action: "login_failed", email: email.slice(0, 254), createdAt: new Date() }).catch(() => {});
      return sendJson(res, 401, { error: "Email or password is incorrect." });
    }
    await db.collection("admin_login_attempts").deleteOne({ _id: key });
    setSessionCookie(res, createSession(adminEmail));
    await db.collection("admin_audit_logs").insertOne({ action: "login_success", email: adminEmail, createdAt: new Date() }).catch(error => console.error("Admin audit write failed:", error.message));
    return sendJson(res, 200, { ok: true, email: adminEmail });
  } catch (error) {
    console.error("Admin login error:", error.message);
    const badRequest = ["Invalid JSON body.", "Request body too large."].includes(error.message);
    return sendJson(res, badRequest ? 400 : 503, { error: badRequest ? error.message : "Sign-in is temporarily unavailable." });
  }
};
