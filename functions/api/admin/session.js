import { jsonResponse, methodNotAllowed } from "../../../lib/http.js";
import { verifySession } from "../../../lib/auth.js";
export function onRequest({ request, env }) {
  if (request.method !== "GET") return methodNotAllowed("GET");
  const session = verifySession(request, env);
  return session ? jsonResponse(200, { authenticated: true, email: session.email }) : jsonResponse(401, { authenticated: false });
}
