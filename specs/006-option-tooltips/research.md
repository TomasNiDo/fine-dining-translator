# Research: Option Tooltips

**Feature**: 006-option-tooltips
**Date**: 2026-01-26

## Research Questions

### 1. Tooltip Implementation Approach

**Decision**: Custom lightweight Tooltip component using CSS positioning and React state

**Rationale**:
- The project constitution (II. Simplicity) requires "simplest approach that solves the problem"
- A tooltip is ~30 lines of React/CSS—no library needed
- Existing project uses no UI component library (custom PillButton, Toggle, etc.)
- Adding a dependency like Radix or Floating UI would be overkill for 13 static tooltips

**Alternatives Considered**:
| Alternative | Rejected Because |
|-------------|------------------|
| Radix UI Tooltip | Adds 15KB+ dependency for a simple feature |
| Floating UI | Complex positioning library not needed for known, fixed positions |
| Native `title` attribute | No styling control, poor UX (slow 1s delay, no mobile support) |
| CSS-only `:hover` tooltip | No accessibility (keyboard/screen reader), no mobile support |

### 2. Mobile Touch Interaction

**Decision**: Show tooltip on tap (same tap that selects), dismiss on tap elsewhere

**Rationale**:
- Long-press conflicts with native browser behaviors (text selection, context menu)
- Separate "info" icon adds visual clutter contrary to simplicity principle
- Most mobile users will simply tap and learn from the result
- Tooltip serves as confirmation of what they just selected

**Alternatives Considered**:
| Alternative | Rejected Because |
|-------------|------------------|
| Long-press to show | Conflicts with native behaviors, undiscoverable |
| Separate info icon | Visual clutter, breaks pill button aesthetic |
| No mobile tooltips | Reduces feature value for mobile users (majority of web traffic) |

### 3. Tooltip Positioning Strategy

**Decision**: Position above element by default, flip to below if near viewport top

**Rationale**:
- Above positioning keeps tooltip out of the way of the cursor/finger
- Simple viewport boundary check: if `element.top < 80px`, position below
- No complex collision detection needed—options are in predictable screen locations

**Alternatives Considered**:
| Alternative | Rejected Because |
|-------------|------------------|
| Always above | Would clip at top of viewport for style buttons |
| Always below | Covered by cursor, looks odd |
| Smart auto-positioning (all 4 directions) | Over-engineered for this use case |

### 4. Accessibility Approach

**Decision**: Use `aria-describedby` pattern with visually hidden tooltip ID

**Rationale**:
- Screen readers announce tooltip content when element is focused
- No ARIA live regions needed (tooltips are not dynamic)
- Tooltip visible on keyboard focus (not just hover) ensures keyboard users see it
- Constitution (III. Accessibility) requires WCAG 2.1 AA compliance

**Implementation**:
```tsx
<button aria-describedby="tooltip-cafe">Cafe</button>
<span role="tooltip" id="tooltip-cafe">Casual and approachable...</span>
```

### 5. Animation Timing

**Decision**: 150ms fade-in, 100ms fade-out using CSS transitions

**Rationale**:
- Spec requires <200ms appearance, <150ms disappearance
- 150ms is perceptible but doesn't feel sluggish
- CSS transitions are simpler than JS animation libraries
- Matches the `duration-150` timing already used in PillButton

## Key Findings Summary

| Topic | Decision | Confidence |
|-------|----------|------------|
| Implementation | Custom React component | High |
| Mobile interaction | Tap to show, tap elsewhere to dismiss | Medium |
| Positioning | Above by default, flip if near top | High |
| Accessibility | aria-describedby + focus trigger | High |
| Animation | 150ms CSS fade transitions | High |

## Unresolved Items

None. All technical decisions resolved.
