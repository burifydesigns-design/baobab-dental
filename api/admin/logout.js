const { sendJson } = require("../../lib/http");
const { clearSessionCookie } = require("../../lib/auth");
module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  clearSessionCookie(res);
  return sendJson(res, 200, { ok: true });
};
