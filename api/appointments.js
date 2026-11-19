const { getDb } = require("../lib/mongodb");
const { sendJson, readJson, isAllowedOrigin } = require("../lib/http");

const allowedBranches = new Set(["Perth City", "Subiaco", "South Perth"]);
const allowedServices = new Set(["General dentistry", "Cleaning & hygiene", "Tooth-coloured fillings", "Root canal care", "Tooth extractions", "Braces & clear aligners", "Teeth whitening", "Dental implants", "Veneers", "Children's dentistry", "Emergency dental care"]);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!isAllowedOrigin(req)) return sendJson(res, 403, { error: "Request origin is not allowed." });
  try {
    const body = await readJson(req);
    if (body.website) return sendJson(res, 200, { ok: true });
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const preferredDate = String(body.preferredDate || "");
    const preferredTime = String(body.preferredTime || "Any time");
    const branch = String(body.branch || "");
    const service = String(body.service || "");
    if (name.length < 2 || name.length > 100) return sendJson(res, 400, { error: "Enter a name between 2 and 100 characters." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return sendJson(res, 400, { error: "Enter a valid email address." });
    if (phone.length > 30) return sendJson(res, 400, { error: "Phone number is too long." });
    if (!allowedBranches.has(branch) || !allowedServices.has(service)) return sendJson(res, 400, { error: "Choose a valid clinic and service." });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || Number.isNaN(Date.parse(preferredDate)) || preferredDate < new Date().toISOString().slice(0, 10)) return sendJson(res, 400, { error: "Choose a valid future date." });
    if (!["Any time", "Morning", "Afternoon"].includes(preferredTime)) return sendJson(res, 400, { error: "Choose a valid preferred time." });
    if (body.consent !== true) return sendJson(res, 400, { error: "Consent is required before the clinic can contact you." });
    const db = await getDb();
    const result = await db.collection("appointment_requests").insertOne({
      name, email, phone, branch, service, preferredDate, preferredTime,
      status: "new", consent: true, consentRecordedAt: new Date(),
      source: "public-website", createdAt: new Date(), updatedAt: new Date()
    });
    return sendJson(res, 201, { ok: true, requestId: result.insertedId.toString(), message: "Your request was received. The clinic must confirm availability." });
  } catch (error) {
    console.error("Appointment request error:", error.message);
    const badRequest = ["Invalid JSON body.", "Request body too large."].includes(error.message);
    return sendJson(res, badRequest ? 400 : 503, { error: badRequest ? error.message : "Appointment requests are temporarily unavailable. Please contact the clinic directly." });
  }
};
