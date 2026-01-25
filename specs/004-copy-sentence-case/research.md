# Research: Copy Feature & Sentence Case Formatting

**Feature**: 004-copy-sentence-case
**Date**: 2026-01-26

## Research Areas

### 1. Clipboard API Browser Support

**Decision**: Use `navigator.clipboard.writeText()` with try-catch error handling

**Rationale**:
- Native Clipboard API is supported in all target browsers (Chrome 66+, Firefox 63+, Safari 13.1+, Edge 79+)
- Async API provides proper error handling for permission denials
- No external library needed (aligns with Constitution II. Simplicity)

**Alternatives Considered**:
- `document.execCommand('copy')` - Deprecated, synchronous, inconsistent behavior
- `clipboard.js` library - Unnecessary dependency for simple use case
- `react-copy-to-clipboard` - Adds dependency, wraps same native API

**Implementation Pattern**:
```typescript
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
```

### 2. Copy Button UX Patterns

**Decision**: Icon button with state change feedback (Copy → Copied! → Copy)

**Rationale**:
- Icon-only button saves space on mobile (≥320px constraint)
- State change provides immediate visual feedback (<500ms per spec)
- Auto-reset after 2 seconds matches user expectation patterns
- Lucide React already in project (`lucide-react`) - use `Copy` and `Check` icons

**Alternatives Considered**:
- Toast notification - Adds complexity, distracts from content
- Tooltip only - No persistent feedback, not accessible
- Text button "Copy" - Takes more space, less elegant

**Icon Selection** (from existing Lucide React dependency):
- Default state: `Copy` icon
- Success state: `Check` icon with "Copied!" text
- Error state: `X` icon with error message

### 3. Accessibility Requirements

**Decision**: Button with aria-label, focus-visible styles, and sr-only announcement

**Rationale**:
- Constitution requires WCAG 2.1 AA compliance
- Screen readers need clear button purpose and action confirmation
- Keyboard users need visible focus indication

**Implementation Pattern**:
```tsx
<button
  aria-label="Copy description to clipboard"
  className="focus-visible:ring-2 focus-visible:ring-offset-2"
>
  {copied ? <Check /> : <Copy />}
  <span className="sr-only">{copied ? "Copied!" : "Copy"}</span>
</button>
```

### 4. Sentence Case vs Title Case in AI Prompts

**Decision**: Update few-shot examples and add explicit instruction in system prompt

**Rationale**:
- Few-shot examples are the strongest signal for LLM output formatting
- Explicit instruction reinforces the pattern
- Sentence case reads more naturally like authentic fine dining prose

**Current Title Case Example**:
> "Butter-Lacquered Rustic Bread Duo, Melted Dairy Embrace, Pan-Coaxed to Golden Confidence"

**Target Sentence Case Example**:
> "Butter-lacquered rustic bread duo, melted dairy embrace, pan-coaxed to golden confidence"

**Implementation**:
1. Update all `FEW_SHOT_EXAMPLES` in `lib/prompts.ts` to use sentence case
2. Add explicit instruction: "Use sentence case (capitalize only the first letter of the description and proper nouns)"

### 5. Copy Button Placement

**Decision**: Position below the description text, centered, with subtle styling

**Rationale**:
- Below text avoids obscuring the content (user's primary focus)
- Centered alignment matches existing card layout
- Subtle styling keeps focus on the generated description

**Layout**:
```
┌─────────────────────────┐
│      [Dish Title]       │
│      ───────────        │
│   "Description text     │
│    goes here..."        │
│                         │
│      [ 📋 Copy ]        │
└─────────────────────────┘
```

## Summary of Decisions

| Area | Decision | Dependencies |
|------|----------|--------------|
| Clipboard API | Native `navigator.clipboard.writeText()` | None (browser API) |
| Icons | Lucide `Copy` and `Check` | Already installed |
| Feedback | State change with 2s auto-reset | React useState |
| Accessibility | aria-label + sr-only announcement | None |
| Sentence Case | Update few-shot examples + explicit instruction | Prompt changes only |
| Placement | Below description, centered | CSS only |

## No NEEDS CLARIFICATION Items

All technical decisions resolved. Ready for Phase 1 design.
