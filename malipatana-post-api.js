/* Malipatana POST transport shared by dashboard and login-free shared-entry forms.
   Credentials, session tokens, edit codes and submitted data stay in POST bodies.
   Response receipt is random, one-use and expires after five minutes. */
function malPostApi(apiUrl,action,params){
 params=params||{};
 const bytes=new Uint8Array(32);
 if(!window.crypto||!window.crypto.getRandomValues) return Promise.reject(Error('Secure browser randomness is unavailable. Update your browser.'));
 window.crypto.getRandomValues(bytes);
 const requestId=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
 const payload=Object.assign({},params,{action,_malAsync:true,_malRequestId:requestId});
 const jsonp=(part)=>new Promise((resolve,reject)=>{
  const cb='malpost_'+Date.now()+'_'+Math.random().toString(36).slice(2),script=document.createElement('script');
  let done=false;const timer=setTimeout(()=>finish(Error('The server did not respond. Check your connection.')),10000);
  function finish(err,value){if(done)return;done=true;clearTimeout(timer);try{delete window[cb]}catch(e){window[cb]=undefined}script.remove();err?reject(err):resolve(value)}
  window[cb]=finish.bind(null,null);script.onerror=()=>finish(Error('Cannot retrieve the secure response.'));
  script.referrerPolicy='no-referrer';script.src=apiUrl+'?'+new URLSearchParams({action:'postResult',requestId,part,callback:cb,_:Date.now()});document.body.append(script);
 });
 try{await fetch(apiUrl,{method:'POST',mode:'no-cors',credentials:'omit',cache:'no-store',redirect:'follow',
  headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify(payload),referrerPolicy:'no-referrer'});}catch(e){}
 async function read(part){
  const start=Date.now();
  while(Date.now()-start<28000){const r=await jsonp(part);if(r&&!r.pending){if(!r.ok)throw Error(r.error||'Secure response expired.');return r;}await new Promise(resolve=>setTimeout(resolve,450));}
  throw Error('The server did not confirm this request. Check the record before repeating a submission.');
 }
 return read(0).then(async first=>{let raw=first.body||'';for(let i=1;i<first.total;i++){const next=await read(i);raw+=next.body||'';}try{return JSON.parse(raw)}catch(e){throw Error('The server returned an unreadable response. Refresh and check the record before retrying.')}});
}
