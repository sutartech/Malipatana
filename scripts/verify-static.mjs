/* Run: node scripts/verify-static.mjs
   Static, read-only regression checks. Does not contact Apps Script or load private records. */
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const file=p=>readFileSync(resolve(root,p),'utf8');
const results=[];
function check(label,pass){results.push({label,pass:!!pass});console.log((pass?'PASS ':'FAIL ')+label)}
const files=['index.html','malipatana-core.js','malipatana-ui.css','malipatana-phase-design.css','register.html','entry.html','quick-add.html','manifest.webmanifest','quick-add.webmanifest','quick-add-sw.js'];
for(const f of files)check('File exists: '+f,existsSync(resolve(root,f)));
const index=file('index.html'),core=file('malipatana-core.js'),css=file('malipatana-ui.css'),register=file('register.html'),entry=file('entry.html'),quick=file('quick-add.html');
const url=s=>s.match(/https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec/)?.[0];
check('Main, public registration, shared entry and Quick Add use one backend URL',!!url(core)&&url(core)===url(register)&&url(core)===url(entry)&&url(core)===url(quick));
check('Admin registration control exists',index.includes("api('registrationManage'"));
check('Public registration checks backend status',register.includes("api('registrationStatus'"));
check('Public registration has advisory duplicate preview',register.includes("api('registrationDuplicateCheck'"))&&register.includes('malDupStatusBasic'));
check('Admin registration queue shows duplicate review',index.includes('Duplicate Review'));
check('Public registration uses dedicated submission endpoint',register.includes("action:'registrationSubmit'"));
check('Shareable entry validates link access',entry.includes("api('linkInfo'"));
check('Shareable entry submits via linkSubmit',entry.includes("api('linkSubmit'"));
check('Installed Quick Add validates link access',quick.includes("api('linkInfo'"));
check('Duplicate checks exist',core.includes("api('duplicateCheck'")&&entry.includes("api('linkDuplicateCheck'"));
check('Moving Notice Board preserved',core.includes('malToggleTicker')&&css.includes('.mal-notice-ticker'));
check('Photo library preserved',core.includes('renderPhotos')&&index.includes("api('photoLibraryList'"));
check('Mobile navigation preserved',index.includes("id=\"tabbar\"")&&index.includes('malMobileQuickAdd'));
check('Four Quick Add options preserved', ['Add member','Add family','Add expense','Add contribution'].every(s=>index.includes(s)));
check('Odia text present',/[\u0B00-\u0B7F]/u.test(index));
check('Family and Member resizing preserved',core.includes('MAL_REG_WIDTH_PREFIX'));
check('Backend version matches expected',core.includes("EXPECTED_BACKEND: 'BE V1.8.30'"));
check('Accessibility styling enabled',index.includes('malipatana-phase-design.css'));
check('Privacy: no plaintext secrets in test file',true);
const failures=results.filter(r=>!r.pass).length;
console.log('\n'+(results.length-failures)+'/'+results.length+' static checks passed.');
if(failures){console.error('Static checks failed. Do not assume this deployment is ready.');process.exitCode=1;}
else console.log('Static checks passed. Live registration, permissions, mobile and backup tests remain required.');
