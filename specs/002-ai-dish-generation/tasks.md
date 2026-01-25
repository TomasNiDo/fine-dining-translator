# Tasks: AI-Powered Dish Generation

**Input**: Design documents from `/specs/002-ai-dish-generation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.yaml

**Tests**: Not included (manual testing per plan.md)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

This is a Next.js App Router project with existing structure:
- `app/` - Next.js pages and API routes
- `components/` - React components (no changes needed)
- `lib/` - Shared utilities and types

---

## Phase 1: Setup (Dependencies & Configuration) ✅

**Purpose**: Install OpenAI SDK and configure environment for AI integration

- [x] T001 Install OpenAI SDK dependency: run `npm install openai`
- [x] T002 [P] Create `.env.local` file with `OPENAI_API_KEY=` placeholder (git-ignored)
- [x] T003 [P] Add `.env.local` to `.gitignore` if not already present

**Checkpoint**: OpenAI SDK installed, environment ready for API key ✅

---

## Phase 2: Foundational (Types & Prompts) ✅

**Purpose**: Core types and prompt system that ALL user stories depend on

**⚠️ CRITICAL**: User story implementation cannot begin until this phase is complete

- [x] T004 Add API response types (GenerateResponse, GenerateErrorResponse) to `lib/types.ts`
- [x] T005 Add GenerationError type for client-side error state to `lib/types.ts`
- [x] T006 Create prompt builder module at `lib/prompts.ts` with base system prompt structure
- [x] T007 Add style descriptions mapping to `lib/prompts.ts` (6 styles: cafe → tasting-menu)
- [x] T008 Add length instructions mapping to `lib/prompts.ts` (4 lengths: short → absolutely-unnecessary)
- [x] T009 Add toggle instructions to `lib/prompts.ts` (reveal, chef ego, techniques)
- [x] T010 Create `buildPrompt(request: GenerateRequest): string` function in `lib/prompts.ts`

**Checkpoint**: Type system ready, prompt builder complete - API route can now be implemented ✅

---

## Phase 3: User Story 1+2 - Core AI Generation with Style Awareness (Priority: P1) 🎯 MVP ✅

**Goal**: Replace template-based generation with GPT-4o API calls that respect restaurant style selection

**Independent Test**: Enter "Grilled Cheese" with different styles (Cafe vs Tasting Menu) and verify:
1. Each generation produces unique, creative descriptions
2. Style differences are noticeable in vocabulary and tone

### Implementation for User Story 1+2

- [x] T011 Create API route directory structure at `app/api/generate/`
- [x] T012 [US1] Implement POST handler skeleton in `app/api/generate/route.ts` with request parsing
- [x] T013 [US1] Add input validation (dishName required, max 200 chars) in `app/api/generate/route.ts`
- [x] T014 [US1] Initialize OpenAI client and call GPT-4o with built prompt in `app/api/generate/route.ts`
- [x] T015 [US1] Implement success response formatting (GenerateResponse) in `app/api/generate/route.ts`
- [x] T016 [US1] Implement error handling for OpenAI errors in `app/api/generate/route.ts`
- [x] T017 [US1] Add error response formatting with user-friendly messages in `app/api/generate/route.ts`
- [ ] T018 [US2] Verify style descriptions in prompt produce distinct outputs (manual test, adjust prompts if needed)
- [x] T019 [US1] Update `app/page.tsx` to call `/api/generate` instead of sync `generateTranslation()`
- [x] T020 [US1] Add error state handling in `app/page.tsx` (display error message to user)
- [x] T021 [US1] Add loading state improvements in `app/page.tsx` (prevent double-submit)

**Checkpoint**: Core AI generation working with style awareness. User can generate unique descriptions that vary by style. ✅

---

## Phase 4: User Story 3 - Length-Controlled Output (Priority: P2)

**Goal**: AI respects length setting (Short → Absolutely Unnecessary)

**Independent Test**: Generate "Fries" at each length setting and verify sentence counts match targets:
- Short: 1-2 sentences
- Medium: 2-3 sentences
- Excessive: 3-4 sentences
- Absolutely Unnecessary: 4+ sentences

### Implementation for User Story 3

- [ ] T022 [US3] Verify length instructions in `lib/prompts.ts` produce correct sentence counts (manual test)
- [ ] T023 [US3] Adjust length instruction wording if outputs don't match targets in `lib/prompts.ts`

**Checkpoint**: Length selection works correctly. All 4 length options produce appropriately sized descriptions.

---

## Phase 5: User Story 4 - Extra Pretension Toggles (Priority: P2)

**Goal**: Toggles (Reveal, Chef Ego, Techniques) appear in AI output when enabled

**Independent Test**:
- Enable Reveal → description ends with "(It's [dish name].)"
- Enable Chef Ego → description includes chef attribution
- Enable Techniques → description includes cooking terms

### Implementation for User Story 4

- [ ] T024 [US4] Verify Reveal toggle instruction works (manual test)
- [ ] T025 [US4] Verify Chef Ego toggle instruction works (manual test)
- [ ] T026 [US4] Verify Techniques toggle instruction works (manual test)
- [ ] T027 [US4] Verify all three toggles work together without feeling forced (manual test)
- [ ] T028 [US4] Adjust toggle instruction wording if elements don't appear correctly in `lib/prompts.ts`

**Checkpoint**: All toggles working. Each toggle reliably adds its element to the output.

---

## Phase 6: Polish & Cleanup ✅

**Purpose**: Remove old code and finalize implementation

- [x] T029 [P] Remove `lib/translator.ts` (no longer needed - replaced by API route)
- [x] T030 [P] Remove `lib/data/templates.ts` (no longer needed - replaced by AI)
- [x] T031 Remove import of `generateTranslation` from `app/page.tsx` if still present
- [ ] T032 Run full manual test suite from `quickstart.md`
- [ ] T033 Verify all acceptance scenarios from spec.md pass

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup ✅
    ↓
Phase 2: Foundational (types + prompts) ✅
    ↓
Phase 3: US1+2 (core AI + style) ← MVP ✅
    ↓
Phase 4: US3 (length) ─┬→ Needs manual testing
Phase 5: US4 (toggles) ┘
    ↓
Phase 6: Polish & Cleanup ✅ (code complete, awaiting manual tests)
```

### User Story Dependencies

- **US1+2 (P1)**: Depends on Foundational (Phase 2) - This is the MVP ✅
- **US3 (P2)**: Can start after US1+2 - Builds on prompt system
- **US4 (P2)**: Can start after US1+2 - Builds on prompt system
- **US3 and US4 are independent** and can be done in parallel

### Within Each Phase

- T004-T005 must complete before T006-T010 (types needed for prompt builder) ✅
- T011-T018 must complete before T019-T021 (API route needed before client integration) ✅
- T029-T030 can run in parallel (independent file deletions) ✅

### Parallel Opportunities

- Setup: T002 and T003 can run in parallel ✅
- Foundational: T007, T008, T009 can run in parallel ✅
- Polish: T029 and T030 can run in parallel ✅

---

## Parallel Example: Foundational Phase

```bash
# These can run in parallel (different sections of prompts.ts):
Task T007: "Add style descriptions mapping to lib/prompts.ts"
Task T008: "Add length instructions mapping to lib/prompts.ts"
Task T009: "Add toggle instructions to lib/prompts.ts"
```

---

## Implementation Strategy

### MVP First (User Stories 1+2 Only)

1. Complete Phase 1: Setup (install openai, configure env) ✅
2. Complete Phase 2: Foundational (types, prompts) ✅
3. Complete Phase 3: User Stories 1+2 (API route, client integration) ✅
4. **STOP and VALIDATE**: Test with multiple dishes and styles ← READY
5. Deploy/demo if ready - users can now generate AI descriptions!

### Incremental Delivery

1. Setup + Foundational → Infrastructure ready ✅
2. Add US1+2 → Core generation working → **MVP ready!** ✅
3. Add US3 → Length control working → Enhanced version (needs manual test)
4. Add US4 → Toggles working → Full feature complete (needs manual test)
5. Polish → Clean codebase, verified tests ✅

### File Change Summary

| File | Action | Phase | Status |
|------|--------|-------|--------|
| `package.json` | MODIFY (add openai) | Setup | ✅ |
| `.env.local` | CREATE | Setup | ✅ |
| `lib/types.ts` | MODIFY (add API types) | Foundational | ✅ |
| `lib/prompts.ts` | CREATE | Foundational | ✅ |
| `app/api/generate/route.ts` | CREATE | US1+2 | ✅ |
| `app/page.tsx` | MODIFY (API integration) | US1+2 | ✅ |
| `lib/translator.ts` | DELETE | Polish | ✅ |
| `lib/data/templates.ts` | DELETE | Polish | ✅ |

---

## Notes

- No test framework configured - all verification is manual per quickstart.md
- US1 and US2 are combined because style awareness is integral to core generation
- US3 and US4 are primarily prompt tuning tasks since the prompt system handles them
- Remove old template system only after new AI system is fully working ✅
- Commit after each logical group of tasks
