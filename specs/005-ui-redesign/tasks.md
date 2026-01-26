# Tasks: UI Redesign - Playful Fine Dining Aesthetic

**Input**: Design documents from `/specs/005-ui-redesign/`
**Prerequisites**: plan.md, spec.md, research.md
**Design Reference**: `/design/ab-test/variant-f.html`

**Tests**: Not requested - manual visual verification against design mockup

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Color System)

**Purpose**: Update Tailwind configuration with new color palette from variant-f

- [x] T001 Update color palette in tailwind.config.ts - add cream-light, mint-light, pink-blob, blue-stroke, purple-btn, purple-btn-light, butter-light, toggle-pink, tan-outline colors
- [x] T002 Update existing cream color from #FDF6E3 to #F5F0E6 in tailwind.config.ts
- [x] T003 Update existing mint color from #B8D4B8 to #A8E6CF in tailwind.config.ts
- [x] T004 Update existing butter color from #F5E6A3 to #FFE66D in tailwind.config.ts

**Checkpoint**: Color system ready - component updates can now begin

---

## Phase 2: User Story 1 - Visual Refresh with Playful Theme (Priority: P1) 🎯 MVP

**Goal**: Create whimsical, playful interface with pastel colors, decorative food illustrations, and warm cream background

**Independent Test**: Load page and verify background color matches #F5F0E6, decorative illustrations visible around edges, overall color scheme matches variant-f.html

### Implementation for User Story 1

- [x] T005 [P] [US1] Update Header.tsx - adjust font size to 2.5rem mobile / 3rem desktop, ensure charcoal color
- [x] T006 [US1] Rewrite Decorations.tsx - add large pink blob SVG positioned top-left corner in components/Decorations.tsx
- [x] T007 [US1] Add large mint blob SVG positioned left side in components/Decorations.tsx
- [x] T008 [US1] Add mint blob SVG positioned bottom-center-left in components/Decorations.tsx
- [x] T009 [US1] Add peach/coral blob SVG positioned top-right area in components/Decorations.tsx
- [x] T010 [US1] Add pink blob SVG positioned bottom-right in components/Decorations.tsx
- [x] T011 [US1] Add blue curved stroke SVG positioned right side in components/Decorations.tsx
- [x] T012 [US1] Add cake slice line-art SVG (tan outline #C4A77D) positioned top-left in components/Decorations.tsx
- [x] T013 [P] [US1] Add croissant line-art SVG positioned top-left area in components/Decorations.tsx
- [x] T014 [P] [US1] Add garlic line-art SVG positioned left side in components/Decorations.tsx
- [x] T015 [P] [US1] Add plate with food line-art SVG positioned left side in components/Decorations.tsx
- [x] T016 [P] [US1] Add pie/tart line-art SVG positioned bottom-left in components/Decorations.tsx
- [x] T017 [P] [US1] Add taco line-art SVG positioned bottom-left in components/Decorations.tsx
- [x] T018 [P] [US1] Add hot dog/baguette line-art SVG positioned right side in components/Decorations.tsx
- [x] T019 [P] [US1] Add pizza slice line-art SVG positioned bottom-right in components/Decorations.tsx
- [x] T020 [P] [US1] Add bread line-art SVG positioned right side lower in components/Decorations.tsx
- [x] T021 [P] [US1] Add whisk line-art SVG positioned bottom center in components/Decorations.tsx
- [x] T022 [US1] Add responsive behavior - hide/minimize decorations on mobile (<768px) in components/Decorations.tsx
- [x] T023 [US1] Verify page background uses cream color (#F5F0E6) in app/globals.css or layout

**Checkpoint**: User Story 1 complete - page displays playful theme with all decorations

---

## Phase 3: User Story 2 - Redesigned Input and Controls (Priority: P2)

**Goal**: Update form controls with rounded pill-shaped styling, pastel accents, and playful aesthetic

**Independent Test**: Interact with input field, selector buttons, toggles, and Generate button - verify all match variant-f styling

### Implementation for User Story 2

- [x] T024 [US2] Update DishInput.tsx - add mint (#A8E6CF) background to input section with 3px charcoal border
- [x] T025 [US2] Add utensil icon box with cream-light background and tan icon color in components/DishInput.tsx
- [x] T026 [US2] Update input field styling - rounded-full border, charcoal border, white background in components/DishInput.tsx
- [x] T027 [P] [US2] Create ChefHatIcon component or use inline SVG for chef hat decoration in components/ui/ChefHatIcon.tsx
- [x] T028 [US2] Update StyleSelector.tsx - add chef hat icons before establishment pills
- [x] T029 [US2] Update establishment pill styling - white bg, charcoal border, butter (#FFE66D) when selected in components/StyleSelector.tsx
- [x] T030 [US2] Style "Tasting Menu (unhinged)" pill with butter background and dropdown arrow in components/StyleSelector.tsx
- [x] T031 [P] [US2] Update LengthSelector.tsx - white pills with charcoal border styling
- [x] T032 [US2] Update ToggleGroup.tsx - add variant prop for background colors (mint/pink/butter)
- [x] T033 [US2] Style first toggle box with mint-light background (#C5F0DC) in components/ToggleGroup.tsx
- [x] T034 [US2] Style second toggle box with toggle-pink background (#FFCDD2) in components/ToggleGroup.tsx
- [x] T035 [US2] Style third toggle box with butter-light background (#FFF3B0) in components/ToggleGroup.tsx
- [x] T036 [US2] Add chef hat icons positioned top-right of each toggle box in components/ToggleGroup.tsx
- [x] T037 [US2] Update Toggle.tsx track color to toggle-pink (#FFCDD2) when active in components/ui/Toggle.tsx
- [x] T038 [US2] Update GenerateButton.tsx - change to purple/blue gradient (linear-gradient from #8B7DB5 to #6B5B95 to #5A4A84)
- [x] T039 [US2] Add 3D button effect with box-shadow (0 4px 0 #4A3A74) and inset highlight in components/GenerateButton.tsx
- [x] T040 [US2] Update button text to white, use Playfair Display font in components/GenerateButton.tsx

**Checkpoint**: User Story 2 complete - all form controls have playful styling

---

## Phase 4: User Story 3 - Redesigned Result Card (Priority: P3)

**Goal**: Display results in elegant "Menu" card with decorative border, corner flourishes, and sophisticated typography

**Independent Test**: Generate any dish description and verify Menu card matches variant-f design

### Implementation for User Story 3

- [x] T041 [US3] Update MenuCard.tsx outer container - cream-light background, charcoal border, rounded corners
- [x] T042 [US3] Add inner card with white background and tan (#8B7355) decorative border in components/MenuCard.tsx
- [x] T043 [US3] Create CornerFlourish component - star/diamond SVG with #8B7355 fill in components/MenuCard.tsx
- [x] T044 [US3] Position corner flourishes - top-left, top-right (-scale-x), bottom-left (-scale-y), bottom-right (-scale-both) in components/MenuCard.tsx
- [x] T045 [US3] Update "Menu" title typography - Playfair Display, 1.5rem, centered in components/MenuCard.tsx
- [x] T046 [US3] Update description text styling - centered, #444 color, 1.7 line-height in components/MenuCard.tsx
- [x] T047 [US3] Style reveal text - italic, #666 color, smaller font in components/MenuCard.tsx
- [x] T048 [US3] Add whisk decoration SVG at bottom of menu card (tan-outline color) in components/MenuCard.tsx

**Checkpoint**: User Story 3 complete - result card displays with elegant menu styling

---

## Phase 5: User Story 4 - Footer with Playful Links (Priority: P4)

**Goal**: Display footer with playful links and whimsical copyright notice

**Independent Test**: View footer and verify links and copyright text match variant-f styling

### Implementation for User Story 4

- [x] T049 [US4] Update Footer.tsx layout - flex justify-between, proper spacing
- [x] T050 [US4] Style "About the Chef 👨‍🍳" link with charcoal color, no underline by default in components/Footer.tsx
- [x] T051 [US4] Style "Donate to the Ego Fund 👑" link with charcoal color in components/Footer.tsx
- [x] T052 [US4] Update copyright text to "© Copyright fine winking this too. 😊" with #666 color in components/Footer.tsx

**Checkpoint**: User Story 4 complete - footer displays with playful personality

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and responsive behavior

- [ ] T053 Verify all colors match variant-f.html exactly using browser dev tools comparison
- [ ] T054 Test responsive behavior at 320px - verify decorations hide/minimize appropriately
- [ ] T055 Test responsive behavior at 768px - verify tablet layout works
- [ ] T056 Test responsive behavior at 1280px+ - verify full desktop layout with all decorations
- [ ] T057 Verify WCAG AA color contrast for all interactive text (run contrast checker)
- [ ] T058 Cross-browser test in Chrome, Firefox, Safari, Edge (last 2 versions)
- [x] T059 Performance check - verify total decoration SVG size under 500KB
- [x] T060 Run ESLint and fix any issues: npm run lint
- [ ] T061 Manual visual comparison - open variant-f.html and localhost:3000 side by side

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **User Story 1 (Phase 2)**: Depends on Setup (colors must be available)
- **User Story 2 (Phase 3)**: Depends on Setup (colors must be available)
- **User Story 3 (Phase 4)**: Depends on Setup (colors must be available)
- **User Story 4 (Phase 5)**: Depends on Setup (colors must be available)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - can start after Setup
- **User Story 2 (P2)**: Independent - can start after Setup
- **User Story 3 (P3)**: Independent - can start after Setup
- **User Story 4 (P4)**: Independent - can start after Setup

### Within Each User Story

- Decorations.tsx tasks (T006-T022) should be done sequentially to avoid merge conflicts
- Line art SVGs (T013-T021) marked [P] can be done in parallel as they're separate elements
- Toggle tasks (T032-T037) should be done sequentially within ToggleGroup
- Component-specific tasks in different files can run in parallel

### Parallel Opportunities

- **Setup**: T002, T003, T004 can run in parallel (same file but independent color entries)
- **US1 Line Art**: T013-T021 can all run in parallel
- **US2 Components**: T027 (ChefHatIcon), T031 (LengthSelector) can run parallel with DishInput tasks
- **Cross-Story**: US1, US2, US3, US4 can be worked on in parallel by different developers (after Setup)

---

## Parallel Example: User Story 1 Line Art SVGs

```bash
# Launch all line art SVGs together (all marked [P], different elements):
Task: "Add croissant line-art SVG in components/Decorations.tsx"
Task: "Add garlic line-art SVG in components/Decorations.tsx"
Task: "Add plate with food line-art SVG in components/Decorations.tsx"
Task: "Add pie/tart line-art SVG in components/Decorations.tsx"
Task: "Add taco line-art SVG in components/Decorations.tsx"
Task: "Add hot dog line-art SVG in components/Decorations.tsx"
Task: "Add pizza slice line-art SVG in components/Decorations.tsx"
Task: "Add bread line-art SVG in components/Decorations.tsx"
Task: "Add whisk line-art SVG in components/Decorations.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (colors)
2. Complete Phase 2: User Story 1 (decorations + theme)
3. **STOP and VALIDATE**: Compare against variant-f.html
4. Deploy/demo if visual impact is sufficient

### Incremental Delivery

1. Setup → Colors ready
2. Add User Story 1 → Visual theme established → Deploy/Demo (MVP!)
3. Add User Story 2 → Controls updated → Deploy/Demo
4. Add User Story 3 → Result card styled → Deploy/Demo
5. Add User Story 4 → Footer complete → Deploy/Demo
6. Polish → Final verification → Production ready

### Single Developer Strategy

Work in priority order:
1. Setup (T001-T004)
2. US1: All decorations (T005-T023)
3. US2: All controls (T024-T040)
4. US3: Menu card (T041-T048)
5. US4: Footer (T049-T052)
6. Polish (T053-T061)

---

## Notes

- Design reference: `/design/ab-test/variant-f.html` - open in browser for visual comparison
- All colors from research.md section 1 (Color Palette Migration)
- All SVG paths from variant-f.html - copy directly
- [P] tasks = different elements in same file, can be done in parallel
- Commit after each completed component or logical group
- Run `npm run dev` to preview changes at http://localhost:3000
