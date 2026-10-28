/* Malipatana Shared Entry SW — no link tokens or submitted information are cached. */
"use strict";
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET' || request.mode!=='navigate')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin || !url.pathname.endsWith('/entry.html'))return;
 // Always load entry form fresh. Shared access is never decided by a cached response.
 event.respondWith(fetch(request));
});
