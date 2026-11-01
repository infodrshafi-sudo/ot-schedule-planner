const FIELDS=['date','time','surgery','department','patient','age','sex','mr','surgeon','ana'];
const MAX={date:10,time:5,surgery:130,department:80,patient:100,age:3,sex:10,mr:60,surgeon:100,ana:100};
const invalid=(message,status=400)=>Response.json({error:message},{status});
const validated = input => {
  const p={}; for(const key of FIELDS){if(typeof input?.[key]!=='string') return null;p[key]=input[key].trim().replace(/\s+/g,' ');if(p[key].length>MAX[key]) return null;}
  if(!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||!Number.isFinite(Date.parse(p.date+'T00:00:00Z')))return null;
  if(p.time&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(p.time))return null;
  if(['surgery','department','surgeon','ana'].some(k=>!p[k])) return null;
  if(p.age&&(!/^\d{1,3}$/.test(p.age)||Number(p.age)>120))return null;
  if(p.sex&&!['Male','Female','Other'].includes(p.sex))return null;
  return p;
};
export async function onRequestGet({env}){
  if(!env.DB)return invalid('Cloud database not connected. Add the D1 binding named DB.',503);
  try { const result=await env.DB.prepare("SELECT * FROM surgeries ORDER BY date, CASE WHEN time = '' THEN 1 ELSE 0 END, time, createdAt").all(); return Response.json({cases:result.results||[]},{headers:{'Cache-Control':'no-store'}});}
  catch(e){return invalid('Database error. Apply schema.sql in the D1 SQL console.',503)}
}
export async function onRequestPost({request,env}){
  if(!env.DB)return invalid('Cloud database not connected.',503);
  let body;try{body=await request.json()}catch{return invalid('Invalid JSON')}
  const p=validated(body);if(!p)return invalid('Invalid or missing surgery details.');
  const id=crypto.randomUUID(),now=new Date().toISOString();
  try{await env.DB.prepare('INSERT INTO surgeries (id,date,time,surgery,department,patient,age,sex,mr,surgeon,ana,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,p.date,p.time,p.surgery,p.department,p.patient,p.age,p.sex,p.mr,p.surgeon,p.ana,now,now).run();return Response.json({case:{...p,id,createdAt:now,updatedAt:now}},{status:201});}
  catch(e){return invalid('Could not save to cloud database.',500)}
}
export {validated,invalid};
