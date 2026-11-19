import { ObjectId } from "mongodb";
import { withDb } from "../../../lib/mongodb.js";
import { jsonResponse, readJson, isAllowedOrigin, methodNotAllowed, badRequestResponse } from "../../../lib/http.js";
import { verifySession, unauthorizedResponse } from "../../../lib/auth.js";
const allowedStatuses = new Set(["new", "contacted", "confirmed", "declined", "completed"]);
export async function onRequest({ request, env }) {
  if (!["GET", "PATCH"].includes(request.method)) return methodNotAllowed("GET, PATCH");
  if (request.method === "PATCH" && !isAllowedOrigin(request, env)) return jsonResponse(403, { error: "Request origin is not allowed." });
  const session = verifySession(request, env);
  if (!session) return unauthorizedResponse();
  try {
    if (request.method === "GET") {
      const rows = await withDb(env, db => db.collection("appointment_requests")
        .find({}, { projection: { name: 1, email: 1, phone: 1, branch: 1, service: 1, preferredDate: 1, preferredTime: 1, status: 1, createdAt: 1 } })
        .sort({ createdAt: -1 }).limit(100).toArray());
      return jsonResponse(200, { appointments: rows.map(row => ({ ...row, _id: row._id.toString() })) });
    }
    const body = await readJson(request), id = String(body.id || ""), status = String(body.status || "");
    if (!/^[a-f0-9]{24}$/i.test(id) || !allowedStatuses.has(status)) return jsonResponse(400, { error: "Invalid appointment ID or status." });
    const result = await withDb(env, async db => {
      const update = await db.collection("appointment_requests").updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date(), updatedBy: session.email } }
      );
      if (!update.matchedCount) return { notFound: true };
      await db.collection("admin_audit_logs").insertOne({ action: "appointment_status_updated", appointmentId: id, status, actor: session.email, createdAt: new Date() });
      return { ok: true };
    });
    return result.notFound ? jsonResponse(404, { error: "Appointment request not found." }) : jsonResponse(200, { ok: true });
  } catch (error) {
    console.error("Admin appointments error:", error.message);
    return badRequestResponse(error, 503, "Appointment records are temporarily unavailable.");
  }
}
