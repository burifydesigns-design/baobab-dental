const { sendJson, isAllowedOrigin } = require("../../lib/http");
const { clearSessionCookie } = require("../../lib/auth");
module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!isAllowedOrigin(req)) return sendJson(res, 403, { error: "Request origin is not allowed." });
  clearSessionCookie(res);
  return sendJson(res, 200, { ok: true });
};
