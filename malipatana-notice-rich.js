/* Malipatana Notice Board — rich colour and highlight add-on, v1.1.
   Existing Notices.Text column, no Apps Script or Sheets change.
   All markup is escaped except strict, allowlisted colour tags. */
(function(){
  "use strict";
  if(window.__malNoticeRichV11)return;
  window.__malNoticeRichV11=true;
  const colors={black:"#202939",red:"#B42318",green:"#087568",blue:"#175CD3",orange:"#B54708",purple:"#6941C6",yellow:"#9A6700",white:"#FFFFFF"};
  const highs={none:"",yellow:"#FFF1A6",mint:"#D1FADF",pink:"#FCE7F3",sky:"#DBEAFE",orange:"#FED7AA",gray:"#E5E7EB"};
  const escapeHtml=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const strip=v=>String(v||"").replace(/\[\[c=(?:black|red|green|blue|orange|purple|yellow|white);h=(?:none|yellow|mint|pink|sky|orange|gray)\]\]/g,"").replace(/\[\[\/\]\]/g,"");
  const original=typeof window.malNoticeLinkify_==="function"?window.malNoticeLinkify_:null;
  const plainSafe=v=>original?original(v):escapeHtml(v).replace(/\r?\n/g,"<br>");
  function formatted(v){
    const text=String(v==null?"":v);
    const token=/\[\[c=(black|red|green|blue|orange|purple|yellow|white);h=(none|yellow|mint|pink|sky|orange|gray)\]\]([\s\S]*?)\[\[\/\]\]/g;
    let out="",last=0,m;
    while((m=token.exec(text))){
      out+=plainSafe(text.slice(last,m.index));
      const style="color:"+colors[m[1]]+";"+(m[2]==="none"?"":"background-color:"+highs[m[2]]+";");
      out+='<span class="mal-rich-span" style="'+style+'">'+plainSafe(m[3])+"</span>";
      last=token.lastIndex;
    }
    return out+plainSafe(text.slice(last));
  }
  window.malNoticeLinkify_=formatted;
  function tickerClean(){
    document.querySelectorAll(".mal-notice-item,.mal-notice-screen-reader").forEach(el=>{
      if(!(el.textContent||"").includes("[[c="))return;
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];
      while(walker.nextNode())nodes.push(walker.currentNode);
      nodes.forEach(n=>{n.nodeValue=strip(n.nodeValue);});
    });
  }
  function editor(){
    const field=document.getElementById("f_Text");
    if(!field||field.dataset.noticeRich==="1")return;
    const modal=field.closest(".modal");
    if(!modal||!/notice/i.test((modal.querySelector("h3")||{}).textContent||""))return;
    field.dataset.noticeRich="1";
    field.rows=Math.max(5,field.rows||0);
    const box=document.createElement("section");
    box.className="mal-rich-toolbar";
    box.innerHTML='<div class="mal-rich-heading">Notice text formatting <small>Select any words or a full line, then apply your colours</small></div><div class="mal-rich-controls"><label>Text colour<select class="mal-rich-color"><option value="black">Black</option><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="orange">Orange</option><option value="purple">Purple</option><option value="yellow">Dark yellow</option><option value="white">White</option></select></label><label>Highlighter<select class="mal-rich-highlight"><option value="none">None</option><option value="yellow">Yellow</option><option value="mint">Mint green</option><option value="pink">Light pink</option><option value="sky">Light blue</option><option value="orange">Peach</option><option value="gray">Grey</option></select></label><button type="button" class="mal-rich-apply">Apply to selection</button><button type="button" class="mal-rich-clear">Clear all styling</button></div><p class="mal-rich-note">Use Enter for separate lines. The original notice and its links are preserved.</p><div class="mal-rich-preview-title">Live preview</div><div class="mal-rich-preview" aria-live="polite"></div>';
    field.insertAdjacentElement("afterend",box);
    const preview=box.querySelector(".mal-rich-preview");
    const update=()=>{preview.innerHTML=formatted(field.value||"")||'<span class="mal-rich-muted">Your notice preview appears here.</span>';};
    box.querySelector(".mal-rich-apply").onclick=()=>{
      const a=field.selectionStart,b=field.selectionEnd;
      if(a===b){alert("First select words in the notice text box.");return;}
      const selected=field.value.slice(a,b);
      if(/\[\[(?:c=|\/)/.test(selected)){alert("Please select ordinary text, not existing formatting codes.");return;}
      const col=box.querySelector(".mal-rich-color").value,high=box.querySelector(".mal-rich-highlight").value;
      if(col==="white"&&high==="none"){alert("White text needs a background highlight to stay readable.");return;}
      field.setRangeText("[[c="+col+";h="+high+"]]"+selected+"[[/]]",a,b,"end");
      field.dispatchEvent(new Event("input",{bubbles:true}));field.focus();update();
    };
    box.querySelector(".mal-rich-clear").onclick=()=>{
      if(!confirm("Remove colour and highlight formatting from this notice?"))return;
      field.value=strip(field.value);
      field.dispatchEvent(new Event("input",{bubbles:true}));update();
    };
    field.addEventListener("input",update);update();
  }
  let scheduled=false;
  function sync(){editor();tickerClean();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",sync);else sync();
  new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;sync();});}).observe(document.documentElement,{childList:true,subtree:true});
})();