/* TariffLab v2.5 research-only engine. Pure and testable in Node/browser. */
(function(root,factory){const engine=factory();if(typeof module==='object'&&module.exports)module.exports=engine;root.TariffLabV25=engine;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const digits=v=>String(v??'').replace(/\D/g,'');
 function normalizeHTS(value){const h=digits(value);if(h.length!==8&&h.length!==10)throw Error('HTS must contain exactly 8 or 10 digits');return h;}
 function validDate(s){return /^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s))&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;}
 function evaluate(input,pack){
  const h=normalizeHTS(input.hts),coo=String(input.coo||'').trim().toUpperCase(),date=String(input.date||'');
  if(!validDate(date))throw Error('Enter a valid ISO entry date');if(!/^[A-Z]{2}$/.test(coo))throw Error('Enter a two-letter country code');
  const value=Number(input.value);if(!Number.isFinite(value)||value<0)throw Error('Customs value must be a nonnegative number');
  if(!pack||!Array.isArray(pack.records)||!pack.byExactHts)throw Error('Invalid research index');
  const keys=h.length===10?[h,h.slice(0,8)]:[h];
  const indices=[...new Set(keys.flatMap(k=>pack.byExactHts[k]||[]))];
  const candidates=indices.map(i=>pack.records[i]).filter(Boolean);
  const matched=candidates.filter(r=>r.coo===coo&&r.effectiveFrom<=date&&(!r.effectiveThrough||date<=r.effectiveThrough));
  const unmatched=candidates.filter(r=>!matched.includes(r)).map(r=>({id:r.id,chapter99:r.chapter99,reason:r.coo!==coo?'COO_MISMATCH':date<r.effectiveFrom?'BEFORE_EFFECTIVE_DATE':'AFTER_EFFECTIVE_DATE'}));
  const groups={};for(const r of matched)(groups[r.authority||'unknown']??=[]).push(r);
  const ambiguous=Object.values(groups).some(a=>a.length>1);
  const scenarios=matched.map(r=>({id:r.id,hts:r.hts,precision:r.precision,chapter99:r.chapter99,rate:r.rate,illustrativeAmount:Math.round(value*r.rate)/100,sourceUrl:r.sourceUrl,sourceSection:r.sourceSection,reviewStatus:r.reviewStatus}));
  return {version:'2.5',input:{hts:h,coo,date,value},coverage:'PARTIAL_NOT_EXHAUSTIVE',status:ambiguous?'MULTIPLE_CANDIDATES_REVIEW':matched.length?'SOURCE_CANDIDATES_UNVERIFIED':'NO_MATCH_IN_PARTIAL_DATASET',candidates:scenarios,unmatched,ambiguous,payableAdditionalDuty:null,totalAdditionalDuty:null,requires:['Verify full HTS coverage and current effective measures','Check amendments, exclusions, Section 232 and stacking rules','Confirm valuation basis and product facts'],disclaimer:'Illustrative historical research only; a no-match result does not mean zero duty.'};
 }
 return {normalizeHTS,validDate,evaluate};
});
