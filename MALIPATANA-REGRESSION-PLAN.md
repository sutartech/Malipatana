# Malipatana Regression and Release Plan

Date: 2026-11-24
Baseline: main commit 4270b6dc77bb9c16df045849ffd0b535c888edbd
Working branch: transformation/phase-1-foundation

## 1. Test principles

- Preserve production data and backend behaviour.
- Use synthetic records and an independent test spreadsheet for write tests.
- Never run destructive tests against the production village register.
- Frontend visibility is not proof of backend authorization.
- A green GitHub Pages workflow is not proof that every browser has the latest cached asset.
- Record browser, viewport, FE version, observed BE version, commit and test outcome.

## 2. Source/live baseline

| Item | Screenshot | Repository main | Finding |
|---|---|---|---|
| Frontend | FE V3.8.2-SIDEBAR-CASCADE-ISOLATION | FE V3.8.3-COLLAPSIBLE-NAV-GROUPS | Screenshot is one FE patch behind source |
| Backend | BE V1.8.46-GOVERNANCE-READONLY-DOCUMENTS | Expected BE V1.8.46-GOVERNANCE-READONLY-DOCUMENTS | Declared versions match |
| Core asset | Not independently inspected in browser | index loads malipatana-core.js?v=3.8.3-collapsible-nav-groups | Cache-busted source reference exists |
| Pages workflow | Screenshot predates inspected deployment evidence | run 45326506020 completed successfully for baseline commit | Deployment workflow passed; live browser cache still needs verification |

The live URL could not be independently retrieved in this inspection environment. Therefore no claim is made that the screenshot's browser session has already loaded the current asset. Verify from a fresh normal browser session and compare the visible version chips.

## 3. Known defects and source observations

1. navCategoryCollapsed is an in-memory object; preferences do not survive reload.
2. buildNav() forcibly sets the active page's category to expanded every time it rebuilds navigation, overriding a user's explicit collapse choice.
3. Current generated heading classes are nav-category-bar and nav-category-bar-<slug>, while parts of malipatana-sidebar-contrast.css target legacy .navgroup selectors. Inline styles currently supply much of the visual treatment; stylesheet targeting must be unified.
4. scripts/verify-static.mjs expects BE V1.8.30, but current core CONFIG is BE V1.8.46-GOVERNANCE-READONLY-DOCUMENTS. This is stale and should be replaced with a syntax/format check of the declared version. It must not imply that the live Apps Script deployment was contacted.
5. Existing rollout checklist has unresolved manual checks for OTP, registration pause enforcement, offline queue, duplicate prevention, restore, responsive sizes, Odia, screen reader, Quick Add role access and unchanged workflows.

## 4. Phase 1 test matrix

| ID | Area | Test | Expected result | Environment |
|---|---|---|---|---|
| NAV-01 | Sidebar | Expand each category | Only its own items appear; aria-expanded=true | Desktop + mobile |
| NAV-02 | Sidebar | Collapse each category | Items hide; aria-expanded=false | Desktop + mobile |
| NAV-03 | Sidebar | Collapse active category then trigger unrelated render | Explicit collapse preference remains respected | Desktop |
| NAV-04 | Sidebar | Navigate to a page in a collapsed category via section search | Relevant category becomes visible/expanded | Desktop |
| NAV-05 | Sidebar | Reload browser | User's category preferences persist | Desktop + mobile |
| NAV-06 | Sidebar | Storage unavailable/private mode | Navigation remains usable with in-memory fallback | Desktop + mobile |
| NAV-07 | Sidebar | Keyboard Tab, Enter, Space | Every category toggle works and focus remains visible | Desktop |
| NAV-08 | Sidebar | Screen reader | Button name and expanded/collapsed state are announced | Manual |
| NAV-09 | Sidebar | Admin vs non-admin | Only authorised navigation items are rendered | Test roles |
| VER-01 | Version | Compare index asset query and CONFIG version | Cache-busted FE asset corresponds to declared source version | Static |
| VER-02 | Version | Compare visible FE/BE chips in fresh session | FE matches source; observed BE reported separately | Live |
| VER-03 | Deployment | Inspect Pages workflow for target commit | Workflow completed successfully | GitHub |
| CSS-01 | Design | Compare all category headers and active nav | Current generated classes receive consistent token-driven styling | Desktop + mobile |
| CSS-02 | Design | Contrast and focus | Text/focus meet WCAG contrast requirements | Automated + manual |
| REG-01 | Static | Run node scripts/verify-static.mjs | All valid source assertions pass; no stale BE hard-code | Local/CI |
| REG-02 | Static | JavaScript syntax check | No syntax errors in changed JS | Local/CI |
| REG-03 | Preservation | Compare backend URL in core/register/entry/quick-add | All remain unchanged and consistent | Static |
| REG-04 | Preservation | Compare backend schema/API names | No unapproved changes | Source diff |
| REG-05 | Preservation | Inspect auth/permission sections in diff | No auth or permission changes | Source diff |

## 5. Cross-module regression gates (before later phases)

| Area | Required tests |
|---|---|
| Authentication | Password login, verified-email OTP login, password reset, expiry, logout |
| Registration | Open/paused state enforced server-side; duplicate review; successful submission |
| Families | Add, edit, search, duplicate handling, family ID/name selection, print |
| Members | Add, edit, family linking, deceased/residence filters, permissions |
| Finance | Contribution, income, expenditure, edit, totals, receipt/voucher, duplicate-submit |
| Welfare | Emergency and regular-support read/write, status and access restrictions |
| Projects | Project and milestone read/write, status, ownership and totals |
| Grievances | Public submission, tracking, restricted personal information |
| Notices | Public/login visibility, date controls, links and images |
| Documents | Permission-specific view/download/print, preview, version and status |
| Governance | Compliance and task read/write, admin-only access |
| Quick Add | Admin/Editor/Viewer permissions and all existing entry types |
| Offline | Interrupted save and retry without duplicate transactions |
| Backups | Restore to independent test spreadsheet and reconcile counts |

## 6. Responsive and accessibility matrix

Viewports: 320, 360, 390, 412, 768, 1024, 1280, 1440 px.
Browsers/devices: Android Chrome, desktop Chrome, Safari (macOS/iOS where available).
Checks:
- no horizontal page overflow;
- sidebar drawer and scrim operate correctly;
- target sizes and spacing;
- keyboard-only operation;
- focus visible and not obscured;
- screen-reader labels and state;
- 200% and 400% zoom;
- Odia glyph rendering and line wrapping;
- reduced motion;
- high contrast and colour-independent status;
- print layouts.

## 7. Performance targets

At the 75th percentile where field measurement is available:
- LCP <= 2.5 seconds
- INP <= 200 milliseconds
- CLS <= 0.1

Measure initial login and authenticated dashboard separately. Record Apps Script latency separately from frontend render time. Do not claim field performance from a single local run.

## 8. Security and data integrity gates

- Verify server-side authorization for every sensitive operation.
- Confirm unauthorised roles cannot call protected APIs successfully.
- Check XSS handling in user-entered names, notes, notices and grievance content.
- Validate upload type, size and error handling.
- Confirm no private records or secrets enter GitHub assets, browser localStorage or public reports.
- Confirm duplicate submissions are prevented or safely detected.
- Restore backups to an independent test spreadsheet.
- Review document sharing and download permissions.
- Confirm public exports exclude personal beneficiary and donor details.

## 9. Rollback procedure

1. Stop further deployments.
2. Identify the last known-good commit and matching Pages workflow run.
3. Revert the frontend-only change or redeploy the known-good commit.
4. Verify FE version, backend connectivity, authentication and key read-only workflows.
5. Verify critical write workflows only with approved test records.
6. Record incident, cause, affected commit and corrective action.
7. Never roll back or overwrite Apps Script/Sheets as part of a frontend rollback.

## 10. Test evidence record

For each release, record:
- release branch and commit SHA;
- Pages workflow run and conclusion;
- FE source version and visible browser FE version;
- declared expected backend version and observed live backend version;
- test IDs passed/failed/not run;
- browser/device and viewport;
- screenshots with private information removed;
- known limitations;
- rollback commit.
