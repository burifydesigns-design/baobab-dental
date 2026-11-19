const crypto = require("node:crypto");

const COOKIE = "baobab_admin_session";
function parseCookies(header = "") {
  return Object.fromEntries(header.split(";").map(part => {
    const index = part.indexOf("=");
    return index < 0 ? ["", ""] : [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }).filter(([key]) => key));
}
function sign(value) {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) throw new Error("SESSION_SECRET must contain at least 32 characters.");
  return crypto.createHmac("sha256", process.env.SESSION_SECRET).update(value).digest("base64url");
}
function createSession(email) {
  const payload = Buffer.from(JSON.stringify({ sub: email, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  return payload + "." + sign(payload);
}
function verifySession(req) {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) return null;
  const token = parseCookies(req.headers.cookie)[COOKIE];
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.sub || !Number.isFinite(data.exp) || data.exp < Date.now()) return null;
    return { email: data.sub };
  } catch { return null; }
}
function setSessionCookie(res, token) {
  res.setHeader("Set-Cookie", `${COOKIE}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`);
}
function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
}
function requireAdmin(req, res) {
  const session = verifySession(req);
  if (!session) {
    res.status(401).json({ error: "Admin sign-in required." });
    return null;
  }
  return session;
}
module.exports = { createSession, verifySession, setSessionCookie, clearSessionCookie, requireAdmin };
