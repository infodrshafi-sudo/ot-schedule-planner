import {validated,invalid} from '../cases.js';
export async function onRequestPut({params,request,env}){
  if(!env.DB)return invalid('Cloud database not connected.',503);
  let body;try{body=await request.json()}catch{return invalid('Invalid JSON')}
  const p=validated(body);if(!p||typeof body.updatedAt!=='string')return invalid('Invalid surgery or missing change version.');
  const updatedAt=new Date().toISOString();
  try{
    const result=await env.DB.prepare('UPDATE surgeries SET date=?,time=?,surgery=?,department=?,patient=?,mr=?,surgeon=?,ana=?,updatedAt=? WHERE id=? AND updatedAt=?').bind(p.date,p.time,p.surgery,p.department,p.patient,p.mr,p.surgeon,p.ana,updatedAt,params.id,body.updatedAt).run();
    if(!result.meta?.changes)return invalid('This case was changed or deleted on another device. Refresh and retry.',409);
    return Response.json({case:{...p,id:params.id,createdAt:body.createdAt||'',updatedAt}});
  }catch{return invalid('Could not update the case.',500)}
}
export async function onRequestDelete({params,request,env}){
  if(!env.DB)return invalid('Cloud database not connected.',503);
  let body;try{body=await request.json()}catch{return invalid('Invalid JSON')}
  if(typeof body.updatedAt!=='string')return invalid('Missing change version.');
  try{
    const result=await env.DB.prepare('DELETE FROM surgeries WHERE id=? AND updatedAt=?').bind(params.id,body.updatedAt).run();
    if(!result.meta?.changes)return invalid('This case was changed or deleted on another device. Refresh and retry.',409);
    return Response.json({deleted:true});
  }catch{return invalid('Could not delete case.',500)}
}
