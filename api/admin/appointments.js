const { getDb } = require("../../lib/mongodb");
const { sendJson, readJson, isAllowedOrigin } = require("../../lib/http");
const { requireAdmin } = require("../../lib/auth");

module.exports = async function handler(req, res) {
  if (!["GET", "PATCH"].includes(req.method)) {
    res.setHeader("Allow", "GET, PATCH");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (req.method === "PATCH" && !isAllowedOrigin(req)) return sendJson(res, 403, { error: "Request origin is not allowed." });
  const session = requireAdmin(req, res);
  if (!session) return;
  try {
    const db = await getDb();
    const collection = db.collection("appointment_requests");
    if (req.method === "GET") {
      const rows = await collection.find({}, { projection: { name: 1, email: 1, phone: 1, branch: 1, service: 1, preferredDate: 1, preferredTime: 1, status: 1, createdAt: 1 } }).sort({ createdAt: -1 }).limit(100).toArray();
      return sendJson(res, 200, { appointments: rows.map(row => ({ ...row, _id: row._id.toString() })) });
    }
    const body = await readJson(req);
    const id = String(body.id || "");
    const status = String(body.status || "");
    const allowed = new Set(["new", "contacted", "confirmed", "declined", "completed"]);
    if (!/^[a-f0-9]{24}$/i.test(id) || !allowed.has(status)) return sendJson(res, 400, { error: "Invalid appointment ID or status." });
    const { ObjectId } = require("mongodb");
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date(), updatedBy: session.email } });
    if (!result.matchedCount) return sendJson(res, 404, { error: "Appointment request not found." });
    await db.collection("admin_audit_logs").insertOne({ action: "appointment_status_updated", appointmentId: id, status, actor: session.email, createdAt: new Date() });
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Admin appointments error:", error.message);
    const badRequest = ["Invalid JSON body.", "Request body too large."].includes(error.message);
    return sendJson(res, badRequest ? 400 : 503, { error: badRequest ? error.message : "Appointment records are temporarily unavailable." });
  }
};
