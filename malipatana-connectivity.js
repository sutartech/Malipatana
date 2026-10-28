/* Malipatana status feedback — deliberately stores no user data. */
(function(){
  'use strict';
  if (!document.body) return;
  var banner=document.createElement('div');
  banner.id='malConnectivityBanner';
  banner.className='mal-connectivity-banner';
  banner.hidden=true;
  banner.setAttribute('role','status');
  banner.setAttribute('aria-live','polite');
  var icon=document.createElement('span');icon.className='mal-connectivity-icon';icon.textContent='⚠';
  var message=document.createElement('span');
  message.textContent='This device appears offline. New entries cannot be confirmed until the connection returns. Avoid submitting the same record twice.';
  banner.append(icon,message);
  document.body.insertBefore(banner,document.body.firstChild);
  function update(){banner.hidden=navigator.onLine!==false;}
  window.addEventListener('offline',update);
  window.addEventListener('online',update);
  update();
})();
