# Quickstart: UI Redesign Implementation

**Feature**: 005-ui-redesign
**Branch**: `005-ui-redesign`

## Prerequisites

- Node.js 18+
- npm or pnpm

## Setup

```bash
# Clone and checkout branch
git checkout 005-ui-redesign

# Install dependencies
npm install

# Start development server
npm run dev
```

## Preview Reference Design

Open the variant-f reference in a browser alongside the running app:

```bash
# Open variant-f.html reference
open design/ab-test/variant-f.html

# App runs at
open http://localhost:3000
```

## Implementation Order

### Phase 1: Foundation
1. Update `tailwind.config.ts` with new colors
2. Update `app/globals.css` if needed

### Phase 2: Components (High Impact)
3. Rewrite `components/Decorations.tsx` with blobs + line art
4. Update `components/GenerateButton.tsx` with purple gradient
5. Update `components/ToggleGroup.tsx` with colored backgrounds
6. Update `components/MenuCard.tsx` with flourishes

### Phase 3: Components (Medium Impact)
7. Update `components/DishInput.tsx` styling
8. Update `components/StyleSelector.tsx` with chef icons

### Phase 4: Polish
9. Minor updates to Header, Footer, LengthSelector
10. Cross-browser testing
11. Mobile responsive verification

## Verification Checklist

- [ ] Colors match variant-f.html exactly
- [ ] All decorations visible on desktop (1280px+)
- [ ] Decorations hide/minimize on mobile (<768px)
- [ ] Generate button has purple gradient
- [ ] Toggle boxes have colored backgrounds
- [ ] Menu card has corner flourishes
- [ ] All interactive elements remain accessible
- [ ] Page loads in <3 seconds

## File Comparison

Use side-by-side comparison to verify implementation:

```bash
# Split terminal or use browser dev tools
# Left: http://localhost:3000
# Right: file:///.../design/ab-test/variant-f.html
```

## Color Reference

```css
/* New colors to add */
--cream: #F5F0E6;
--cream-light: #FAF8F3;
--mint: #A8E6CF;
--mint-light: #C5F0DC;
--pink-blob: #FFC4D0;
--blue-stroke: #4A90D9;
--purple-btn: #6B5B95;
--purple-btn-light: #8B7DB5;
--butter: #FFE66D;
--butter-light: #FFF3B0;
--toggle-pink: #FFCDD2;
--tan-outline: #C4A77D;
```
