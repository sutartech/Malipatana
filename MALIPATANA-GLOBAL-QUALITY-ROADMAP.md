# Malipatana Global-Quality Transformation Roadmap

Status: Approved programme; Phase 1 foundation
Baseline branch: main
Working branch: transformation/phase-1-foundation
Date: 2026-11-24
Scope: Full 100-improvement programme
Preservation rule: No backend URL, Apps Script code, spreadsheet schema, existing record, authentication flow, or permission policy may be changed without a separately reviewed and explicitly approved change.

## 1. Programme objectives

Build Malipatana into a dependable village governance and community-management platform with one coherent design system; task-oriented public, committee and administrator experiences; transparent but privacy-preserving financial and welfare workflows; accessible mobile-first interactions; verified security, reliability and recoverability; and a maintainable frontend/release process.

A feature is not complete merely because its code is committed. Completion requires source checks, deployed-version verification, relevant workflow regression and user acceptance.

## 2. Baseline and source/live discrepancy (2026-11-24)

Repository: https://github.com/sutartech/Malipatana
Default branch at inspection: main
Baseline commit: 4270b6dc77bb9c16df045849ffd0b535c888edbd
Latest commit message: "Load FE V3.8.3 collapsible navigation groups"
Current source CONFIG:
- Frontend: FE V3.8.3-COLLAPSIBLE-NAV-GROUPS
- Expected backend: BE V1.8.46-GOVERNANCE-READONLY-DOCUMENTS
index.html loads malipatana-core.js?v=3.8.3-collapsible-nav-groups.
Latest GitHub Pages workflow run for that commit: completed, conclusion success, run 45326506020 at 2026-11-24T04:27:18Z; completed 04:28:04Z.
Screenshot supplied for this task displays FE V3.8.2-SIDEBAR-CASCADE-ISOLATION and BE V1.8.46-GOVERNANCE-READONLY-DOCUMENTS.

Interpretation:
- Screenshot is one frontend patch behind repository source.
- Backend version shown in screenshot matches the expected backend declared in current source.
- GitHub Pages build/deployment workflow succeeded for the V3.8.3 main commit.
- The live page response and browser cache could not be independently fetched in this inspection environment. Therefore the successful workflow is evidence of deployment completion, not proof that every browser has loaded V3.8.3. Verify the visible FE/BE chips in a fresh normal browser session and compare with the source before diagnosing further.
- The V3.8.3 sidebar implementation currently stores collapse state only in an in-memory object and forcibly expands the active page's category whenever buildNav() runs. State is therefore not persistent and can be reset by navigation/rendering. Correct this in Phase 1.
- The sidebar contrast stylesheet targets legacy .navgroup classes, while current generated category headings use .nav-category-bar. Current category inline styles supply much of the visual treatment, but stylesheet targeting must be unified; do not rely on fragile nth-child selectors.
- scripts/verify-static.mjs still expects BE V1.8.30, while current core CONFIG expects BE V1.8.46-GOVERNANCE-READONLY-DOCUMENTS. This is a stale regression assertion and must be corrected to validate a declared backend version without pretending to verify the deployed Apps Script version.
- Existing rollout checklist has unresolved manual checks for OTP, registration pause enforcement, offline queue, duplicate prevention, restore, responsive sizes, Odia, screen reader, Quick Add role access and unchanged workflows.

## 3. Non-negotiable preservation controls

1. Keep the current Apps Script endpoint unchanged.
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

### Phase 2 — Home dashboard and navigation (15)
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

### Phase 4 — Governance and documents (15)
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
