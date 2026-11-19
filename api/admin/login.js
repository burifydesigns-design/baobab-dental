const crypto = require("node:crypto");
const { sendJson, readJson } = require("../../lib/http");
const { createSession, setSessionCookie } = require("../../lib/auth");
const { getDb } = require("../../lib/mongodb");

function verifyPassword(password, encoded) {
  const [salt, expectedHex] = String(encoded || "").split(":");
  if (!salt || !expectedHex || !/^[a-f0-9]{128}$/i.test(expectedHex)) return false;
  const actual = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  try {
    const body = await readJson(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const adminEmail = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (!adminEmail || !process.env.ADMIN_PASSWORD_HASH || !process.env.SESSION_SECRET) return sendJson(res, 503, { error: "Admin authentication is not configured." });
    if (email !== adminEmail || !verifyPassword(password, process.env.ADMIN_PASSWORD_HASH)) {
      await getDb().then(db => db.collection("admin_audit_logs").insertOne({ action: "login_failed", email: email.slice(0, 254), createdAt: new Date() })).catch(() => {});
      return sendJson(res, 401, { error: "Email or password is incorrect." });
    }
    setSessionCookie(res, createSession(adminEmail));
    await getDb().then(db => db.collection("admin_audit_logs").insertOne({ action: "login_success", email: adminEmail, createdAt: new Date() }));
    return sendJson(res, 200, { ok: true, email: adminEmail });
  } catch (error) {
    console.error("Admin login error:", error.message);
    return sendJson(res, 503, { error: "Sign-in is temporarily unavailable." });
  }
};
