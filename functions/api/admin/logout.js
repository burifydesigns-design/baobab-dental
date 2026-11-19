import { jsonResponse, isAllowedOrigin, methodNotAllowed } from "../../../lib/http.js";
import { clearedSessionCookie } from "../../../lib/auth.js";
export function onRequest({ request, env }) {
  if (request.method !== "POST") return methodNotAllowed("POST");
  if (!isAllowedOrigin(request, env)) return jsonResponse(403, { error: "Request origin is not allowed." });
  return jsonResponse(200, { ok: true }, { "Set-Cookie": clearedSessionCookie() });
}
