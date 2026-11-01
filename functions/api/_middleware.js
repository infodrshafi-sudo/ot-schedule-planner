// Open editing: allow API requests through to the D1-backed handlers.
// IMPORTANT: Public access is suitable for testing only.
export async function onRequest(context) {
  return context.next();
}
