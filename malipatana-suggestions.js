/* Village Suggestions admin workspace. Uses existing logged-in authenticated api().
   Never exposes private suggestion records through public endpoints. */
(function(){
'use strict';
const PAGE='villageSuggestions';
const baseNav=buildNav,baseRender=render;
const escS=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const statuses=['Received','Under Review','Accepted','Not Feasible','Action Planned','In Progress','Implemented','Closed'];
let suggestions=[],actionHistory=[],filter='All',searchTerm='';
function setupNav(){baseNav();const side=document.getElementById('sidebar');if(!side||!isAdmin()||side.querySelector('[data-page="'+PAGE+'"]'))return;
const nav=document.createElement('button');nav.type='button';nav.className='nav';nav.dataset.page=PAGE;
nav.innerHTML='<span class="ic">💡</span> Village suggestions';nav.onclick=()=>go(PAGE);
const grv=side.querySelector('[data-page="grievances"]');if(grv)grv.after(nav);else side.appendChild(nav);}
buildNav=setupNav;
render=function(){if(PAGE!==window.PAGE)return baseRender();};
const previousRender=baseRender;
render=function(){if(window.PAGE!==PAGE)return previousRender();setupNav();buildTabs();document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.page===PAGE));draw();};
function draw(){
const host=document.getElementById('main');if(!host)return;
host.innerHTML='<div class="pagehead"><div><h2>💡 Village Suggestions & Action Taken</h2><div class="sub">Admin-only review, assignment, action history and publication</div></div></div>'+
'<div class="panel" style="padding:18px;margin:14px 0"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button type="button" class="btn btn-primary" id="msRefresh">↻ Refresh suggestions</button><a class="btn" href="suggestions.html" target="_blank" rel="noopener">Open public suggestion form</a><span id="msLoad" role="status" class="muted small">Loading…</span></div>'+
'<div style="display:flex;gap:10px;flex-wrap:wrap;margin:16px 0"><label>Filter status <select id="msFilter" class="input">'+['All',...statuses].map(s=>'<option>'+s+'</option>').join('')+'</select></label><label>Search <input class="input" type="search" id="msSearch" placeholder="Suggestion ID, category, name or text"></label></div><div id="msRows"></div></div>';
document.getElementById('msRefresh').onclick=reload;
document.getElementById('msFilter').onchange=e=>{filter=e.target.value;paint()};
document.getElementById('msSearch').oninput=e=>{searchTerm=e.target.value.toLowerCase();paint()};
void reload();}
async function reload(){const state=document.getElementById('msLoad');if(!state)return;state.textContent='Loading authorized suggestions…';
try{const r=await api('suggestionAdmin');if(!r||!r.ok)throw Error(r?.error||'Backend needs Village Suggestions upgrade');suggestions=r.items||[];actionHistory=r.actions||[];state.textContent=suggestions.length+' suggestions · '+suggestions.filter(x=>x.Status==='Received'||x.Status==='Under Review').length+' awaiting review';paint();}
catch(err){state.textContent='Unable to load suggestions: '+err.message;document.getElementById('msRows').textContent='Deploy the updated Village BE and run setupVillageSuggestions once.'}}
function paint(){const host=document.getElementById('msRows');if(!host)return;
const rows=suggestions.filter(r=>(filter==='All'||r.Status===filter)&&(!searchTerm||[r['Suggestion ID'],r.Category,r.Name,r.Suggestion,r['Action Taken']].some(v=>String(v||'').toLowerCase().includes(searchTerm))));
host.innerHTML=rows.length?rows.map(r=>'<div style="padding:15px 0;border-top:1px solid #e0e9e4;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><div><b>'+escS(r['Suggestion ID'])+'</b> · '+escS(r.Category)+' <span class="muted small">('+escS(r.Status)+')</span><div>'+escS(String(r.Suggestion||'').slice(0,165))+'</div><div class="muted small">'+escS(r.Name||'Anonymous')+' · '+escS(r['Submitted At']||'')+(r.Published==='Yes'?' · Published':'')+'</div></div><button type="button" class="btn" data-msid="'+escS(r['Suggestion ID'])+'">Review & Action</button></div>').join(''):'<div class="empty">No matching suggestions.</div>';
host.querySelectorAll('[data-msid]').forEach(b=>b.onclick=()=>review(b.dataset.msid));}
function review(id){const item=suggestions.find(r=>String(r['Suggestion ID'])===id);if(!item)return;
const events=actionHistory.filter(x=>String(x['Suggestion ID'])===id);
const input=(label,key,val,tag='input')=>'<label>'+label+(tag==='textarea'?'<textarea id="ms_'+key+'" class="input" rows="3">'+escS(val||'')+'</textarea>':'<input id="ms_'+key+'" class="input" value="'+escS(val||'')+'">')+'</label>';
const statusHtml=statuses.map(s=>'<option value="'+s+'" '+(item.Status===s?'selected':'')+'>'+s+'</option>').join('');
openModal('<header><h3>Suggestion '+escS(id)+'</h3><div class="sp"></div><button type="button" class="btn" id="msClose">Close</button></header><div class="body"><div class="panel" style="padding:15px"><strong>'+escS(item.Category)+'</strong><p>'+escS(item.Suggestion)+'</p><p class="small muted">Benefit: '+escS(item.Benefit||'Not supplied')+'</p><p class="small">Name: '+escS(item.Name||'Anonymous')+' · Contact: '+escS(item.Mobile||'Not supplied')+' · Sahi: '+escS(item.Sahi||'Not supplied')+'</p></div>'+
'<div class="reg-fields"><label>Status<select class="input" id="ms_status">'+statusHtml+'</select></label>'+
input('Assigned to','assignedTo',item['Assigned To'])+
'<label>Target date<input class="input" type="date" id="ms_targetDate" value="'+escS(item['Target Date']||'')+'"></label>'+
input('Action taken (new history entry)','action','', 'textarea')+
input('Committee decision / remark','remark',item['Committee Remark'],'textarea')+
'<label>Publish this suggestion?<select class="input" id="ms_published"><option value="No">Not public</option><option value="Yes" '+(item.Published==='Yes'?'selected':'')+'>Publish approved summary</option></select></label>'+
input('Public title (never include private names)','publicTitle',item['Public Title'])+
input('Public summary (approved text only)','publicSummary',item['Public Summary'],'textarea')+
input('Public action taken (approved text only)','publicAction',item['Public Action'],'textarea')+
'</div><p class="small muted">Public display excludes contact details and submitted name. Publication requires a title and summary.</p><h4>Action history</h4>'+
(events.length?events.map(e=>'<div style="border-top:1px solid #dfeae4;padding:9px 0"><b>'+escS(e.Status)+'</b> · '+escS(e.Date)+' · '+escS(e['Updated By']||'')+'<p>'+escS(e['Action Taken']||'Status updated')+'</p></div>').join(''):'<p class="muted">No actions recorded yet.</p>')+
'<p id="msMsg" role="alert"></p></div><footer><button class="btn btn-primary" id="msSave">Save decision & action history</button></footer>');
document.getElementById('msClose').onclick=closeModal;
document.getElementById('msSave').onclick=async function(){const btn=this,msg=document.getElementById('msMsg');btn.disabled=true;msg.textContent='Saving…';
try{const p={id,status:document.getElementById('ms_status').value,assignedTo:document.getElementById('ms_assignedTo').value,targetDate:document.getElementById('ms_targetDate').value,
action:document.getElementById('ms_action').value,remark:document.getElementById('ms_remark').value,
published:document.getElementById('ms_published').value,publicTitle:document.getElementById('ms_publicTitle').value,
publicSummary:document.getElementById('ms_publicSummary').value,publicAction:document.getElementById('ms_publicAction').value};
if(p.published==='Yes'&&(!p.publicTitle.trim()||!p.publicSummary.trim()))throw Error('Public title and summary are required.');
if(!window.confirm('Save the review and append an action-history entry for '+id+'?'))return;
const r=await api('suggestionUpdate',p);if(!r?.ok)throw Error(r?.error||'Update rejected');
msg.textContent='Saved';closeModal();await reload();}
catch(err){msg.textContent='Save not confirmed: '+err.message+' Check the register before retrying.'}finally{btn.disabled=false}};
}
})();
