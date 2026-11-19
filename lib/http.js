export function jsonResponse(status, payload, headers = {}) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Content-Type", "application/json; charset=utf-8");
  responseHeaders.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(payload), { status, headers: responseHeaders });
}
export async function readJson(request) {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 16384) throw new Error("Request body too large.");
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > 16384) throw new Error("Request body too large.");
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    return parsed;
  } catch { throw new Error("Invalid JSON body."); }
}
export function isAllowedOrigin(request, env) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const expected = env.APP_ORIGIN ? new URL(env.APP_ORIGIN).origin : new URL(request.url).origin;
    return new URL(origin).origin === expected;
  } catch { return false; }
}
export function methodNotAllowed(allow) {
  return jsonResponse(405, { error: "Method not allowed." }, { Allow: allow });
}
export function badRequestResponse(error, fallbackStatus = 503, fallbackMessage = "The request is temporarily unavailable.") {
  const badRequest = ["Invalid JSON body.", "Request body too large."].includes(error?.message);
  return jsonResponse(badRequest ? 400 : fallbackStatus, { error: badRequest ? error.message : fallbackMessage });
}
