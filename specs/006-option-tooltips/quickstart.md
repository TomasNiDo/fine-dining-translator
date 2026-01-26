# Quickstart: Option Tooltips

**Feature**: 006-option-tooltips
**Date**: 2026-01-26

## Prerequisites

- Node.js 18+
- npm 9+
- Repository cloned and on branch `006-option-tooltips`

## Quick Setup

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 to see the app.

## Implementation Order

### Step 1: Add Tooltip Content Constants

**File**: `lib/types.ts`

Add these exports after the existing `LENGTH_LABELS`:

```typescript
export const STYLE_TOOLTIPS: Record<RestaurantStyle, string> = {
  cafe: "Casual and approachable—your avocado toast gets a trendy twist",
  gastropub: "Elevated pub fare—hearty dishes with pretentious adjectives",
  bistro: "French-inspired charm—simple dishes sound très sophistiqué",
  steakhouse: "Bold and masculine—everything sounds like it was aged and seared to perfection",
  michelin: "Peak pretension—your dish becomes an artistic meditation",
  "tasting-menu": "Maximum theater—expect 'journeys' and 'experiences'",
};

export const LENGTH_TOOLTIPS: Record<DescriptionLength, string> = {
  short: "1-2 concise sentences",
  medium: "A modest paragraph of culinary description",
  excessive: "Multiple sentences of increasingly unnecessary detail",
  "absolutely-unnecessary": "A full theatrical monologue about your humble dish",
};

export const TOGGLE_TOOLTIPS = {
  reveal: "Ends with a dramatic reveal: '(It's just [dish name])'",
  chefEgo: "Adds self-congratulatory phrases like 'Chef's signature interpretation'",
  techniques: "Sprinkles in fancy technique words like 'sous vide', 'deconstructed', 'foam'",
} as const;
```

### Step 2: Create Tooltip Component

**File**: `components/ui/Tooltip.tsx`

```typescript
"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  id: string;
}

export function Tooltip({ content, children, id }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(rect.top < 80 ? "below" : "above");
    }
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <div aria-describedby={isVisible ? id : undefined}>
        {children}
      </div>
      <span
        id={id}
        role="tooltip"
        className={`
          absolute left-1/2 -translate-x-1/2 z-50
          px-3 py-2 max-w-[200px] text-xs text-center
          bg-white border-2 border-charcoal rounded-lg shadow-md
          transition-opacity duration-150
          ${position === "above" ? "bottom-full mb-2" : "top-full mt-2"}
          ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {content}
      </span>
    </div>
  );
}
```

### Step 3: Update PillButton

**File**: `components/ui/PillButton.tsx`

Add `tooltip` prop and wrap content in Tooltip when provided.

### Step 4: Update StyleSelector and LengthSelector

Pass tooltip content from `STYLE_TOOLTIPS` and `LENGTH_TOOLTIPS` to PillButton.

### Step 5: Update ToggleGroup

Pass tooltip content from `TOGGLE_TOOLTIPS` to each Toggle.

## Testing Checklist

- [ ] Hover over each style option → tooltip appears
- [ ] Hover over each verbosity option → tooltip appears
- [ ] Hover over each toggle → tooltip appears
- [ ] Tab through options → tooltips appear on focus
- [ ] Mobile: tap options → tooltip shows briefly
- [ ] Tooltips near top of viewport flip to below
- [ ] No flickering when moving between adjacent options

## Files Modified

| File | Change |
|------|--------|
| `lib/types.ts` | Add tooltip content constants |
| `components/ui/Tooltip.tsx` | New file |
| `components/ui/PillButton.tsx` | Add tooltip prop |
| `components/ui/Toggle.tsx` | Add tooltip prop |
| `components/StyleSelector.tsx` | Pass tooltip to PillButton |
| `components/LengthSelector.tsx` | Pass tooltip to PillButton |
| `components/ToggleGroup.tsx` | Pass tooltip to Toggle |
