# Tasks: Option Tooltips

**Input**: Design documents from `/specs/006-option-tooltips/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: No test framework configured. Manual visual testing only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project structure**: Next.js with `components/`, `lib/` at repository root
- No `src/` directory—files are at root level

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the core Tooltip component and data constants that all user stories depend on

- [x] T001 Add STYLE_TOOLTIPS constant to lib/types.ts with all 6 style descriptions
- [x] T002 [P] Add LENGTH_TOOLTIPS constant to lib/types.ts with all 4 verbosity descriptions
- [x] T003 [P] Add TOGGLE_TOOLTIPS constant to lib/types.ts with all 3 toggle descriptions
- [x] T004 Create Tooltip component in components/ui/Tooltip.tsx with hover/focus/touch support and auto-positioning

**Checkpoint**: ✅ Tooltip infrastructure ready—user story implementation can begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extend existing UI components to accept tooltip props

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Add optional `tooltip` and `tooltipId` props to PillButton interface in components/ui/PillButton.tsx
- [x] T006 Wrap PillButton content in Tooltip when tooltip prop is provided in components/ui/PillButton.tsx
- [x] T007 [P] Add optional `tooltip` and `tooltipId` props to Toggle interface in components/ui/Toggle.tsx
- [x] T008 [P] Wrap Toggle content in Tooltip when tooltip prop is provided in components/ui/Toggle.tsx

**Checkpoint**: ✅ Foundation ready—user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Discover Style Option Meanings (Priority: P1) 🎯 MVP

**Goal**: Users can hover over style options (Cafe, Gastropub, Bistro, Steakhouse, Michelin, Tasting Menu) to see tooltips explaining each style's output tone

**Independent Test**: Hover over each of the 6 style options → tooltip appears with correct descriptive text within 200ms

### Implementation for User Story 1

- [x] T009 [US1] Import STYLE_TOOLTIPS in components/StyleSelector.tsx
- [x] T010 [US1] Pass tooltip={STYLE_TOOLTIPS[style]} and tooltipId={`tooltip-${style}`} to each PillButton in StyleSelector.tsx

**Checkpoint**: ✅ User Story 1 complete—all 6 style options show tooltips on hover

---

## Phase 4: User Story 2 - Understand Verbosity Levels (Priority: P2)

**Goal**: Users can hover over verbosity options (Short, Medium, Excessive, Absolutely Unnecessary) to see tooltips explaining each length's output

**Independent Test**: Hover over each of the 4 verbosity options → tooltip appears with correct length description

### Implementation for User Story 2

- [x] T011 [US2] Import LENGTH_TOOLTIPS in components/LengthSelector.tsx
- [x] T012 [US2] Pass tooltip={LENGTH_TOOLTIPS[length]} and tooltipId={`tooltip-${length}`} to each PillButton in LengthSelector.tsx

**Checkpoint**: ✅ User Story 2 complete—all 4 verbosity options show tooltips on hover

---

## Phase 5: User Story 3 - Learn About Extra Options (Priority: P2)

**Goal**: Users can hover over toggle options (Reveal, Chef Ego, Techniques) to see tooltips explaining each toggle's effect

**Independent Test**: Hover over each of the 3 toggle options → tooltip appears with correct effect description

### Implementation for User Story 3

- [x] T013 [US3] Import TOGGLE_TOOLTIPS in components/ToggleGroup.tsx
- [x] T014 [US3] Pass tooltip={TOGGLE_TOOLTIPS.reveal} and tooltipId="tooltip-reveal" to the Reveal toggle in ToggleGroup.tsx
- [x] T015 [P] [US3] Pass tooltip={TOGGLE_TOOLTIPS.chefEgo} and tooltipId="tooltip-chef-ego" to the Chef Ego toggle in ToggleGroup.tsx
- [x] T016 [P] [US3] Pass tooltip={TOGGLE_TOOLTIPS.techniques} and tooltipId="tooltip-techniques" to the Techniques toggle in ToggleGroup.tsx

**Checkpoint**: ✅ User Story 3 complete—all 3 toggle options show tooltips on hover

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge case handling and visual polish

- [ ] T017 Verify tooltip positioning flips to below when options near viewport top
- [ ] T018 [P] Test tooltip behavior on mobile (tap to show, tap elsewhere to dismiss)
- [ ] T019 [P] Verify no tooltip flickering when rapidly moving between adjacent options
- [ ] T020 Test keyboard navigation (Tab through options, verify tooltips appear on focus)
- [ ] T021 Visual review: Confirm tooltip styling matches pastel aesthetic

**Note**: Phase 6 tasks require manual visual testing in browser.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: ✅ Complete
- **Foundational (Phase 2)**: ✅ Complete
- **User Stories (Phase 3-5)**: ✅ Complete
- **Polish (Phase 6)**: Ready for manual testing

### User Story Dependencies

- **User Story 1 (P1)**: ✅ Complete
- **User Story 2 (P2)**: ✅ Complete
- **User Story 3 (P2)**: ✅ Complete

### Within Each User Story

- Import statement before prop passing
- All PillButton/Toggle modifications within a story can run in parallel

### Parallel Opportunities

- T001, T002, T003 can run in parallel (different constants in same file, but non-conflicting additions)
- T005/T006 and T007/T008 can run in parallel (different files)
- T015, T016 can run in parallel with T014 (different toggle instances)
- All user stories (Phase 3-5) can run in parallel once Phase 2 completes
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: Setup Phase

```bash
# Launch all tooltip constant additions in parallel:
Task: "Add STYLE_TOOLTIPS constant to lib/types.ts"
Task: "Add LENGTH_TOOLTIPS constant to lib/types.ts"
Task: "Add TOGGLE_TOOLTIPS constant to lib/types.ts"
```

## Parallel Example: User Stories

```bash
# After Phase 2 completes, launch all user stories in parallel:
Task: "[US1] Import STYLE_TOOLTIPS in components/StyleSelector.tsx"
Task: "[US2] Import LENGTH_TOOLTIPS in components/LengthSelector.tsx"
Task: "[US3] Import TOGGLE_TOOLTIPS in components/ToggleGroup.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T008)
3. Complete Phase 3: User Story 1 (T009-T010)
4. **STOP and VALIDATE**: Hover over all 6 style options, verify tooltips work
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Tooltip infrastructure ready
2. Add User Story 1 → Test style tooltips → Deploy/Demo (MVP!)
3. Add User Story 2 → Test verbosity tooltips → Deploy/Demo
4. Add User Story 3 → Test toggle tooltips → Deploy/Demo
5. Each story adds value without breaking previous stories

### Single Developer Strategy (Recommended)

Execute in strict order: T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018 → T019 → T020 → T021

---

## Notes

- [P] tasks = different files or non-conflicting changes
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- No test framework—validation is manual visual testing
- Commit after each phase or logical group
- Stop at any checkpoint to validate story independently
