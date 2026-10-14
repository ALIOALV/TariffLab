// Scheduled discovery only. Does NOT publish rates or change approved rules.
export default async () => { const source='https://www.usitc.gov/harmonized_tariff_information/hts/archive/list'; try { const r=await fetch(source); console.log(JSON.stringify({checkedAt:new Date().toISOString(),source,httpStatus:r.status,action:'DISCOVERY_ONLY_NO_RULE_ACTIVATION'})); } catch(e) {console.error('HTS discovery failed:',e.message)} };
export const config={schedule:'0 12 * * *'};
