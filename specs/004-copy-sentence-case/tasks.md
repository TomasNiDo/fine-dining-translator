# Tasks: Copy Feature & Sentence Case Formatting

**Input**: Design documents from `/specs/004-copy-sentence-case/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Not requested in specification. No test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Next.js App Router
- **Components**: `components/`
- **Library code**: `lib/`
- **API routes**: `app/api/`

---

## Phase 1: Setup

**Purpose**: No setup required - existing project structure is sufficient

This feature modifies existing files only. No new project structure or dependencies needed.

**Checkpoint**: Ready to proceed to user story implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational work required

Both user stories operate on existing infrastructure:
- Copy button: Uses existing `MenuCard` component and React patterns
- Sentence case: Uses existing prompt system in `lib/prompts.ts`

**Checkpoint**: Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Copy Generated Description (Priority: P1) 🎯 MVP

**Goal**: Users can copy the generated fancy description to their clipboard with one click

**Independent Test**: Generate a dish description, click the copy button, paste into any text field to verify the text was copied correctly

### Implementation for User Story 1

- [x] T001 [US1] Add copy state management (idle/copied/error) to components/MenuCard.tsx
- [x] T002 [US1] Implement handleCopy async function with navigator.clipboard.writeText() in components/MenuCard.tsx
- [x] T003 [US1] Add 2-second auto-reset timeout for copy success state in components/MenuCard.tsx
- [x] T004 [US1] Import Copy and Check icons from lucide-react in components/MenuCard.tsx
- [x] T005 [US1] Add copy button UI below description text with icon toggle (Copy/Check) in components/MenuCard.tsx
- [x] T006 [US1] Add aria-label and sr-only text for accessibility in components/MenuCard.tsx
- [x] T007 [US1] Add hover and focus-visible styles for copy button in components/MenuCard.tsx
- [x] T008 [US1] Handle clipboard error state with user-friendly message in components/MenuCard.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional. Users can copy descriptions with visual feedback.

---

## Phase 4: User Story 2 - Sentence Case Formatting (Priority: P2)

**Goal**: Generated descriptions use natural sentence case instead of title case

**Independent Test**: Generate any dish description and verify the output starts with a capital letter but subsequent words are lowercase (except proper nouns)

### Implementation for User Story 2

- [x] T009 [US2] Convert outputWithReveal in first FEW_SHOT_EXAMPLE to sentence case in lib/prompts.ts
- [x] T010 [US2] Convert outputWithoutReveal in first FEW_SHOT_EXAMPLE to sentence case in lib/prompts.ts
- [x] T011 [US2] Convert outputWithReveal in second FEW_SHOT_EXAMPLE to sentence case in lib/prompts.ts
- [x] T012 [US2] Convert outputWithoutReveal in second FEW_SHOT_EXAMPLE to sentence case in lib/prompts.ts
- [x] T013 [US2] Convert outputWithReveal in third FEW_SHOT_EXAMPLE to sentence case in lib/prompts.ts
- [x] T014 [US2] Convert outputWithoutReveal in third FEW_SHOT_EXAMPLE to sentence case in lib/prompts.ts
- [x] T015 [US2] Add sentence case instruction to buildPrompt function guidelines in lib/prompts.ts

**Checkpoint**: At this point, User Story 2 should be complete. New generations use sentence case formatting.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and code quality

- [x] T016 Run npm run lint to verify no linting errors
- [x] T017 Run npm run build to verify production build succeeds
- [ ] T018 Manual verification: Generate 3+ descriptions and verify sentence case output
- [ ] T019 Manual verification: Test copy button on desktop and mobile viewport

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A - no setup needed
- **Foundational (Phase 2)**: N/A - no foundational work needed
- **User Story 1 (Phase 3)**: Can start immediately
- **User Story 2 (Phase 4)**: Can start immediately (independent of US1)
- **Polish (Phase 5)**: Depends on both user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies - works with existing description output
- **User Story 2 (P2)**: No dependencies on US1 - modifies prompts only

### Within User Story 1

Tasks T001-T008 should be done sequentially as they all modify the same file (`MenuCard.tsx`) and build on each other:
1. T001 (state) → T002 (handler) → T003 (timeout) must be sequential
2. T004 (icons) can be done early but is needed for T005
3. T005 (UI) depends on T001-T004
4. T006-T008 (accessibility, styles, errors) depend on T005

### Within User Story 2

Tasks T009-T015 modify the same file (`lib/prompts.ts`):
- T009-T014 (examples) can theoretically be parallel but same file editing is safer sequentially
- T015 (instruction) should be last as it references the examples

### Parallel Opportunities

User stories 1 and 2 are **fully parallelizable** since they modify different files:
- US1: `components/MenuCard.tsx`
- US2: `lib/prompts.ts`

---

## Parallel Example: Both User Stories

```bash
# If working with multiple developers or agents:

# Developer/Agent A works on User Story 1:
Task: "Add copy state management to components/MenuCard.tsx"
Task: "Implement handleCopy with clipboard API in components/MenuCard.tsx"
# ... continues through T008

# Developer/Agent B works on User Story 2 simultaneously:
Task: "Convert first FEW_SHOT_EXAMPLE to sentence case in lib/prompts.ts"
Task: "Convert second FEW_SHOT_EXAMPLE to sentence case in lib/prompts.ts"
# ... continues through T015
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 3: User Story 1 (Copy button)
2. **STOP and VALIDATE**: Test copy functionality independently
3. Deploy/demo if ready - users can immediately benefit from copy feature

### Incremental Delivery

1. Add User Story 1 (Copy) → Test → Deploy/Demo (MVP!)
2. Add User Story 2 (Sentence Case) → Test → Deploy/Demo
3. Each story adds value without breaking the other

### Single Developer Strategy

Since both stories are independent and relatively small:
1. Complete User Story 1 entirely (T001-T008)
2. Verify copy works
3. Complete User Story 2 entirely (T009-T015)
4. Verify sentence case works
5. Complete Polish phase (T016-T019)

---

## Notes

- All tasks in US1 modify `MenuCard.tsx` - work sequentially to avoid conflicts
- All tasks in US2 modify `prompts.ts` - work sequentially to avoid conflicts
- US1 and US2 can run in parallel (different files)
- No test tasks included as not requested in spec
- Commit after each user story completion for clean git history
- Total: 19 tasks (8 for US1, 7 for US2, 4 for Polish)
