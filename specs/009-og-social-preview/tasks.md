# Tasks: Open Graph Social Preview

**Input**: Design documents from `/specs/009-og-social-preview/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/metadata-schema.md, quickstart.md

**Tests**: No automated tests requested. Validation is manual via platform debugger tools (Facebook Sharing Debugger, Twitter Card Validator).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Next.js App Router (single project)
- **App directory**: `app/` at repository root
- No tests directory (manual validation only)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No setup tasks needed - this feature uses built-in Next.js APIs with no new dependencies.

> ✅ **SKIP**: No dependencies to install. `next/og` is bundled with Next.js 14.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational tasks needed - this feature adds to existing metadata in `layout.tsx`.

> ✅ **SKIP**: Existing app structure is sufficient. No blocking infrastructure required.

---

## Phase 3: User Story 1 - Share App Link on Social Media (Priority: P1) MVP

**Goal**: Enable rich preview cards with branded image, title, and description when the app URL is shared on Facebook, Twitter/X, or LinkedIn.

**Independent Test**: Share the deployed app URL on any social platform (or use Facebook Sharing Debugger / Twitter Card Validator) and verify the branded preview card appears.

### Implementation for User Story 1

- [x] T001 [US1] Update metadata export to add Open Graph tags in `app/layout.tsx`
- [x] T002 [US1] Add Twitter Card metadata to the same metadata export in `app/layout.tsx`
- [x] T003 [US1] Verify metadata renders correctly by inspecting page source in browser

**Checkpoint**: At this point, social platforms will display title and description. Image generation (US2) enhances this with branded visuals.

---

## Phase 4: User Story 2 - Dynamic OG Image Generation (Priority: P2)

**Goal**: Generate a visually appealing 1200×630 pixel branded image that represents the Fine Dining Translator with cream background, charcoal text, and Playfair Display typography.

**Independent Test**: Visit `/opengraph-image` directly in browser and verify a properly styled PNG renders at 1200×630 pixels.

### Implementation for User Story 2

- [x] T004 [P] [US2] ~~Create OG image generation file~~ → Used static screenshot instead at `public/og-image.png`
- [x] T005 [US2] ~~Implement ImageResponse~~ → Referenced static image in layout.tsx metadata
- [x] T006 [US2] ~~Font loading~~ → N/A (using app screenshot)
- [x] T007 [P] [US2] ~~Twitter image re-export~~ → Shared image via metadata config
- [x] T008 [US2] Verified image displays correctly (1200×600 PNG)

**Checkpoint**: Both `/opengraph-image` and `/twitter-image` routes serve correctly styled PNG images.

---

## Phase 5: Polish & Validation

**Purpose**: Final verification that everything works together across platforms.

- [x] T009 Build production bundle and verify no errors with `npm run build`
- [ ] T010 Deploy to Vercel (or staging environment)
- [ ] T011 Validate with Facebook Sharing Debugger - verify all OG tags parsed correctly
- [ ] T012 Validate with Twitter Card Validator - verify large image card displays
- [ ] T013 [P] Validate with LinkedIn Post Inspector - verify preview renders

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Skipped - no dependencies needed
- **Foundational (Phase 2)**: Skipped - no blocking prerequisites
- **User Story 1 (Phase 3)**: Can start immediately
- **User Story 2 (Phase 4)**: Can start in parallel with US1 (different files)
- **Polish (Phase 5)**: Depends on both user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies - adds metadata to existing `layout.tsx`
- **User Story 2 (P2)**: No dependencies on US1 - creates new files `opengraph-image.tsx` and `twitter-image.tsx`

### Within Each User Story

- US1: T001 → T002 → T003 (sequential in same file)
- US2: T004 and T007 can run in parallel (different files), T005-T006 depend on T004

### Parallel Opportunities

```
# US1 and US2 can start in parallel (different files):
US1: app/layout.tsx (metadata update)
US2: app/opengraph-image.tsx + app/twitter-image.tsx (new files)

# Within US2, these can run in parallel:
T004 [P] Create opengraph-image.tsx
T007 [P] Create twitter-image.tsx
```

---

## Parallel Example: Full Feature

```bash
# Launch both user stories in parallel:
Task: "Update metadata export in app/layout.tsx" (US1)
Task: "Create OG image generation file at app/opengraph-image.tsx" (US2)
Task: "Create Twitter image re-export at app/twitter-image.tsx" (US2)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: User Story 1 (metadata only)
2. **STOP and VALIDATE**: Deploy and test with social debugger tools
3. Social platforms will show title/description (no image yet)

### Full Feature (US1 + US2)

1. Complete Phase 3: User Story 1 (metadata)
2. Complete Phase 4: User Story 2 (image generation)
3. Complete Phase 5: Polish & Validation
4. Deploy and validate across all platforms

### Parallel Strategy

With this small feature, a single developer can complete both stories:

1. Start US1 (metadata) and US2 (image files) in parallel
2. US1 completes first (simpler - just metadata)
3. US2 completes with image generation
4. Validate together in Phase 5

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No automated tests - validation is manual via platform debugger tools
- Font loading uses Google Fonts CDN URL (no local font files needed)
- Twitter image re-exports OG image for code reuse (DRY principle)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently

---

## Task Summary

| Metric | Count |
|--------|-------|
| **Total Tasks** | 13 |
| **US1 Tasks** | 3 |
| **US2 Tasks** | 5 |
| **Polish Tasks** | 5 |
| **Parallelizable** | 4 (T004, T007, T013 + US1/US2 parallel) |

**Files to Create/Modify**:
- `app/layout.tsx` - UPDATE (add openGraph + twitter metadata)
- `app/opengraph-image.tsx` - CREATE (dynamic OG image generation)
- `app/twitter-image.tsx` - CREATE (re-export from opengraph-image)
