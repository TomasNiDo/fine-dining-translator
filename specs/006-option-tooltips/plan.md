# Implementation Plan: Option Tooltips

**Branch**: `006-option-tooltips` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-option-tooltips/spec.md`

## Summary

Add informative tooltips to all user-configurable options (6 restaurant styles, 4 verbosity levels, 3 toggle modifiers) to help users understand what each choice produces before selecting. The implementation will use a lightweight custom Tooltip component that integrates with existing PillButton and Toggle components while maintaining the playful pastel aesthetic.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14 (App Router)
**Primary Dependencies**: React 18, Tailwind CSS 3.4.1, Lucide React (icons)
**Storage**: N/A (stateless - tooltip content is static)
**Testing**: Manual visual testing (existing project has no test framework configured)
**Target Platform**: Web (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Web application (Next.js)
**Performance Goals**: Tooltip appears in <200ms, disappears in <150ms (per spec)
**Constraints**: Mobile-first (≥320px), WCAG 2.1 AA compliance
**Scale/Scope**: 13 tooltip instances across 3 components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| **I. User Delight** | Feature enhances entertainment value | ✅ PASS | Tooltips with playful copy help users understand options and discover humor potential |
| **I. User Delight** | UI feels playful and inviting | ✅ PASS | Tooltip styling will match pastel aesthetic |
| **I. User Delight** | Response time <2s | ✅ PASS | Tooltip appears in <200ms |
| **II. Simplicity** | Simplest approach that solves the problem | ✅ PASS | Custom 30-line Tooltip component vs. adding a library dependency |
| **II. Simplicity** | New dependencies justified | ✅ PASS | No new dependencies—pure CSS/React |
| **II. Simplicity** | Readable code without extensive comments | ✅ PASS | Standard React pattern |
| **III. Accessibility** | WCAG 2.1 AA | ✅ PASS | Tooltip uses aria-describedby, keyboard accessible |
| **III. Accessibility** | Keyboard navigable | ✅ PASS | Tooltip triggers on focus as well as hover |
| **III. Accessibility** | Sufficient contrast | ✅ PASS | Tooltip uses charcoal text on light background |

**Gate Status**: ✅ PASSED - No violations

## Project Structure

### Documentation (this feature)

```text
specs/006-option-tooltips/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (no API changes)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
components/
├── ui/
│   ├── Tooltip.tsx      # NEW: Reusable tooltip component
│   ├── PillButton.tsx   # MODIFY: Add tooltip prop
│   └── Toggle.tsx       # MODIFY: Add tooltip prop
├── StyleSelector.tsx    # MODIFY: Pass tooltip content
├── LengthSelector.tsx   # MODIFY: Pass tooltip content
└── ToggleGroup.tsx      # MODIFY: Pass tooltip content

lib/
└── types.ts             # MODIFY: Add tooltip content mappings
```

**Structure Decision**: Extends existing component structure. Tooltip is a UI primitive in `components/ui/`, content mappings live in `lib/types.ts` alongside existing label mappings.

## Complexity Tracking

> No violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
