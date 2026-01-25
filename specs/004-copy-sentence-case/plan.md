# Implementation Plan: Copy Feature & Sentence Case Formatting

**Branch**: `004-copy-sentence-case` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-copy-sentence-case/spec.md`

## Summary

Add a copy-to-clipboard button to the MenuCard component allowing users to copy generated descriptions with one click, and update AI prompts to generate text in sentence case instead of title case for more natural readability.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14 (App Router)
**Primary Dependencies**: React 18, Tailwind CSS, OpenAI SDK (^6.16.0), Lucide React (icons)
**Storage**: N/A (stateless)
**Testing**: ESLint (no test runner configured)
**Target Platform**: Web (modern browsers - Chrome, Firefox, Safari, Edge last 2 versions)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: <2 seconds response time per Constitution, copy feedback <500ms per spec
**Constraints**: Must meet WCAG 2.1 AA (Constitution), mobile-first (≥320px)
**Scale/Scope**: Single-user entertainment app, no persistence

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| I. User Delight | Feature enhances entertainment value | ✅ PASS | Copy enables sharing the fun; sentence case improves readability |
| I. User Delight | UI feels playful and inviting | ✅ PASS | Copy button uses existing design system |
| I. User Delight | Response time <2 seconds | ✅ PASS | Clipboard API is synchronous; no AI call for copy |
| I. User Delight | Error states handled with humor | ✅ PASS | Spec requires graceful error handling |
| II. Simplicity | Simplest approach used | ✅ PASS | Native Clipboard API, no new dependencies |
| II. Simplicity | New dependencies justified | ✅ PASS | No new dependencies required |
| II. Simplicity | Code readable without extensive comments | ✅ PASS | Simple useState for copy state |
| III. Accessibility | WCAG 2.1 AA | ✅ PASS | Button with aria-label, focus states |
| III. Accessibility | Keyboard navigable | ✅ PASS | Button is natively keyboard accessible |
| III. Accessibility | Screen reader compatible | ✅ PASS | aria-live announcement for copy feedback |
| Quality Standards | Mobile-first (≥320px) | ✅ PASS | Button fits mobile viewport |
| Quality Standards | Browser support | ✅ PASS | Clipboard API supported in all target browsers |
| Quality Standards | No silent failures | ✅ PASS | Spec requires visible error message |

**Gate Status**: ✅ PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/004-copy-sentence-case/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API changes)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/
├── layout.tsx           # Root layout
├── page.tsx             # Main page (uses MenuCard)
├── globals.css          # Global styles
└── api/
    └── generate/
        └── route.ts     # AI generation endpoint (prompt changes)

components/
├── MenuCard.tsx         # Target: Add copy button here
├── Header.tsx
├── DishInput.tsx
├── GenerateButton.tsx
├── StyleSelector.tsx
├── LengthSelector.tsx
├── ToggleGroup.tsx
└── ui/
    ├── PillButton.tsx
    └── Toggle.tsx

lib/
├── types.ts             # Type definitions
└── prompts.ts           # Target: Update few-shot examples & instructions
```

**Structure Decision**: Next.js App Router structure maintained. Changes are localized to:
1. `components/MenuCard.tsx` - Add copy button UI and state
2. `lib/prompts.ts` - Update few-shot examples to sentence case

## Complexity Tracking

No complexity violations. Feature uses:
- Native browser APIs (Clipboard API)
- Existing UI patterns (button styling from design system)
- Simple React state (useState for copy feedback)
