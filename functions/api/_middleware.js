// Every API request requires the shared access code configured as a Cloudflare secret.
export async function onRequest(context) {
  const configured = context.env.OT_ACCESS_CODE;
  if (!configured || configured.length < 12) return Response.json({error:'Set OT_ACCESS_CODE (minimum 12 characters) in Cloudflare Pages settings.'},{status:503});
  const supplied = context.request.headers.get('X-OT-Access-Code') || '';
  const encoder = new TextEncoder();
  const digest = async s => new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(s)));
  // Hash before comparison so length of the secret is not exposed by comparison.
  const [a,b] = await Promise.all([digest(configured),digest(supplied)]);
  let difference=0;
  for(let i=0;i<a.length;i++) difference |= a[i]^b[i];
  if(difference!==0) return Response.json({error:'Incorrect access code.'},{status:401});
  return context.next();
}
