/**
 * MALIPATANA VILLAGE PROJECTS — BE V1.8.39-PROJECTS
 * Add this as a separate Projects.gs file in the EXISTING Apps Script project.
 * Run setupProjects() once from the editor after adding the Code.gs integration
 * snippets in PROJECTS-BACKEND-INSTALL.md.
 *
 * Uses the existing master spreadsheet and existing Drive storage.
 * Permission key for BOTH registers is "events". No new permission key.
 */
const MAL_PROJECT_HEADERS_ = [
  'Project ID','Project Name','Category','Location','Description','Status',
  'Estimated Budget','Approved Amount','Amount Received','Actual Expenditure',
  'Assigned Committee Member','Target Completion Date','Actual Completion Date',
  'Progress','Photo','Supporting Documents','Public Summary','Publish','Remarks'
];
const MAL_PROJECT_MILESTONE_HEADERS_ = [
  'Milestone ID','Project ID','Milestone','Description','Assigned To',
  'Planned Start Date','Target Date','Actual Completion Date','Status','Progress',
  'Actual Expenditure','Photo','Supporting Documents','Remarks'
];

function setupProjects(){
  addHeaders_('Projects',MAL_PROJECT_HEADERS_,true);
  addHeaders_('Project Milestones',MAL_PROJECT_MILESTONE_HEADERS_,true);
  Logger.log(JSON.stringify({
    ok:true,
    message:'Village Projects and Project Milestones registers are ready in the existing master spreadsheet.',
    sheets:['Projects','Project Milestones'],
    permission:'events',
    note:'No new spreadsheet created. Existing registers and rows are preserved.'
  },null,2));
  return {ok:true,sheets:['Projects','Project Milestones'],permission:'events'};
}

function validateProjectRecord_(name,record){
  if(name!=='Projects'&&name!=='Project Milestones')return record;
  const rec=record||{};
  const numeric=name==='Projects'
    ? ['Estimated Budget','Approved Amount','Amount Received','Actual Expenditure','Progress']
    : ['Progress','Actual Expenditure'];
  numeric.forEach(function(k){
    if(rec[k]===undefined||rec[k]==='')return;
    const n=Number(String(rec[k]).replace(/[₹,\\s]/g,''));
    if(!Number.isFinite(n)||n<0)throw new Error(k+' must be a non-negative number.');
    if(k==='Progress'&&n>100)throw new Error('Progress must be between 0 and 100.');
    rec[k]=n;
  });
  const dates=name==='Projects'
    ? ['Target Completion Date','Actual Completion Date']
    : ['Planned Start Date','Target Date','Actual Completion Date'];
  dates.forEach(function(k){
    const v=String(rec[k]||'').trim();
    if(v&&!/^\\d{4}-\\d{2}-\\d{2}$/.test(v))throw new Error('Enter a valid '+k+'.');
  });
  if(name==='Projects'){
    const status=['Proposed','Under Approval','Approved','In Progress','On Hold','Completed','Cancelled'];
    if(rec.Status&&!status.includes(String(rec.Status)))throw new Error('Invalid project status.');
    if(!String(rec['Project Name']||'').trim())throw new Error('Project Name is required.');
    if(rec['Actual Completion Date'])rec.Status='Completed';
  }else{
    const status=['Not Started','In Progress','Completed','On Hold'];
    if(rec.Status&&!status.includes(String(rec.Status)))throw new Error('Invalid milestone status.');
    const pid=String(rec['Project ID']||'').trim();
    if(!pid||!rows_('Projects').some(p=>String(p['Project ID'])===pid))
      throw new Error('Choose an existing Project ID before saving a milestone.');
    if(!String(rec.Milestone||'').trim())throw new Error('Milestone name is required.');
    if(!String(rec['Target Date']||'').trim())throw new Error('Target Date is required.');
    if(rec['Actual Completion Date']){rec.Status='Completed';rec.Progress=100;}
  }
  return rec;
}
