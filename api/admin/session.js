const { sendJson } = require("../../lib/http");
const { verifySession } = require("../../lib/auth");
module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  const session = verifySession(req);
  return session ? sendJson(res, 200, { authenticated: true, email: session.email }) : sendJson(res, 401, { authenticated: false });
};
