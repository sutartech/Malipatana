/* Malipatana UX20 — additive, reversible frontend enhancements.
 * No network calls, no changes to data, permissions, IDs, or backend.
 * Controls intentionally stay inside the authenticated #app.
 */
(function(){
'use strict';
if(window.__malUX20Installed)return;
window.__malUX20Installed=true;
const $=s=>document.querySelector(s);
const safeGet=(key,fallback)=>{try{return localStorage.getItem(key)||fallback}catch(e){return fallback}};
const safeSet=(key,value)=>{try{localStorage.setItem(key,value)}catch(e){}};
const getApp=()=>$('#app');
const active=()=>{const a=getApp();return !!a&&!a.classList.contains('hide')};
const cssKey='mal_ux20_';
const cfg={
 density:safeGet(cssKey+'density','comfortable'),
 font:safeGet(cssKey+'font','standard'),
 contrast:safeGet(cssKey+'contrast','normal'),
 hints:safeGet(cssKey+'hints','show'),
 sidebar:safeGet(cssKey+'sidebar','wide')
};
let panel,search,results,topBtn,navCache=[],scheduled=false;
function text(v){return String(v==null?'':v).replace(/\s+/g,' ').trim()}
function apply(){
 const a=getApp();if(!a)return;
 a.classList.toggle('mal-ux-compact',cfg.density==='compact');
 a.classList.toggle('mal-ux-large',cfg.font==='large');
 a.classList.toggle('mal-ux-contrast',cfg.contrast==='high');
 a.classList.toggle('mal-ux-hide-hints',cfg.hints==='hide');
 a.classList.toggle('mal-ux-sidebar-compact',cfg.sidebar==='compact');
 if(panel){
  panel.querySelectorAll('[data-ux-setting]').forEach(btn=>{
    const k=btn.dataset.uxSetting;
    btn.textContent=btn.dataset.label+': '+(k==='density'?(cfg[k]==='compact'?'Compact':'Comfortable'):k==='font'?(cfg[k]==='large'?'Large':'Standard'):k==='contrast'?(cfg[k]==='high'?'High':'Normal'):k==='sidebar'?(cfg[k]==='compact'?'Compact':'Wide'):cfg[k]==='hide'?'Hidden':'Visible');
    btn.setAttribute('aria-pressed',String((k==='density'&&cfg[k]==='compact')||(k==='font'&&cfg[k]==='large')||(k==='contrast'&&cfg[k]==='high')||(k==='hints'&&cfg[k]==='hide')||(k==='sidebar'&&cfg[k]==='compact')));
  });
 }
}
function navItems(){
 const all=Array.from(document.querySelectorAll('#sidebar [data-page]'));
 const seen=new Set();
 return all.filter(b=>{
  const id=text(b.dataset.page),label=text(b.textContent);
  if(!id||!label||seen.has(id))return false;
  seen.add(id);return true;
 }).map(b=>({id:b.dataset.page,label:text(b.textContent),element:b}));
}
function refreshList(){
 if(!results)return;
 navCache=navItems();
 const q=text(search&&search.value).toLocaleLowerCase();
 const shown=navCache.filter(x=>!q||x.label.toLocaleLowerCase().includes(q)).slice(0,32);
 results.replaceChildren();
 shown.forEach(item=>{
  const b=document.createElement('button');
  b.type='button';b.className='mal-ux-jump-item';
  b.textContent=item.label;b.title='Open '+item.label;
  b.onclick=()=>{if(typeof window.go==='function')window.go(item.id);else item.element.click();closePanel();};
  results.appendChild(b);
 });
 if(!shown.length){const e=document.createElement('div');e.className='mal-ux-noresults';e.textContent='No matching section';results.appendChild(e);}
}
function closePanel(){if(panel){panel.hidden=true;panel.setAttribute('aria-hidden','true');}}
function openPanel(){if(!active()||!panel)return;panel.hidden=false;panel.setAttribute('aria-hidden','false');refreshList();search.focus();}
function build(){
 const a=getApp();if(!a||$('#malUx20Launcher'))return;
 const launcher=document.createElement('button');
 launcher.type='button';launcher.id='malUx20Launcher';launcher.className='mal-ux-launcher';
 launcher.title='Open navigation and display preferences (Ctrl/⌘ + K)';
 launcher.setAttribute('aria-label','Open navigation and display preferences');
 launcher.textContent='☷ Tools';
 launcher.onclick=()=>panel&&!panel.hidden?closePanel():openPanel();
 document.body.appendChild(launcher);
 panel=document.createElement('section');panel.id='malUx20Panel';panel.className='mal-ux-panel';
 panel.hidden=true;panel.setAttribute('aria-label','Navigation and display preferences');
 panel.setAttribute('aria-hidden','true');
 panel.innerHTML='<div class="mal-ux-panel-head"><strong>Village dashboard tools</strong><button type="button" data-ux-close aria-label="Close tools">×</button></div>'+
 '<label class="mal-ux-search-label" for="malUx20Search">Jump to a section</label><input id="malUx20Search" type="search" autocomplete="off" placeholder="Search dashboard sections…">'+
 '<div class="mal-ux-jump-list" id="malUx20Results"></div>'+
 '<div class="mal-ux-settings"><button type="button" data-ux-setting="density" data-label="Spacing"></button><button type="button" data-ux-setting="font" data-label="Text"></button><button type="button" data-ux-setting="contrast" data-label="Contrast"></button><button type="button" data-ux-setting="hints" data-label="Help text"></button><button type="button" data-ux-setting="sidebar" data-label="Sidebar"></button></div>'+
 '<div class="mal-ux-panel-foot"><button type="button" data-ux-print>Print current view</button><button type="button" data-ux-top>Back to top</button><span>Esc closes · Ctrl/⌘ K opens</span></div>';
 document.body.appendChild(panel);
 search=panel.querySelector('#malUx20Search');results=panel.querySelector('#malUx20Results');
 search.addEventListener('input',refreshList);
 panel.querySelector('[data-ux-close]').onclick=closePanel;
 panel.querySelectorAll('[data-ux-setting]').forEach(btn=>btn.onclick=()=>{
  const key=btn.dataset.uxSetting;
  cfg[key]=key==='density'?(cfg[key]==='compact'?'comfortable':'compact'):
   key==='font'?(cfg[key]==='large'?'standard':'large'):
   key==='contrast'?(cfg[key]==='high'?'normal':'high'):
   key==='sidebar'?(cfg[key]==='compact'?'wide':'compact'):
   (cfg[key]==='hide'?'show':'hide');
  safeSet(cssKey+key,cfg[key]);apply();
 });
 panel.querySelector('[data-ux-print]').onclick=()=>{closePanel();window.print()};
 panel.querySelector('[data-ux-top]').onclick=()=>{closePanel();window.scrollTo({top:0,behavior:'smooth'})};
 document.addEventListener('pointerdown',e=>{if(panel&&!panel.hidden&&!panel.contains(e.target)&&!launcher.contains(e.target))closePanel();});
 topBtn=document.createElement('button');topBtn.type='button';topBtn.id='malUx20Top';topBtn.className='mal-ux-top';topBtn.textContent='↑';topBtn.title='Back to top';topBtn.setAttribute('aria-label','Back to top');
 topBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});document.body.appendChild(topBtn);
 let scrolling=false;window.addEventListener('scroll',()=>{
  if(scrolling)return;scrolling=true;
  requestAnimationFrame(()=>{topBtn.classList.toggle('is-visible',active()&&window.scrollY>500);scrolling=false;});
 },{passive:true});
 apply();
}
function enhance(){
 if(!active())return;
 build();
 document.querySelectorAll('#sidebar [data-page]').forEach(b=>{if(!b.title)b.title=text(b.textContent);});
 apply();
 // Helpful descriptions for table headings, with no DOM structural changes.
 document.querySelectorAll('#main th[data-sort]').forEach(th=>{
  if(!th.title)th.title='Click to sort'+(th.querySelector('.mal-col-resizer')?' · drag right edge to resize':'');
 });
 // Existing buttons remain clickable; only descriptive tooltips are added.
 document.querySelectorAll('#main [data-act="compact"]').forEach(b=>{if(!b.title)b.title='Switch between essential and all columns'});
}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;enhance();});}
document.addEventListener('keydown',e=>{
 const tag=(e.target&&e.target.tagName||'').toLowerCase();
 const inText=['input','textarea','select'].includes(tag)||(e.target&&e.target.isContentEditable);
 if(e.key==='Escape'&&panel&&!panel.hidden){closePanel();return;}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPanel();return;}
 if(!inText&&!e.ctrlKey&&!e.metaKey&&e.key==='/'){
  if(!active())return;
  const q=$('#main #q');
  if(q){e.preventDefault();q.focus();q.select&&q.select();}
  else{e.preventDefault();openPanel();}
 }
});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
const target=$('#app');
if(target)new MutationObserver(schedule).observe(target,{childList:true,subtree:false,attributes:true,attributeFilter:['class']});
const main=$('#main');
if(main)new MutationObserver(schedule).observe(main,{childList:true,subtree:false});
const sidebar=$('#sidebar');
if(sidebar)new MutationObserver(schedule).observe(sidebar,{childList:true,subtree:false});
})();