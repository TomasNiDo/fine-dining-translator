# Implementation Plan: UI Redesign - Playful Fine Dining Aesthetic

**Branch**: `005-ui-redesign` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-ui-redesign/spec.md`
**Design Reference**: `/design/ab-test/variant-f.html`

## Summary

Implement the playful fine dining aesthetic from variant-f.html into the existing Next.js application. This involves updating the Decorations component with new large colorful blobs and line-art food illustrations, updating the color palette in Tailwind config, changing the Generate button from coral to purple/blue gradient, adding chef hat decorations to toggles and selectors, and updating the MenuCard with corner flourishes.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14 (App Router)
**Primary Dependencies**: React 18, Tailwind CSS 3.4.1, Lucide React, OpenAI SDK
**Storage**: N/A (stateless)
**Testing**: ESLint, manual visual verification against design mockup
**Target Platform**: Web (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Web application (frontend only for this feature)
**Performance Goals**: Page load <3s on 3G, decorative assets <500KB total
**Constraints**: WCAG 2.1 AA compliance, mobile responsive (320px minimum)
**Scale/Scope**: Single page application with 9 existing components to update

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status |
|-----------|-------------|--------|
| **I. User Delight** | UI MUST feel playful and inviting | ✅ PASS - variant-f design is whimsical with food illustrations and pastel colors |
| **I. User Delight** | Response time <2 seconds | ✅ PASS - visual changes only, no API impact |
| **II. Simplicity** | Simplest approach that solves the problem | ✅ PASS - updating existing components, not creating new abstractions |
| **II. Simplicity** | New dependencies justified | ✅ PASS - no new dependencies needed |
| **III. Accessibility** | WCAG 2.1 AA standards | ✅ PASS - will verify color contrast ratios |
| **III. Accessibility** | Keyboard navigable | ✅ PASS - existing functionality preserved |
| **Quality Standards** | Mobile-first (≥320px) | ✅ PASS - design is responsive |
| **Quality Standards** | Performance <3s on 3G | ⚠️ MONITOR - SVG decorations must be optimized |

## Project Structure

### Documentation (this feature)

```text
specs/005-ui-redesign/
├── plan.md              # This file
├── research.md          # Phase 0 output - color/design decisions
├── data-model.md        # Phase 1 output - N/A (no data changes)
├── quickstart.md        # Phase 1 output - setup/preview instructions
├── contracts/           # Phase 1 output - N/A (no API changes)
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── globals.css          # Update with new color variables and utilities
├── layout.tsx           # No changes needed
└── page.tsx             # Minor layout adjustments if needed

components/
├── Decorations.tsx      # MAJOR UPDATE - new blobs + line-art illustrations
├── Header.tsx           # Minor styling updates
├── DishInput.tsx        # Update to match mint box design
├── StyleSelector.tsx    # Add chef hat icons, update pill styling
├── LengthSelector.tsx   # Update pill styling
├── ToggleGroup.tsx      # Add colored backgrounds, chef hat icons
├── ui/Toggle.tsx        # Update toggle track colors
├── GenerateButton.tsx   # Change to purple/blue gradient
├── MenuCard.tsx         # Add corner flourishes, whisk decoration
└── Footer.tsx           # Minor styling updates

tailwind.config.ts       # Add new colors: pink-blob, blue-stroke, purple-btn, tan-outline
```

**Structure Decision**: Web application with existing component-based architecture. All changes are visual/styling updates to existing components.

## Complexity Tracking

> No violations - design uses existing architecture, no new dependencies or patterns required.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

## Component Change Summary

### High-Impact Changes
1. **Decorations.tsx** - Complete rewrite with new SVG illustrations
2. **GenerateButton.tsx** - Color change from coral to purple gradient
3. **ToggleGroup.tsx** - Add colored backgrounds and chef hat icons
4. **MenuCard.tsx** - Add corner flourishes and whisk decoration

### Medium-Impact Changes
5. **DishInput.tsx** - Update styling to match mint box design
6. **StyleSelector.tsx** - Add chef hat icons, update active state
7. **tailwind.config.ts** - Add 5 new color tokens

### Low-Impact Changes
8. **Header.tsx** - Minor font size adjustments
9. **LengthSelector.tsx** - Update active state styling
10. **Footer.tsx** - Minor styling updates
11. **globals.css** - Add new utility classes if needed
