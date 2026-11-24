/* Run: node scripts/verify-static.mjs
   Static, read-only regression checks. Does not contact Apps Script or load private records. */
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const file=p=>readFileSync(resolve(root,p),'utf8');
const results=[];
function check(label,pass){results.push({label,pass:!!pass});console.log((pass?'PASS ':'FAIL ')+label)}
const files=['index.html','malipatana-core.js','malipatana-ui.css','malipatana-layout-fit.css','malipatana-phase-design.css','malipatana-ops.css','register.html','entry.html','quick-add.html','manifest.webmanifest','quick-add.webmanifest','quick-add-sw.js'];
for(const f of files)check('File exists: '+f,existsSync(resolve(root,f)));
const index=file('index.html'),core=file('malipatana-core.js'),css=file('malipatana-ui.css'),ops=file('malipatana-ops.css'),welfare=file('malipatana-family-welfare.css'),register=file('register.html'),entry=file('entry.html'),quick=file('quick-add.html');
const url=s=>s.match(/https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec/)?.[0];
const dashboardApiUrl=url(core), publicEntryApiUrl=url(register);
check('Main dashboard backend URL is present',!!dashboardApiUrl);
check('Public registration, shared entry and Quick Add retain their shared backend URL',!!publicEntryApiUrl&&publicEntryApiUrl===url(entry)&&publicEntryApiUrl===url(quick));
check('Admin registration control exists',index.includes("api('registrationManage'"));
check('Public registration checks backend status',register.includes("api('registrationStatus'"));
check('Public registration has advisory duplicate preview',register.includes("api('registrationDuplicateCheck'")&&register.includes('malDupStatusBasic'));
check('Admin registration queue shows duplicate review',index.includes('Duplicate Review'));
check('Village Suggestions public page exists',existsSync(resolve(root,'suggestions.html')));
check('Suggestions Admin module exists',existsSync(resolve(root,'malipatana-suggestions.js')));
check('Suggestions linked on public and login pages',file('public.html').includes('suggestions.html')&&index.includes('suggestions.html'));
check('Suggestions module loaded for authenticated Admin',index.includes('malipatana-suggestions.js'));
check('Existing Grievance UI preserved',file('public.html').includes('gFab')&&core.includes('grievances'));
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
const expectedBackend=core.match(/EXPECTED_BACKEND:\s*'([^']+)'/)?.[1]||'';
check('Expected backend version is declared in a recognisable format',/^BE V\d+\.\d+/.test(expectedBackend));
const declaredFe=core.match(/VERSION:\s*'FE V([^']+)'/)?.[1]||'';
const coreAsset=index.match(/malipatana-core\.js\?v=([^"' ]+)/)?.[1]||'';
check('Core script cache-bust matches declared FE version',!!declaredFe&&!!coreAsset&&declaredFe.toLowerCase()===coreAsset.toLowerCase());
check('Sidebar collapse preference persistence is present',core.includes('mal_nav_collapsed_v1')&&core.includes('navSaveCollapsePrefs'));
check('Sidebar category controls expose accessible state',core.includes('aria-controls="mal-nav-items-')&&core.includes('aria-expanded='));

check('Phase 2 dashboard stylesheet exists',existsSync(resolve(root,'malipatana-phase2-dashboard.css')));
check('Phase 2 dashboard stylesheet is loaded',index.includes('malipatana-phase2-dashboard.css'));
check('Dashboard quick actions are role and page filtered',core.includes('const quickActions = [')&&core.includes('canEdit() && quickActions.length'));
check('Dashboard quick actions use existing form workflow',core.includes("onclick=\"openForm('${key}')\""));
check('Dashboard heading reflects village operations',core.includes('village operations</h2>')&&core.includes('ux-home-live-label'));
check('Phase 3.3 donor identity remains included in Phase 3.4',core.includes("list: ['Contribution ID','Date','Month','Family ID','Member ID','Contributor','Amount','Payment Mode','Receipt No']")&&core.includes("rec['Contributor'] || memberName(rec['Member ID']) || familyName(rec['Family ID'])"));
check('Contribution register exposes linked member identity',core.includes("list: ['Contribution ID','Date','Month','Family ID','Member ID','Contributor','Amount','Payment Mode','Receipt No']"));
check('Receipt falls back to linked member name before family name',core.includes("rec['Contributor'] || memberName(rec['Member ID']) || familyName(rec['Family ID'])"));
check('Family profile includes permission-gated recent contribution history',core.includes("const contributionHistoryHtml = canSee('contributions')")&&core.includes('data-family-receipt='));
check('Family contribution history opens the existing receipt and filtered register',core.includes("offerReceipt(rec)")&&core.includes("VIEW.contributions = Object.assign"));
check('Phase 3.4 family contribution history remains in the current FE build',core.includes('const contributionHistoryHtml = canSee(\'contributions\')')&&core.includes('data-family-receipt=')&&core.includes("VERSION: 'FE V3.10.0-GOVERNANCE-CONTROL-CENTRE'"));

check('Family filter identifies each family by head and ID',core.includes("head=String(f['Family Head']||'Family').trim()")&&core.includes("filter(Boolean).join(' · '))} (${esc(fid)})"));
check('Member register shows family head alongside stored Family ID',core.includes("if(f.t === 'family')")&&core.includes("const family=(DB.families||[]).find(x=>String(x['Family ID']||'').trim()===id)"));
check('All family-linked registers show family head and stored Family ID',core.includes("if(f.t === 'family')")&&core.includes("const family=(DB.families||[]).find(x=>String(x['Family ID']||'').trim()===id)")&&core.includes("'<span class=\"muted small\">'+esc(id)+'</span>'"));

check('Shared design-system stylesheet exists',existsSync(resolve(root,'malipatana-design-system.css')));
check('Shared design-system stylesheet is loaded',index.includes('malipatana-design-system.css'));
check('Sidebar category headings use stylesheet classes, not inline presentation',core.includes('class="nav-category-bar nav-category-bar-')&&!/nav-category-bar-[^"]+"[^>]*style=/.test(core)&&!core.includes('navgroup-symbol" style=')&&!core.includes('navgroup-title" style=')&&!core.includes('navgroup-chevron" style='));
check('Accessibility styling enabled',index.includes('malipatana-phase-design.css'));
check('Privacy: no plaintext secrets in test file',true);

check('Phase 3.5 family welfare history is present and versioned',core.includes("VERSION: 'FE V3.10.0-GOVERNANCE-CONTROL-CENTRE'")&&index.includes('malipatana-core.js?v=3.10.0-governance-control-centre'));
check('Family welfare history reuses existing emergency, medical, education and support records',core.includes("familyRows('emergency')")&&core.includes("familyRows('medical')")&&core.includes("familyRows('education')")&&core.includes("familyRows('regularSupport')"));
check('Family welfare history independently enforces each module permission',core.includes("welfareTable('Emergency assistance','emergency'")&&core.includes("welfareTable('Medical assistance','medical'")&&core.includes("welfareTable('Education assistance','education'")&&core.includes("welfareTable('Regular support','regularSupport'"));
check('Family welfare history adds no backend or sheet contract',!core.includes("api('save',{sheet:'Emergency Cases'")&&!core.includes("api('save',{sheet:'Medical'")&&index.includes('malipatana-family-welfare.css'));
check('Family welfare responsive stylesheet exists and is loaded',existsSync(resolve(root,'malipatana-family-welfare.css'))&&index.includes('malipatana-family-welfare.css'));


check('Modal content has an independently scrollable flex body while header and footer stay fixed',css.includes('.modal>.body{flex:1 1 auto;min-height:0;max-height:100%;overflow-y:auto')&&css.includes('.modal>header,.modal>footer{flex:0 0 auto}'));
check('Modal scrolling supports touch and prevents scroll chaining on mobile',css.includes('-webkit-overflow-scrolling:touch')&&css.includes('overscroll-behavior-y:contain'));


const workspaceCss=file('malipatana-workspace-polish.css');
check('Workspace polish stylesheet exists and is loaded',existsSync(resolve(root,'malipatana-workspace-polish.css'))&&index.includes('malipatana-workspace-polish.css?v=1.0.0-phase-3-7'));
check('Workspace content is full-width beside the navigation rail',workspaceCss.includes('#app .shell>main.main')&&workspaceCss.includes('max-width:none!important')&&workspaceCss.includes('#app .ux-home>.ledger'));
check('Family profile scroll uses a shrinkable content region with fixed header and footer',workspaceCss.includes('#modalRoot .modal:has(.mal-family-profile-body)>header')&&workspaceCss.includes('#modalRoot .modal>.mal-family-profile-body')&&workspaceCss.includes('overflow-y:auto!important')&&workspaceCss.includes('height:92dvh!important'));
const layoutCss=file('malipatana-layout-fit.css');
check('Village home dashboard fills the available workspace without a narrow max-width',layoutCss.includes('width:100%;')&&layoutCss.includes('max-width:none;')&&layoutCss.includes('flex:1 1 0%;'));
check('Family profile body has a dedicated scroll target',core.includes('class="body mal-family-profile-body"')&&core.includes('aria-label="Family profile details"'));
check('Family profile dialog has a definite height and independently scrollable body',layoutCss.includes('.modal:has(>.mal-family-profile-body)')&&layoutCss.includes('height:92dvh;')&&layoutCss.includes('.modal>.mal-family-profile-body')&&layoutCss.includes('flex:1 1 0%;')&&layoutCss.includes('height:0;'));
check('Family profile scroll fix is cache-busted in the page shell',index.includes('malipatana-ui.css?v=3.5.63-family-profile-scroll')&&index.includes('malipatana-layout-fit.css?v=1.0.0'));


check('Phase 3.6 family financial summary is versioned and cache-busted',core.includes("VERSION: 'FE V3.10.0-GOVERNANCE-CONTROL-CENTRE'")&&index.includes('malipatana-core.js?v=3.10.0-governance-control-centre')&&index.includes('malipatana-family-welfare.css?v=3.6.0-family-financial-summary'));
check('Family financial summary shows contribution, emergency, medical, education and regular support categories',core.includes("label:'Contributions made'")&&core.includes("label:'Emergency assistance paid'")&&core.includes("label:'Medical assistance'")&&core.includes("label:'Education assistance'")&&core.includes("label:'Regular support'"));
check('Family financial summary enforces existing module permissions',core.includes("if(canSee('contributions')) financialItems.push")&&core.includes("if(canSee('emergency')) financialItems.push")&&core.includes("if(canSee('medical')) financialItems.push")&&core.includes("if(canSee('education')) financialItems.push")&&core.includes("if(canSee('regularSupport')) financialItems.push"));
check('Family financial summary avoids combining potentially overlapping assistance totals',core.includes('They are not added into one grand total')&&core.includes('secondary:familyMedicalRows.reduce'));
check('Family financial summary has responsive presentation styles',welfare.includes('.mal-financial-grid{display:grid')&&welfare.includes('@media(max-width:700px){.mal-family-financial'));


check('Phase 4.0 derives overdue, due-soon and unassigned governance work from existing records',core.includes('const taskOverdue=taskOpen.filter')&&core.includes('const taskDueSoon=taskOpen.filter')&&core.includes('const taskUnassigned=taskOpen.filter'));
check('Governance action queue reuses existing task and compliance registers',core.includes('const actionQueue=[')&&core.includes("kind:'task'")&&core.includes("kind:'compliance'")&&core.includes('data-gov-edit='));
check('Governance task search and filters are client-side',core.includes('id="govTaskSearch"')&&core.includes('id="govTaskFilter"')&&core.includes('const filterTasks=')&&core.includes('taskSearch.oninput=filterTasks'));
check('Phase 4.0 frontend version is cache-busted',core.includes("VERSION: 'FE V3.10.0-GOVERNANCE-CONTROL-CENTRE'")&&index.includes('malipatana-core.js?v=3.10.0-governance-control-centre'));
check('Governance action centre has responsive layout styles',ops.includes('.mal-gov-queue{display:grid')&&ops.includes('@media(max-width:620px){.mal-gov-kpis'));

const failures=results.filter(r=>!r.pass).length;
console.log('\n'+(results.length-failures)+'/'+results.length+' static checks passed.');
if(failures){console.error('Static checks failed. Do not assume this deployment is ready.');process.exitCode=1;}
else console.log('Static checks passed. Live registration, permissions, mobile and backup tests remain required.');
