# Tasks: Few-Shot Prompt Examples

**Input**: Design documents from `/specs/003-few-shot-prompts/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested - manual UI testing per quickstart.md

**Organization**: This feature is unique - all 3 user stories are satisfied by the same code change (adding few-shot examples). Tasks are organized to implement once, then verify each story's acceptance criteria.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: No setup needed - project already initialized with all dependencies

- [x] T001 Verify dev environment works by running `npm run dev` and confirming app loads

**Checkpoint**: Dev server running, ready for implementation

---

## Phase 2: Foundational

**Purpose**: No foundational changes needed - existing `lib/prompts.ts` structure supports modification

- [x] T002 Read current `lib/prompts.ts` to understand existing `buildPrompt()` function structure

**Checkpoint**: Understand current prompt structure, ready for implementation

---

## Phase 3: User Story 1 - Comedic Reveal Pattern (Priority: P1) 🎯 MVP

**Goal**: AI generates descriptions that withhold dish name until the reveal, using pretentious vocabulary throughout

**Independent Test**: Enter "corned beef" with Tasting Menu style and Excessive length. Output should avoid "corned" and "beef" until the final reveal phrase.

### Implementation for User Story 1

- [x] T003 [US1] Add `FewShotExample` interface to `lib/prompts.ts` with fields: dish, style, length, output
- [x] T004 [US1] Add `FEW_SHOT_EXAMPLES` constant array with 3 examples in `lib/prompts.ts`:
  - Grilled cheese (bistro, excessive): "Butter-Lacquered Rustic Bread Duo, Melted Dairy Embrace, Pan-Coaxed to Golden Confidence, With the Humble Reveal: grilled cheese"
  - Tuna salad (cafe, medium): "Oceanic Protein Folded with Creamy Brightness, Herb-Flecked and Leisurely Seasoned, Served with the Truth: tuna salad"
  - Corned beef (tasting-menu, excessive): "Pink-Salt Brined Heritage Protein, Peppercorn-Lifted and Bay-Leaf Haunted, Slow-Submerged Until It Softens Emotionally, Then the Reveal: corned beef"
- [x] T005 [US1] Add `buildFewShotSection()` helper function in `lib/prompts.ts` that formats examples as Input/Output pairs
- [x] T006 [US1] Update `buildPrompt()` in `lib/prompts.ts` to insert few-shot section between toggle instructions and final dish transformation

### Verification for User Story 1

- [ ] T007 [US1] Manual test: Generate "corned beef" (Tasting Menu, Excessive) - verify no "corned"/"beef" until reveal
- [ ] T008 [US1] Manual test: Generate "grilled cheese" (Bistro, Excessive) - verify pretentious vocabulary and reveal structure

**Checkpoint**: Core joke pattern works - descriptions withhold dish name until reveal

---

## Phase 4: User Story 2 - Consistent Humor Across Styles (Priority: P2)

**Goal**: Different restaurant styles maintain the joke pattern with appropriate vocabulary intensity

**Independent Test**: Generate "hot dog" across Café, Bistro, and Tasting Menu styles - all should follow joke structure

### Verification for User Story 2

- [ ] T009 [US2] Manual test: Generate "hot dog" (Café, Medium) - verify casual-but-pretentious vocabulary with reveal
- [ ] T010 [US2] Manual test: Generate "hot dog" (Tasting Menu, Excessive) - verify maximum absurdity with reveal

**Checkpoint**: Joke pattern works across all styles with appropriate tone variation

---

## Phase 5: User Story 3 - Length-Appropriate Guidance (Priority: P3)

**Goal**: Shorter lengths get punchy reveals, longer lengths get elaborate buildups

**Independent Test**: Generate "PB&J" at Short vs Excessive length - both have reveal but different buildup intensity

### Verification for User Story 3

- [ ] T011 [US3] Manual test: Generate "PB&J" (Café, Short) - verify 1-2 sentences with quick reveal
- [ ] T012 [US3] Manual test: Generate "PB&J" (Tasting Menu, Excessive) - verify 3-4 sentences with elaborate buildup

**Checkpoint**: Length parameter properly affects buildup while maintaining reveal structure

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and edge case testing

- [ ] T013 Verify response time remains under 2 seconds (constitution requirement)
- [ ] T014 Edge case test: Generate "foie gras" - verify pretentious treatment even for fancy dish names
- [ ] T015 Edge case test: Generate "eggs" (Short) - verify single-word dishes work correctly
- [ ] T016 Run quickstart.md success verification checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verify environment
- **Foundational (Phase 2)**: Depends on Setup - read existing code
- **User Story 1 (Phase 3)**: Depends on Foundational - implement all code changes
- **User Stories 2-3 (Phases 4-5)**: Depend on US1 - verification only (no new code)
- **Polish (Phase 6)**: Depends on all stories complete

### Task Dependencies Within US1

```
T003 (interface) ─┐
                  ├─→ T005 (helper) ─→ T006 (integration) ─→ T007-T008 (verify)
T004 (examples) ──┘
```

### Parallel Opportunities

- T003 and T004 can run in parallel (different code sections)
- All verification tasks (T007-T012) can run in parallel after T006 completes
- Edge case tests (T014-T015) can run in parallel

---

## Parallel Example: Implementation

```bash
# These can run in parallel (different sections of same file):
Task: "Add FewShotExample interface to lib/prompts.ts"
Task: "Add FEW_SHOT_EXAMPLES constant array to lib/prompts.ts"

# After implementation, all verification can run in parallel:
Task: "Manual test: corned beef"
Task: "Manual test: grilled cheese"
Task: "Manual test: hot dog (Café)"
Task: "Manual test: hot dog (Tasting Menu)"
Task: "Manual test: PB&J (Short)"
Task: "Manual test: PB&J (Excessive)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001-T002 (Setup + Foundational)
2. Complete T003-T006 (Implementation)
3. Complete T007-T008 (Verify US1)
4. **STOP and VALIDATE**: Core joke pattern should work
5. Can ship/demo at this point

### Full Feature

1. Complete MVP (US1)
2. Run US2 verification (T009-T010) - no new code needed
3. Run US3 verification (T011-T012) - no new code needed
4. Run polish tasks (T013-T016)
5. Feature complete

---

## Notes

- This feature is unusually simple: 4 implementation tasks, rest is verification
- All user stories share the same code - implemented once in US1, verified separately
- Only file modified: `lib/prompts.ts`
- Rollback is trivial: revert single file
- No new dependencies, no API changes, no data model changes
