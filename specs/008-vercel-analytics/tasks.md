# Tasks: Vercel Analytics Integration

**Input**: Design documents from `/specs/008-vercel-analytics/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, quickstart.md ✓

**Tests**: Not requested - manual verification via Vercel dashboard per plan.md

**Organization**: This feature is minimal - both user stories (page views and Web Vitals) are satisfied by the same Analytics component. Tasks are organized by implementation phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Install the analytics dependency

- [x] T001 Install @vercel/analytics package via `npm install @vercel/analytics`

**Checkpoint**: Package installed and visible in package.json

---

## Phase 2: User Stories 1 & 2 - Analytics Integration (Priority: P1 + P2) 🎯 MVP

**Goal**: Enable automatic page view tracking (US1) and Web Vitals monitoring (US2)

**Note**: Both user stories are implemented by a single component - `<Analytics />` handles page views AND Web Vitals automatically.

**Independent Test (US1)**: Deploy to Vercel, visit the app, verify page view appears in Vercel Analytics dashboard within 24 hours

**Independent Test (US2)**: After deployment, check Vercel Analytics dashboard for Web Vitals metrics (LCP, FID, CLS)

### Implementation

- [x] T002 [US1] [US2] Import Analytics component from @vercel/analytics/react in app/layout.tsx
- [x] T003 [US1] [US2] Add `<Analytics />` component inside `<body>` after `{children}` in app/layout.tsx

**Checkpoint**: Analytics integrated - both user stories satisfied by this single component

---

## Phase 3: Verification

**Purpose**: Validate integration works correctly

- [x] T004 Run `npm run build` to verify no TypeScript errors
- [x] T005 Run `npm run dev` and verify app loads normally in development mode
- [x] T006 Check browser console for any errors related to analytics

**Checkpoint**: Local verification complete - ready for deployment

---

## Phase 4: Deployment & Dashboard Verification

**Purpose**: Verify analytics data flows to Vercel dashboard

- [ ] T007 Ensure Analytics is enabled in Vercel project settings (Project → Analytics → Enable)
- [ ] T008 Deploy to Vercel via git push or manual deploy
- [ ] T009 Visit deployed application to generate page views
- [ ] T010 Verify page views appear in Vercel Analytics dashboard (may take up to 24 hours)
- [ ] T011 Verify Web Vitals (LCP, FID, CLS) appear in dashboard

**Checkpoint**: Feature complete - all success criteria verifiable

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (User Stories)**: Depends on Phase 1 completion
- **Phase 3 (Verification)**: Depends on Phase 2 completion
- **Phase 4 (Deployment)**: Depends on Phase 3 completion

### Task Dependencies Within Phases

```text
T001 (install) → T002 (import) → T003 (add component) → T004-T006 (verify) → T007-T011 (deploy)
```

### Parallel Opportunities

This feature has minimal parallelism due to its small scope:
- T004-T006 can run in parallel (different verification steps)
- T010-T011 can run in parallel (checking different dashboard sections)

---

## Implementation Strategy

### MVP Delivery

1. Complete T001-T003 (install + integrate)
2. Complete T004-T006 (local verification)
3. **STOP and VALIDATE**: App should build and run without errors
4. Complete T007-T011 (deploy and verify dashboard)

### Time Estimate

This is a ~5-10 minute implementation task:
- T001-T003: ~2 minutes (install + 3 lines of code)
- T004-T006: ~2 minutes (build + run + check console)
- T007-T011: Variable (deployment time + waiting for dashboard data)

---

## Files Changed Summary

| File | Change | Task |
|------|--------|------|
| `package.json` | Add @vercel/analytics dependency | T001 |
| `app/layout.tsx` | Import and render Analytics component | T002, T003 |

---

## Success Criteria Mapping

| Success Criteria | Verified By |
|------------------|-------------|
| SC-001: Page views visible in dashboard | T010 |
| SC-002: Web Vitals reported | T011 |
| SC-003: <50ms load time increase | T004, T005 (build succeeds, no slowdown) |
| SC-004: Zero user-facing errors | T005, T006 |
| SC-005: No cookie consent required | Inherent to @vercel/analytics design |

---

## Notes

- Both user stories are satisfied by the same `<Analytics />` component
- No conditional logic needed - Vercel handles dev vs prod automatically
- Dashboard data may take up to 24 hours to appear after first deployment
- Web Vitals requires real user traffic to generate meaningful data
