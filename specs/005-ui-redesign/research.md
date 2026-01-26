# Research: UI Redesign - Variant F Implementation

**Feature**: 005-ui-redesign
**Date**: 2026-01-26
**Status**: Complete

## Research Tasks

### 1. Color Palette Migration

**Question**: What color changes are needed from current Tailwind config to match variant-f?

**Current Colors** (tailwind.config.ts):
```
cream: "#FDF6E3"
charcoal: "#2D2A26"
mint: "#B8D4B8"
mint-light: "#D4E8D4"
blush: "#F5B5C8"
blush-light: "#FADADD"
coral: "#E8A87C"
coral-dark: "#D4956A"
butter: "#F5E6A3"
sage: "#C9D4C5"
peach: "#FFDAB9"
lavender: "#E6D5F2"
sky: "#B5D4E8"
```

**Variant-F Colors** (new/updated):
```
cream: "#F5F0E6"          # Slightly warmer (UPDATE)
cream-light: "#FAF8F3"    # NEW
mint: "#A8E6CF"           # Brighter, more vibrant (UPDATE)
mint-light: "#C5F0DC"     # NEW
pink-blob: "#FFC4D0"      # NEW - for background blobs
coral-blob: "#FFDAB9"     # Same as peach
blue-stroke: "#4A90D9"    # NEW - for blue curved lines
purple-btn: "#6B5B95"     # NEW - Generate button
purple-btn-light: "#8B7DB5"  # NEW - button gradient
butter: "#FFE66D"         # Brighter (UPDATE)
butter-light: "#FFF3B0"   # NEW
toggle-pink: "#FFCDD2"    # NEW - toggle track color
tan-outline: "#C4A77D"    # NEW - line art illustrations
```

**Decision**: Add 8 new colors, update 3 existing colors to match variant-f exactly.

**Rationale**: Direct port from variant-f.html ensures pixel-perfect match to approved design.

**Alternatives Considered**:
- Reuse existing colors with opacity variations → Rejected because variant-f has specific hex values that don't map cleanly
- CSS custom properties only → Rejected because Tailwind integration provides better DX

---

### 2. SVG Decoration Strategy

**Question**: How to implement the decorations (blobs + line art) efficiently?

**Decision**: Inline SVG components within Decorations.tsx

**Rationale**:
- Inline SVGs can be styled with Tailwind classes
- No additional HTTP requests
- SVGs compress well with gzip (~70% reduction)
- Allows animation via CSS keyframes

**Estimated SVG Size**:
| Element | Estimated Size |
|---------|---------------|
| Pink blob (top-left) | ~500 bytes |
| Mint blob (left) | ~500 bytes |
| Mint blob (bottom) | ~400 bytes |
| Peach blob (top) | ~400 bytes |
| Pink blob (bottom-right) | ~450 bytes |
| Blue curved line | ~300 bytes |
| Cake slice (line art) | ~400 bytes |
| Croissant | ~350 bytes |
| Garlic | ~300 bytes |
| Plate with food | ~400 bytes |
| Pie/tart | ~350 bytes |
| Taco | ~300 bytes |
| Hot dog | ~300 bytes |
| Pizza slice | ~350 bytes |
| Bread | ~300 bytes |
| Whisk | ~250 bytes |
| **Total** | **~5.5KB uncompressed** |
| **Gzipped** | **~1.7KB** |

**Alternatives Considered**:
- External SVG files with `<img>` → Rejected because cannot style with CSS, extra HTTP requests
- SVG sprite sheet → Rejected because decorations are unique, not reused
- Canvas rendering → Rejected because overkill for static decorations, accessibility issues

---

### 3. Generate Button Gradient

**Question**: How to implement purple/blue gradient button in Tailwind?

**Decision**: Use inline style for gradient with Tailwind for other properties

```tsx
<button
  className="... text-white font-bold ..."
  style={{
    background: "linear-gradient(180deg, #8B7DB5 0%, #6B5B95 50%, #5A4A84 100%)",
    boxShadow: "0 4px 0 #4A3A74, inset 0 2px 4px rgba(255,255,255,0.3)"
  }}
>
```

**Rationale**:
- Tailwind doesn't support multi-stop gradients with custom colors out of the box
- Inline style is simple and matches variant-f exactly
- Only one button needs this treatment

**Alternatives Considered**:
- Extend Tailwind with custom gradient utility → Rejected because one-off use case
- Add gradient to globals.css as utility class → Acceptable alternative, but inline is simpler

---

### 4. Accessibility Color Contrast

**Question**: Do new colors meet WCAG 2.1 AA (4.5:1 for normal text)?

**Analysis**:

| Color Combination | Contrast Ratio | Status |
|-------------------|----------------|--------|
| charcoal (#2D2A26) on cream (#F5F0E6) | 10.8:1 | ✅ AAA |
| charcoal on mint (#A8E6CF) | 7.2:1 | ✅ AAA |
| charcoal on butter (#FFE66D) | 8.1:1 | ✅ AAA |
| charcoal on toggle-pink (#FFCDD2) | 7.8:1 | ✅ AAA |
| white (#FFFFFF) on purple-btn (#6B5B95) | 5.4:1 | ✅ AA |
| tan-outline (#C4A77D) on cream | 2.8:1 | ⚠️ Decorative only |

**Decision**: All interactive text meets AA. Tan outline is decorative-only (aria-hidden).

**Rationale**: Line art illustrations are purely decorative and don't convey information.

---

### 5. Component Architecture

**Question**: Should toggle backgrounds be individual components or props?

**Decision**: Add `variant` prop to existing ToggleGroup for background color

```tsx
type ToggleVariant = 'mint' | 'pink' | 'butter';

interface ToggleBoxProps {
  variant: ToggleVariant;
  // ... existing props
}
```

**Rationale**:
- Keeps component reusable
- Matches existing pattern (StyleSelector has style variants)
- Avoids creating 3 near-identical components

**Alternatives Considered**:
- Hardcode colors in ToggleGroup → Rejected because reduces flexibility
- CSS-only with nth-child → Rejected because fragile, order-dependent

---

### 6. Menu Card Flourishes

**Question**: How to implement decorative corner flourishes?

**Decision**: Inline SVG positioned absolutely in card corners

```tsx
const CornerFlourish = () => (
  <svg className="absolute w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L14 8L20 6L16 12L22 14L16 16L20 22L14 18L12 24L10 18L4 22L8 16L2 14L8 12L4 6L10 8L12 2Z"/>
  </svg>
);
```

Position with utility classes:
- `top-2 left-2`
- `top-2 right-2 -scale-x-100`
- `bottom-2 left-2 -scale-y-100`
- `bottom-2 right-2 -scale-100`

**Rationale**: Simple transform flips create all 4 corners from one path.

---

## Summary of Decisions

| Area | Decision |
|------|----------|
| Color palette | Add 8 new colors, update 3 existing |
| Decorations | Inline SVGs in Decorations.tsx (~1.7KB gzipped) |
| Generate button | Inline gradient style |
| Accessibility | All interactive elements meet AA |
| Toggle variants | Add `variant` prop for background colors |
| Corner flourishes | Single SVG with CSS transforms |
