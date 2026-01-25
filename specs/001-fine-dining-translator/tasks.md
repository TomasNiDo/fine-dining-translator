# Tasks: Fine Dining Translator

**Input**: Design documents from `/specs/001-fine-dining-translator/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not requested - omitted from task list

**Organization**: Tasks grouped by user story for independent implementation and testing

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3, US4, US5)
- Paths follow Next.js 14 App Router structure from plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Next.js 14 project initialization and Tailwind configuration

- [X] T001 Initialize Next.js 14 project with TypeScript, Tailwind, ESLint, App Router via create-next-app
- [X] T002 Install lucide-react dependency
- [X] T003 [P] Configure custom colors in tailwind.config.ts (cream, charcoal, mint, blush, butter)
- [X] T004 [P] Configure custom fonts in tailwind.config.ts (heading: Playfair Display, body: Inter)
- [X] T005 Setup fonts in app/layout.tsx with next/font/google
- [X] T006 [P] Add custom utility classes in app/globals.css (pill-button, card, menu-card, border-3)
- [X] T007 Create directory structure: components/, components/ui/, lib/, lib/data/

**Checkpoint**: Project runs with `npm run dev`, custom colors and fonts visible

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: TypeScript types and translation engine that ALL user stories depend on

**WARNING**: No user story work can begin until this phase is complete

- [X] T008 Create TypeScript types and enums in lib/types.ts (RestaurantStyle, DescriptionLength, TranslatorOptions, TranslationRequest, TranslationResult)
- [X] T009 Create translation templates for all 6 styles in lib/data/templates.ts (3-5 patterns per style with extensions and techniques)
- [X] T010 Implement generateTranslation function in lib/translator.ts (template selection, interpolation, length handling, toggle modifiers)
- [X] T011 [P] Create reusable PillButton component in components/ui/PillButton.tsx (radio button with visual styling)
- [X] T012 [P] Create reusable Toggle component in components/ui/Toggle.tsx (checkbox with custom styling)

**Checkpoint**: Foundation ready - can import types and call generateTranslation() with any options

---

## Phase 3: User Story 1 - Generate Basic Menu Translation (Priority: P1) MVP

**Goal**: User enters dish name, clicks generate, sees pretentious translation

**Independent Test**: Enter "Grilled Cheese", click generate, see humorous menu description appear

### Implementation for User Story 1

- [X] T013 [P] [US1] Create Header component in components/Header.tsx (title + subtitle with Playfair Display font)
- [X] T014 [P] [US1] Create DishInput component in components/DishInput.tsx (text input with placeholder, validation)
- [X] T015 [P] [US1] Create GenerateButton component in components/GenerateButton.tsx (button with disabled state)
- [X] T016 [P] [US1] Create MenuCard component in components/MenuCard.tsx (decorative output container with serif font)
- [X] T017 [US1] Compose main page in app/page.tsx with 'use client', useState for dishName, options, result, isGenerating
- [X] T018 [US1] Wire handleGenerate function in app/page.tsx (validate input, call generateTranslation, update result state)
- [X] T019 [US1] Add empty state handling in app/page.tsx (show friendly prompt when no dish name entered)

**Checkpoint**: Can enter dish, click generate, see translation - MVP complete

---

## Phase 4: User Story 2 - Customize Translation Style (Priority: P2)

**Goal**: User selects restaurant style from pill buttons, translation tone changes

**Independent Test**: Select "Michelin" for "Pizza", verify upscale language; switch to "Cafe", verify casual tone

### Implementation for User Story 2

- [X] T020 [US2] Create StyleSelector component in components/StyleSelector.tsx (fieldset with 6 radio pill buttons, horizontal scroll)
- [X] T021 [US2] Add style state management to app/page.tsx (connect StyleSelector to options.style)
- [X] T022 [US2] Verify style templates produce distinct outputs in lib/data/templates.ts (refine if needed)

**Checkpoint**: Style pills visible, selection changes translation tone

---

## Phase 5: User Story 3 - Adjust Translation Length (Priority: P2)

**Goal**: User selects description length, output verbosity changes

**Independent Test**: Set "Absolutely Unnecessary" for "Burger", verify 4+ sentence output; set "Short", verify 1-2 sentences

### Implementation for User Story 3

- [X] T023 [US3] Create LengthSelector component in components/LengthSelector.tsx (fieldset with 4 radio pill buttons)
- [X] T024 [US3] Add length state management to app/page.tsx (connect LengthSelector to options.length)
- [X] T025 [US3] Verify length logic in lib/translator.ts produces correct sentence counts (refine templates if needed)

**Checkpoint**: Length pills visible, selection changes output verbosity

---

## Phase 6: User Story 4 - Apply Humor Toggles (Priority: P3)

**Goal**: User enables toggles to add reveal, chef ego, or technique words to translation

**Independent Test**: Enable "Add the reveal" for "Tacos", verify output ends with "(It's Tacos)"

### Implementation for User Story 4

- [X] T026 [US4] Create ToggleGroup component in components/ToggleGroup.tsx (three Toggle switches with labels)
- [X] T027 [US4] Add toggle state management to app/page.tsx (connect ToggleGroup to options.addReveal, addChefEgo, addTechniques)
- [X] T028 [US4] Implement addReveal modifier in lib/translator.ts (append "(It's [dish])" when enabled)
- [X] T029 [US4] Implement addChefEgo modifier in lib/translator.ts (add chef attribution phrase when enabled)
- [X] T030 [US4] Implement addTechniques modifier in lib/translator.ts (inject technique words when enabled)

**Checkpoint**: Toggles visible and functional, each modifier applies correctly

---

## Phase 7: User Story 5 - View Loading State (Priority: P3)

**Goal**: User sees "Consulting the Sommelier..." during generation for playful feedback

**Independent Test**: Click generate, observe button text changes briefly, returns to normal after result

### Implementation for User Story 5

- [X] T031 [US5] Add loading text swap to GenerateButton component in components/GenerateButton.tsx (show "Consulting the Sommelier..." when isLoading)
- [X] T032 [US5] Add simulated delay (300ms) to handleGenerate in app/page.tsx for perceived "thinking"
- [X] T033 [US5] Add aria-busy attribute to MenuCard output region during loading

**Checkpoint**: Loading state visible, adds to playful UX

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Responsive design, accessibility, and final quality pass

- [X] T034 [P] Add responsive styles to app/page.tsx (centered max-w-2xl on desktop, full-width on mobile)
- [X] T035 [P] Add keyboard focus styles to all interactive elements (visible focus ring per WCAG 2.4.7)
- [X] T036 [P] Verify color contrast meets WCAG 2.1 AA (#333333 on #FFFDF5, #333333 on #C1E1C1)
- [X] T037 Test screen reader experience (verify form labels, aria attributes, result announcement)
- [X] T038 [P] Add hover states to PillButton and GenerateButton components
- [X] T039 [P] Add favicon.ico to public/ directory
- [X] T040 Validate quickstart.md checklist (npm run dev, fonts load, colors visible)
- [X] T041 Manual testing: generate 5 different translations with varied settings

**Checkpoint**: Production-ready, accessible, responsive

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 - BLOCKS all user stories
- **Phase 3-7 (User Stories)**: All depend on Phase 2 completion
- **Phase 8 (Polish)**: Depends on desired user stories being complete

### User Story Dependencies

| Story | Depends On | Can Start After |
|-------|------------|-----------------|
| US1 (P1) | Phase 2 | Phase 2 complete |
| US2 (P2) | Phase 2, uses US1 page structure | Phase 2 complete (can parallel with US1) |
| US3 (P2) | Phase 2, uses US1 page structure | Phase 2 complete (can parallel with US1) |
| US4 (P3) | Phase 2, uses US1 translator | Phase 2 complete |
| US5 (P3) | US1 (needs GenerateButton) | US1 T015 complete |

### Within Each User Story

- Components marked [P] can be built in parallel
- State management tasks (T017, T018, T021, T024, T027) must follow component creation
- Translator refinements follow component integration

### Parallel Opportunities

**Phase 1 (3 parallel tracks)**:
```
Track A: T003, T006 (Tailwind config + CSS)
Track B: T004, T005 (Font config + layout)
Track C: T007 (Directory structure)
```

**Phase 2 (2 parallel tracks after T008)**:
```
Track A: T011 (PillButton)
Track B: T012 (Toggle)
```

**Phase 3 (4 parallel components)**:
```
T013 (Header), T014 (DishInput), T015 (GenerateButton), T016 (MenuCard)
```

---

## Parallel Example: User Story 1

```bash
# Launch all components in parallel:
Task: "Create Header component in components/Header.tsx"
Task: "Create DishInput component in components/DishInput.tsx"
Task: "Create GenerateButton component in components/GenerateButton.tsx"
Task: "Create MenuCard component in components/MenuCard.tsx"

# Then wire up the page (sequential):
Task: "Compose main page in app/page.tsx"
Task: "Wire handleGenerate function in app/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (7 tasks)
2. Complete Phase 2: Foundational (5 tasks)
3. Complete Phase 3: User Story 1 (7 tasks)
4. **STOP and VALIDATE**: Enter dish name, generate, see result
5. Total MVP: 19 tasks

### Incremental Delivery

| Milestone | Tasks | Cumulative | Delivers |
|-----------|-------|------------|----------|
| Setup | T001-T007 | 7 | Project runs |
| Foundation | T008-T012 | 12 | Types + translator ready |
| US1 (MVP) | T013-T019 | 19 | Core translation works |
| US2 | T020-T022 | 22 | Style selection |
| US3 | T023-T025 | 25 | Length selection |
| US4 | T026-T030 | 30 | Humor toggles |
| US5 | T031-T033 | 33 | Loading state |
| Polish | T034-T041 | 41 | Production ready |

### Recommended Approach

1. **Sprint 1**: Setup + Foundational + US1 = MVP demo
2. **Sprint 2**: US2 + US3 (both P2, can parallel)
3. **Sprint 3**: US4 + US5 + Polish

---

## Notes

- [P] tasks work on different files with no dependencies
- [US#] label maps task to spec.md user story
- Commit after each task or logical group
- Stop at any checkpoint to validate independently
- Templates in lib/data/templates.ts are the "humor engine" - invest time here for quality output
