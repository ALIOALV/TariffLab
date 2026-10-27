(()=>{'use strict';
const shell=document.querySelector('.shell'),nav=shell?.querySelector(':scope > nav');if(!nav)return;
const buttons=[...nav.querySelectorAll(':scope > button[data-tab]')];
const advanced=document.createElement('details');advanced.id='tl28-advanced';advanced.innerHTML='<summary>More tools ▾</summary><div class="tl28-menu"></div>';
const menu=advanced.querySelector('.tl28-menu');
function placeMenu(){const r=advanced.getBoundingClientRect();menu.style.left=Math.max(12,Math.min(window.innerWidth-270,r.right-255))+'px';menu.style.top=Math.min(window.innerHeight-20,r.bottom+8)+'px';}
advanced.addEventListener('toggle',()=>{if(advanced.open)placeMenu()});window.addEventListener('resize',()=>{if(advanced.open)placeMenu()});window.addEventListener('scroll',()=>{if(advanced.open)placeMenu()},{passive:true});
const primary=['simulator','research','calc','sources'];
const names={simulator:'Duty stacking',research:'HTS research',calc:'Costs & fees',sources:'Sources',compliance:'Origin & PGA',pgaMatrix:'PGA matrix',batch:'Batch analysis',datasets:'HTS datasets'};
for(const b of buttons){const id=b.dataset.tab;b.textContent=names[id]||b.textContent;if(!primary.includes(id))menu.append(b)}
for(const id of primary){const b=buttons.find(b=>b.dataset.tab===id);if(b)nav.append(b)}
nav.append(advanced);
const home=document.createElement('button');home.id='tl28-home';home.type='button';home.textContent='⌂ Quick Search';nav.insertBefore(home,nav.firstChild);
home.addEventListener('click',()=>document.querySelector('#tl27-back')?.click());
const context=document.createElement('div');context.id='tl28-context';context.setAttribute('aria-live','polite');nav.after(context);
const copy={simulator:['DUTY STACKING','Duty stacking, without the noise.','Enter shipment details and review research candidates, potential duty layers, unresolved conditions, and evidence in one workspace.'],research:['HTS RESEARCH','Find the classification context.','Search tariff descriptions and supporting references before moving to a calculation.'],calc:['COSTS & FEES','Understand the landed-cost inputs.','Review supported base-duty calculations, customs fees, and manual Chapter 99 scenarios with explicit limitations.'],sources:['SOURCES & LIMITATIONS','Evidence behind the numbers.','Official source links, coverage notes, and research limitations in one place.'],compliance:['ORIGIN & PGA','Review origin and agency questions.','Research product facts, origin and potential government-agency requirements.'],pgaMatrix:['PGA MATRIX','Screen regulatory signals.','Explore research signals; verify actual agency requirements independently.'],batch:['BATCH ANALYSIS','Analyze multiple lines.','Upload and export line-level estimates using the existing calculation engine.'],datasets:['HTS DATA','Manage tariff revisions.','Import official schedules and inspect local revision coverage.']};
function update(id){const [k,title,desc]=copy[id]||copy.simulator;context.innerHTML='<div class="tl28-eyebrow">TARIFFLAB / '+k+'</div><h1>'+title+'</h1><p>'+desc+'</p>';advanced.open=false;}
buttons.forEach(b=>b.addEventListener('click',()=>{update(b.dataset.tab);if(b.parentElement===menu)advanced.open=false;window.scrollTo({top:0,behavior:'instant'});}));
update(document.querySelector('.shell nav button.active')?.dataset.tab||'research');
const canAnimate=()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&typeof Element.prototype.animate==='function';
window.tl281AnimateOut=(el,direction,done)=>{if(!el||!canAnimate()){done();return;}const x=direction==='left'?'-14vw':'14vw';const a=el.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:'translateX('+x+')'}],{duration:260,easing:'cubic-bezier(.4,0,1,1)'});a.onfinish=done;a.oncancel=done;};
window.tl281AnimateIn=(el,direction)=>{if(!el||!canAnimate())return;const x=direction==='left'?'-14vw':'14vw';el.animate([{opacity:0,transform:'translateX('+x+')'},{opacity:1,transform:'translateX(0)'}],{duration:420,easing:'cubic-bezier(.16,1,.3,1)'});};
})();