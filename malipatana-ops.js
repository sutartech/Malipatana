/* Malipatana FE V3.5.45 — Admin diagnostics, no new API and no extra sheet.
   This file is intentionally separate to simplify later maintenance. */
(function(){
 'use strict';
 const PAGE_KEY='operationsCentre';
 let renderRun=0;
 const baseNav=buildNav, baseRender=render;
 function escOps(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function statusMarkup(title,detail,type){
   return `<article class="mal-op-item mal-op-${type||'neutral'}"><span class="mal-op-led" aria-hidden="true"></span><div><b>${escOps(title)}</b><p>${escOps(detail)}</p></div></article>`;
 }
 function safeCopy(text){
   if(navigator.clipboard && window.isSecureContext)return navigator.clipboard.writeText(text);
   const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.left='-9999px';document.body.appendChild(t);t.select();
   try{document.execCommand('copy');return Promise.resolve();}finally{t.remove();}
 }
 function queueCount(){try {return Array.isArray(queueRead())?queueRead().length:0;}catch(_){return 0;}}
 function currentStatus(){return navigator.onLine===false?'Offline':'Browser reports online';}
 function isVisible(){return isAdmin() && PAGE===PAGE_KEY;}
 function show(){
   const main=document.getElementById('main');if(!main)return;
   if(!isAdmin()){main.innerHTML='<div class="empty">Administrator access required.</div>';return;}
   buildNav();buildTabs();
   document.querySelectorAll('.nav').forEach(btn=>btn.classList.toggle('active',btn.dataset.page===PAGE_KEY));
   main.innerHTML=`<header class="pagehead"><div><div class="mal-op-crumb">Global Administrator / Security &amp; Access</div>
        <h2>Operations &amp; Diagnostics</h2><p class="sub">Check your existing GitHub + Apps Script dashboard without technical tools</p></div></header>
     <section class="mal-op-hero"><div><span class="mal-op-label">SYSTEM STATUS</span><h3>Malipatana health check</h3>
       <p>Read-only checks. No member data, photos or financial entries are changed.</p></div>
       <button class="btn btn-primary" type="button" id="malOpCheck">↻ Run checks</button></section>
     <div class="mal-op-kpis" id="malOpKpis" aria-live="polite"></div>
     <div class="mal-op-list" id="malOpResults" role="status" aria-live="polite"><div class="mal-op-wait">Select <b>Run checks</b> to verify the current connection.</div></div>
     <div class="mal-op-actions"><button type="button" class="btn" id="malOpRefresh">↻ Reload registers</button>
       <button type="button" class="btn" id="malOpCopy">▤ Copy safe diagnostic report</button>
       <button type="button" class="btn" id="malOpLinks">◈ Manage shareable links</button>
       <button type="button" class="btn" id="malOpHistory">◷ Access history</button></div>
     <details class="mal-op-guide"><summary>What these checks mean</summary><p>A green status confirms that the named check completed, not that every registration or photo upload has been tested. Registration must be enabled in Apps Script before public submissions can succeed. A queued offline save is not confirmed in Google Sheets. Run a real save-and-reopen test after deployment.</p><p>API migration, payment processing and third-party analytics are not needed for this update.</p></details>
     <p class="mal-op-foot">Privacy: the diagnostic report does not include passwords, tokens, personal records, the full private spreadsheet ID, or shared-link secrets.</p>`;
   const check=document.getElementById('malOpCheck');check.onclick=runChecks;
   document.getElementById('malOpRefresh').onclick=async()=>{
      const btn=document.getElementById('malOpRefresh');btn.disabled=true;btn.textContent='Reloading…';
      try{await load(); if(isVisible()){toast('Registers reloaded from Apps Script','good');show();}}catch(e){toast(e.message,'bad');btn.disabled=false;btn.textContent='↻ Reload registers';}
   };
   document.getElementById('malOpLinks').onclick=()=>go('entryLinks');
   document.getElementById('malOpHistory').onclick=()=>go('accessHistory');
   document.getElementById('malOpCopy').onclick=async()=>{
     const m=window.malSafeOpsReport||'No diagnostic check performed yet.';
     try{await safeCopy(m);toast('Diagnostic report copied without private details','good');}catch(e){toast('Copy unavailable. Try again in Chrome.','bad');}
   };
   runChecks();
 }
 async function timed(action,params){
   const start=performance.now();
   try{const out=await api(action,params||{});return {response:out,ms:Math.round(performance.now()-start)};}
   catch(e){return {error:String(e.message||e),ms:Math.round(performance.now()-start)};}
 }
 async function runChecks(){
   if(!isVisible())return;
   const run=++renderRun;
   const btn=document.getElementById('malOpCheck');if(btn){btn.disabled=true;btn.textContent='Checking…';}
   const host=document.getElementById('malOpResults');if(host)host.innerHTML='<div class="mal-op-wait">Contacting Apps Script and checking shared-entry settings…</div>';
   const freshKey=()=>Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,'0')).join('');
   const [health,registration,links]=await Promise.all([
     timed('health'),timed('registrationStatus',{key:freshKey()}),timed('linkList')
   ]);
   if(!isVisible()||run!==renderRun)return;
   const server=health.response||{},register=registration.response||{},linkData=links.response||{};
   const available=!!server.ok;
   const version=String(server.version||'—');
   const expected=String(CONFIG.EXPECTED_BACKEND||'—');
   const matches=available && version===expected;
   const regEnabled=!!register.ok;
   const linkRows=(linkData.ok&&Array.isArray(linkData.links))?linkData.links:[];
   const open=linkRows.filter(x=>x.status==='Open').length;
   const paused=linkRows.filter(x=>x.status==='Paused').length;
   const pending=queueCount();
   const sync=window.malLastSuccessfulSync?new Date(window.malLastSuccessfulSync).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}):'Not recorded this session';
   const kpis=[['Backend',available?'Connected':'Not confirmed',available?'good':'bad'],
     ['Registration',regEnabled?'Enabled':'Not enabled / unknown',regEnabled?'good':'warn'],
     ['Shared links',linkData.ok?`${open} open · ${paused} paused`:'Not confirmed',linkData.ok?'good':'warn'],
     ['Offline queue',`${pending} waiting`,pending?'warn':'good']];
   document.getElementById('malOpKpis').innerHTML=kpis.map(([title,value,tone])=>`<div class="mal-op-kpi mal-op-${tone}"><span>${escOps(title)}</span><strong>${escOps(value)}</strong></div>`).join('');
   let messages='';
   messages+=statusMarkup('Frontend and backend versions',`${CONFIG.VERSION} · ${version} · Expected ${expected}`,matches?'good':'warn');
   messages+=statusMarkup('Apps Script health',available?`Responded in ${health.ms} ms`:`No confirmed response: ${health.error||server.error||'Service error'}`,available?'good':'bad');
   messages+=statusMarkup('Village registration',regEnabled?`Service confirmed readiness in ${registration.ms} ms`:`${register.error||registration.error||'Could not verify'} — check setupSimpleRegistration and script properties`,regEnabled?'good':'warn');
   messages+=statusMarkup('Shared-link management',linkData.ok?`${linkRows.length} configured links; ${open} currently open`:links.error||linkData.error||'Unable to read links',linkData.ok?'good':'warn');
   messages+=statusMarkup('Browser connectivity',currentStatus(),navigator.onLine===false?'warn':'good');
   messages+=statusMarkup('Pending offline writes',pending?`${pending} item(s) queued on this device; not confirmed saved in Sheets`:'No locally queued writes',pending?'warn':'good');
   messages+=statusMarkup('Last successful register refresh',sync,window.malLastSuccessfulSync?'good':'neutral');
   messages+=statusMarkup('Financial reconciliation', 'Before publishing fund balances, check whether Emergency Cases and Regular Support paid amounts are already included in Expenditure. They may otherwise be deducted twice.', 'warn');
   document.getElementById('malOpResults').innerHTML=messages;
   const report=[
     'MALIPATANA — SAFE DIAGNOSTICS',
     'Checked: '+new Date().toISOString(),
     'Frontend: '+CONFIG.VERSION,
     'Expected backend: '+expected,
     'Backend reported: '+version,
     'Backend responded: '+available,
     'Health response time ms: '+health.ms,
     'Registration readiness: '+(regEnabled?'Enabled': 'Unavailable / disabled'),
     'Link count: '+(linkData.ok?linkRows.length:'unavailable'),
     'Open links: '+(linkData.ok?open:'unavailable'),
     'Offline writes awaiting confirmation: '+pending,
     'Device connection: '+currentStatus(),
     'Last successful refresh: '+sync
   ].join('\n');
   window.malSafeOpsReport=report;
   if(btn){btn.disabled=false;btn.textContent='↻ Run checks';}
 }
 buildNav=function(){
   baseNav();
   if(!isAdmin())return;
   const sidebar=document.getElementById('sidebar');if(!sidebar||sidebar.querySelector('[data-page="'+PAGE_KEY+'"]'))return;
   const security=sidebar.querySelector('.mal-security-nav');
   const section=sidebar.querySelector('.ux-navsection[data-group="GLOBAL ADMINISTRATOR"]');
   const link=document.createElement('button');link.className='nav';link.dataset.page=PAGE_KEY;link.type='button';
   link.innerHTML='<span class="ic">✦</span> Operations &amp; diagnostics';link.onclick=()=>go(PAGE_KEY);
   if(security){security.appendChild(link);if(PAGE===PAGE_KEY){security.open=true;if(section)section.open=true;}}
   else if(section)section.appendChild(link);else sidebar.appendChild(link);
   link.classList.toggle('active',PAGE===PAGE_KEY);
 };
 render=function(){if(PAGE===PAGE_KEY){show();return;}return baseRender();};
})();
