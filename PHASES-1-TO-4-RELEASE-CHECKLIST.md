# Malipatana — Phases 1–4 rollout and acceptance checks
Date: 2026-10-31
Scope: Existing live site, not design-preview.html.

## Phase 1: Stability & safety
- [x] Existing authenticated backend/API retained; no backend URL changed in this phase.
- [x] Current mobile health check and bounded read-only retry retained.
- [x] Existing permission guards, duplicate prompts and offline queue retained.
- [ ] Manually verify sign-in (password and verified-email OTP) on Android Chrome, desktop Chrome and Safari.
- [ ] Verify allow/pause Registration Requests at backend, including paused submission rejection and re-enable.
- [ ] Test offline queue and interrupted saves without duplicate submissions.
- [ ] Confirm backups can be restored to an independent test spreadsheet.

## Phase 2: Visual / mobile interface
- [x] New small, separate CSS stylesheet for consistent focus, touch targets and responsive spacing.
- [x] Kept moving notice board, pause control, existing notice links and yellow/red look.
- [x] Kept bottom tabs and simplified sidebar grouping.
- [x] Added Family + Member to existing Quick Add overlay (same server permission checks).
- [ ] Test small Android screens (320, 360, 390, 412px), larger mobile, tablet and desktop with actual content.
- [ ] Verify Odia labels, focus indicators, text zoom, screen-reader navigation.

## Phase 3: Everyday workflows
- [x] Existing searchable and resizable Family/Member tables retained.
- [x] Existing name/surname duplicate prevention retained.
- [x] Enhanced keyboard dialog focus and return to invoking control.
- [x] Ctrl/Cmd+K targets available search input, otherwise opens the navigation.
- [ ] Test Family/Member create, edit, lookup, filter, column width persistence and printed output.
- [ ] Verify public register.html and key-protected entry.html separately; they are not identical systems.
- [ ] Test Quick Add permission-based visibility for Admin, Editor and Viewer.
- [ ] Confirm finance, welfare, notice board, family tree and reports produce unchanged data.

## Phase 4: Long-term maintenance
- [x] Phase-specific stylesheet separates styling from business logic.
- [x] This checklist defines regression gates before further deployments.
- [ ] Modularize malipatana-core.js (~7.4k lines) into named modules only after regression tests exist.
- [ ] Add automated Playwright/axe/Lighthouse tests in a separate test environment.
- [ ] Performance targets: LCP <=2.5s, INP <=200ms, CLS <=0.1 (75th percentile).
- [ ] Accessibility target WCAG 2.2 AA with manual keyboard and mobile screen-reader checks.
- [ ] Validate backup, restore, audit, access control, security and data-loss behavior.
- [ ] Obtain 5-10 real-user test sessions before any 9.5+/10 usability claim.

## Release gate
A successful GitHub commit is not proof of live operation. Test browser caching and GitHub Pages deployment, then verify real backend responses. Roll back if registrations, access controls, photo upload, or saving fail. Never paste access keys or user details into public GitHub issues.
