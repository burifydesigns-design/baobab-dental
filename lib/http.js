function sendJson(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}
function readJson(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", chunk => {
      raw += chunk;
      if (raw.length > 16_384) reject(new Error("Request body too large."));
    });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch { reject(new Error("Invalid JSON body.")); }
    });
    req.on("error", reject);
  });
}
function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const expected = process.env.APP_ORIGIN
      ? new URL(process.env.APP_ORIGIN).origin
      : (req.headers["x-forwarded-proto"] || "https") + "://" + (req.headers["x-forwarded-host"] || req.headers.host);
    return new URL(origin).origin === expected;
  } catch {
    return false;
  }
}
module.exports = { sendJson, readJson, isAllowedOrigin };
