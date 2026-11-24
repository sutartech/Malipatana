# Malipatana Global-Quality Transformation Roadmap

Status: Phase 4.3 merged; completion bundle in review; remaining acceptance work tracked explicitly below
Baseline branch: main
Working branch: transformation/phase-4-6-completion-bundle
Date: 2026-11-24
Scope: Full 100-improvement programme
Preservation rule: No backend URL, Apps Script code, spreadsheet schema, existing record, authentication flow, or permission policy may be changed without a separately reviewed and explicitly approved change.

## 1. Programme objectives

Build Malipatana into a dependable village governance and community-management platform with one coherent design system; task-oriented public, committee and administrator experiences; transparent but privacy-preserving financial and welfare workflows; accessible mobile-first interactions; verified security, reliability and recoverability; and a maintainable frontend/release process.

A feature is not complete merely because its code is committed. Completion requires source checks, deployed-version verification, relevant workflow regression and user acceptance.

## 2. Baseline and source/live discrepancy (updated 2026-11-24)

Repository: https://github.com/sutartech/Malipatana
Default branch: main
Current baseline commit before Phase 2: 35a2eeb910793ef64cb7a1707f133bc410e7f62b
Current frontend: FE V3.14.0-COMPLETION-BUNDLE
Expected backend: BE V1.8.46-GOVERNANCE-READONLY-DOCUMENTS
Core asset cache key: 3.14.0-completion-bundle
Latest GitHub Pages deployment for baseline commit: run 45328436188, completed successfully.
Latest static regression for baseline commit: run 45328436565, completed successfully (41/41 checks).

Phase 1 status:
- Persistent sidebar collapse preferences and accessible controls merged.
- Shared semantic design tokens and stylesheet-owned category navigation merged.
- Automated static regression runs on main and transformation branches.
- Apps Script endpoints, sheet schema/data, authentication and permission rules remain unchanged.

The main dashboard and public/shared-entry pages retain their existing separate Apps Script deployment URLs. The public registration, shared entry and Quick Add pages continue to share their existing endpoint. This topology is intentional and preserved.

## 3. Non-negotiable preservation controls

1. Keep every existing Apps Script endpoint unchanged, including the separate main-dashboard and public/shared-entry deployments.
2. Do not edit or deploy Apps Script during frontend-only phases.
3. Keep current Google Sheets tab names, column order, IDs and row semantics unchanged.
4. Keep current Google Drive document storage and file permissions.
5. Keep login, verified-email OTP, session expiry and password-reset flows unchanged unless separately approved.
6. Keep server-side authorization checks; frontend visibility is not authorization.
7. Keep Admin, Editor, Viewer, public registration, shared-entry and Quick Add permission boundaries.
8. Do not expose private records in localStorage, public HTML, logs, test fixtures or screenshots.
9. Do not add paid infrastructure or migrate data as part of this programme.
10. Every phase is independently reviewable and reversible.

## 4. The 100-improvement backlog

### Phase 1 — Foundation, design system and release integrity (15)
1. Establish a single set of design tokens for colour, typography, spacing, borders, radius, shadows, focus and elevation.
2. Define semantic colour roles for People, Money, Welfare, Villagers, Documents and Administration.
3. Consolidate duplicate/obsolete sidebar selectors and remove fragile nth-of-type styling.
4. Establish reusable button, input, select, textarea, badge, card, panel, table and empty-state styles.
5. Standardise page heading, subtitle, toolbar and content-width patterns.
6. Make category navigation accessible with button semantics, aria-expanded and aria-controls.
7. Persist sidebar collapse preferences per browser without storing personal or village records.
8. Keep the active page reachable while respecting an explicit user collapse choice.
9. Add a documented frontend/backend version contract; distinguish declared expected backend from observed live backend.
10. Correct stale static checks and add source-level assertions for navigation, script cache-busting and required assets.
11. Add a pre-release checklist and a release note template.
12. Create a preview/development branch workflow; never test risky changes directly on main.
13. Add a repeatable rollback procedure and record the last known-good commit.
14. Add a privacy-safe diagnostic panel for version, deployment and health status.
15. Verify no Apps Script endpoint, spreadsheet schema, auth flow or permission rule changed during frontend-only releases.

### Phase 2 — Home dashboard and navigation (15) — IN PROGRESS
Implementation policy: presentation-first; reuse existing DB.summary, existing module data and existing navigation/form actions. No new backend fields, sheets or APIs.
16. Reorganise the home screen around today's village priorities.
17. Show verified family and member counts with clear data freshness.
18. Show available fund and emergency target with a clear calculation explanation.
19. Show pending welfare cases only to authorised roles.
20. Show committee actions due and overdue.
21. Show upcoming village events and notices.
22. Add role-aware quick actions without duplicating existing functions.
23. Add global section search and keyboard shortcut discoverability.
24. Improve topbar spacing for date, language, search, connection, email and account controls.
25. Add compact/comfortable density options with consistent persistence.
26. Improve empty states with explanations and permitted next actions.
27. Add clear loading, retry, stale-data and offline indicators.
28. Keep page toolbars consistent and responsive.
29. Provide useful print layouts for dashboard summaries.
30. Test all navigation states at desktop, tablet and mobile breakpoints.

### Phase 3 — People, finance and welfare (20)
31. Create a unified family profile from existing family/member records without duplicating source data.
32. Show Family ID and family name together in selectors and lookup results.
33. Provide search by family ID, family name, member name and permitted contact fields.
34. Improve family relationship and subfamily navigation.
35. Add clear record verification and last-updated indicators where supported.
36. Improve duplicate warnings while preserving existing backend duplicate checks.
37. Provide family-wise printable summaries with privacy-aware field selection.
38. Improve contribution history and receipt presentation.
39. Improve source-wise income reporting.
40. Improve expenditure vouchers and supporting-document presentation.
41. Add approval/evidence visibility only where existing records and permissions support it.
42. Provide monthly, quarterly and annual financial summaries.
43. Add cash/bank reconciliation workflow only after its data model and approval requirements are reviewed.
44. Clearly distinguish available balance, committed support and restricted funds.
45. Provide public financial summaries that exclude donor and beneficiary personal information.
46. Standardise emergency case status and priority presentation.
47. Improve verification, decision, payment and closure views without changing stored statuses without approval.
48. Improve regular-support schedule and due/paid visibility.
49. Provide authorised beneficiary assistance history.
50. Add export/print controls with role-based privacy safeguards.

### Phase 4 — Governance and documents (15) — IN PROGRESS

Phase 4.0 implementation: Existing Admin-only Governance & Compliance Centre is enhanced in place. Action queue, due-date KPIs and client-side task search/filter reuse existing governanceData records and server actions. No new tabs, fields, APIs or permissions.

51. Create a committee action centre using existing governance task data.
52. Improve compliance calendar and upcoming/overdue presentation.
53. Distinguish mandatory, conditional, recommended and not-applicable requirements.
54. Add applicability rationale and evidence visibility.
55. Improve office-bearer accountability and owner assignment views.
56. Add meeting calendar using an approved existing or separately approved data model.
57. Add agenda and attendance workflows only after schema review.
58. Add minutes and resolution register only after schema review.
59. Link resolutions to accountable tasks and action-taken reporting.
60. Improve governance document categories and search.
61. Improve document version/status/owner/review-date display.
62. Preserve separate view, download and print permissions.
63. Improve document preview and failure recovery.
64. Add expiry/review reminders based on verified metadata.
65. Generate a printable annual governance and activity report from approved data.

### Phase 5 — Public and mobile experience (15)
66. Simplify public portal information architecture.
67. Make public registration mobile-first and accessible.
68. Improve public registration confirmation and duplicate-review messaging.
69. Improve grievance acknowledgement and tracking.
70. Add privacy-safe public status views.
71. Improve suggestions workflow and admin triage.
72. Improve notice and important-day presentation.
73. Improve Odia/English language consistency and text fallback.
74. Test Odia font rendering, line height and wrapping.
75. Improve mobile quick-entry flows without weakening permission checks.
76. Improve touch targets and spacing.
77. Prevent horizontal overflow on small screens.
78. Improve upload progress, retry and file validation feedback.
79. Improve print layouts for public notices and approved reports.
80. Conduct real-user sessions with villagers and committee users.

### Phase 6 — Reliability, security and maintainability (20)
81. Add Playwright smoke tests for login and core navigation in a safe test environment.
82. Add Playwright regression tests for family/member CRUD in a safe test environment.
83. Add finance workflow regression tests using synthetic data.
84. Add welfare workflow regression tests using synthetic data.
85. Add public registration and grievance tests.
86. Add role/permission matrix tests for Admin, Editor and Viewer.
87. Add axe accessibility automation and manual keyboard/screen-reader testing.
88. Add Lighthouse and Core Web Vitals measurement.
89. Test 320, 360, 390, 412, 768 and desktop viewport widths.
90. Add API contract tests without changing production API behaviour.
91. Add safe duplicate-submit and interrupted-save tests.
92. Test offline queue recovery without duplicate writes.
93. Verify backup completeness and restore to an independent test spreadsheet.
94. Document incident response and recovery ownership.
95. Review XSS, injection, file-upload, session and authorization risks.
96. Review data minimisation, retention and export controls.
97. Modularise the large core file only after regression coverage is established.
98. Separate shared UI components from business logic and API services.
99. Remove obsolete CSS/JS only after reference and visual regression checks.
100. Conduct 5–10 structured user sessions and a formal release-quality review.

## 5. Phase exit criteria

- Phase 1: design tokens and navigation work consistently; version/source checks are accurate; no backend/data/auth/permission changes; static checks pass.
- Phase 2: home/navigation workflows are usable at target widths; no misleading or unauthorised data.
- Phase 3: existing people, finance and welfare workflows pass regression with synthetic/test records and verified live smoke tests.
- Phase 4: governance/document workflows preserve document permissions and record integrity.
- Phase 5: public and mobile workflows pass keyboard, screen-reader, responsive and user testing.
- Phase 6: automated tests, backup restoration, security review, performance evidence and user acceptance are recorded.

## 6. Release rules

- Work on a feature branch.
- Inspect the latest main commit before each change.
- Keep changes narrow and reviewable.
- Run static and automated checks before deployment.
- Do not deploy backend changes as part of this frontend programme.
- Do not claim a live test passed unless it was actually performed.
- Merge/deploy only after the phase's acceptance criteria are met.
- Preserve the previous known-good commit for rollback.


## Phase 4.1 — Financial transparency (in review)

A read-only financial-year report is being added to the existing Financial trends & insights section. It derives month-wise totals from the existing Contributions, Income and Expenditure registers; presents Other Income by type and expenditure by category; and reports whether existing Bill/Receipt and Approved By fields are populated.

Controls: contributions and Other Income remain separate; linked welfare assistance is not added again; evidence/approval completeness is not represented as verification; no cash/bank balance or reconciliation is inferred. The report follows existing per-register visibility permissions. No Apps Script endpoint, spreadsheet tab/column, stored record, authentication flow or role policy is changed.

Cash/bank reconciliation, restricted/committed fund accounting and public-facing financial statements remain deferred until source records and approval rules can be verified.


## Phase 4.2 — Public financial disclosure (in review)

The public fund page receives an additional disclosure-basis panel explaining source/date, the register nature of the displayed balance, separate treatment of contribution/income/expenditure/support entries, and privacy exclusions. Admin publication controls now describe aggregate-only financial lines and recent spending descriptions.

Preservation: uses the existing totals-only publicSummary endpoint; does not call bootstrap or add an API, expose new record fields, or alter backend/schema/permissions. It explicitly warns that the displayed register balance is not independently bank-confirmed and that support entries may overlap expenditure. No annual or audited statement is claimed because the public endpoint does not provide date-scoped financial-year aggregates or reconciliation evidence.


## Phase 4.3 — Financial audit-readiness (in review)

Adds read-only financial-year completeness checks using existing fields only: contribution receipt number and payment mode; income received-by and payment mode; expenditure bill/receipt reference, approver, paid-by and payment mode. Results count missing fields by register without displaying transaction-level personal data.

Controls: a populated field is not treated as proof of a genuine receipt or valid approval. Original evidence still requires human verification. The current register schemas do not provide bank statement lines, closing balances or transaction references for automated bank matching; no cash/bank reconciliation is claimed. No new accounting field, API, Apps Script deployment, sheet schema or stored record is introduced.


## Consolidated completion bundle — Phase 4.4 through Phase 6 (in review)

Frontend implementation in this bundle:
- Monthly financial close review table, grouped by financial month, showing contribution/income/expenditure row counts and missing reference counts. It is explicitly a review aid; no close, sign-off or lock is stored because no approved close-register schema exists.
- Keyboard skip links on the authenticated dashboard, public account page and suggestions page; visible focus treatment and reduced-motion support.
- Static regression assertions for the new financial review, privacy/permission boundaries, public submission contract and accessibility hooks.

Still requiring external evidence before these backlog items can be marked complete:
- Cash/bank reconciliation, restricted/committed fund accounting and formal monthly sign-off require approved accounting rules, source documents and a reviewed data model.
- Committee meeting, attendance, minutes and resolution workflows require approved fields and governance decisions.
- Real-device/mobile user sessions, screen-reader and keyboard acceptance, live role-matrix tests, Playwright CRUD/finance/welfare tests, and actual Core Web Vitals measurements require a safe test environment and authorised test accounts.
- Backup restore must be demonstrated against an independent test spreadsheet; no production restore was attempted.
- Security review and modularisation of the large frontend require dedicated test coverage and review; no broad refactor was included in this release.

No Apps Script URL/code, API contract, spreadsheet schema, stored record, authentication flow, permission policy or Drive permission is changed by this bundle. Existing manual acceptance requirements remain open and are not represented as passed by static checks.


## Phase 6.1 — Static security and reliability review (in review)

Scope: read-only inspection of the current frontend source plus CI guardrails. No production API, Apps Script code, spreadsheet, authentication flow or permission rule is modified.

Static review observations:
1. The dashboard login calls the existing JSONP API helper with username and password parameters. This sends the credentials in the HTTPS request URL. HTTPS protects transport, but URLs can be retained in browser/network/proxy logs. This is a security-hardening item requiring a coordinated backend-compatible authentication change; do not change it in the frontend alone.
2. Authenticated API calls append the session token to the JSONP URL. This is also a URL exposure surface. A future POST-based authenticated API transport should be designed and tested with the Apps Script backend, then migrated in a separately approved release.
3. Password recovery already sends the new password in a POST body; a static guard protects that behaviour.
4. The frontend contains role/page visibility checks, but these are not security boundaries. Server-side authorization must be verified independently for every sensitive endpoint. Backend source was not part of this repository review.
5. Legacy persistent private-register cache cleanup is present; the offline queue is moved to session storage. This does not establish that every browser, extension, backup or prior exported copy has been cleared.
6. Dynamic HTML rendering uses escaping in many paths, but this source review is not a complete XSS audit. DOM sink review, malicious input tests and backend output validation remain required.
7. No live credentials, real member records, payment records or production endpoints were exercised during this review.

Added CI checks protect selected existing controls: password-recovery POST transport, legacy private-cache cleanup, authenticated token attachment, idle logout, role-aware routing, admin-only governance/document guards and text-only toast output. Static checks cannot establish backend authorization, secure cookie/token handling, absence of all XSS, or penetration-test readiness.

Open remediation requiring a coordinated backend plan:
- Replace credential-bearing JSONP login and token-bearing JSONP calls with POST transport and server-side token validation without weakening current sessions or Apps Script access controls.
- Audit all Apps Script actions for server-side role and record-level authorization.
- Perform synthetic-data XSS/injection/file-upload tests and independent backup restore.
- Establish test accounts and a non-production spreadsheet for Playwright role, CRUD, finance, welfare, public registration, duplicate-submit and offline-recovery tests.
