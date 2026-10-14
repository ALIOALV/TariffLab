const SOURCE='https://www.usitc.gov/harmonized_tariff_information/hts/archive/list';
export default async () => {
 try { const r=await fetch(SOURCE,{headers:{'User-Agent':'TariffLab-Research/0.3'}}); if(!r.ok)throw Error('USITC HTTP '+r.status);
 const html=await r.text(); const found=[...html.matchAll(/20\d\d HTS Revision\s+(\d+)\s*\(([^)]+)\)/gi)].map(m=>({revision:Number(m[1]),date:m[2]}));
 const latest=found[0]||null;
 return Response.json({source:SOURCE,checkedAt:new Date().toISOString(),latest,detectedRevisions:found.slice(0,5),status:latest?'source_checked':'unparsed',ruleStatus:'NO_AUTOMATIC_CHAPTER_99_APPROVAL',note:'Detection only. No HTS or Chapter 99 rates have been imported or approved.'},{headers:{'cache-control':'no-store'}});
 }catch(e){return Response.json({status:'source_unavailable',error:String(e.message),checkedAt:new Date().toISOString(),ruleStatus:'NO_AUTOMATIC_CHAPTER_99_APPROVAL'},{status:503,headers:{'cache-control':'no-store'}})}
};
