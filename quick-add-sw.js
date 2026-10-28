/* FE V3.5.45 — Quick Add Malipatana. No credentials or records cached. */
"use strict";
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||req.mode!=='navigate')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin||!url.pathname.endsWith('/quick-add.html'))return;
 event.respondWith(fetch(req)); // Always check live permissions, never serve a cached form.
});
