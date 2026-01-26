# Data Model: UI Redesign

**Feature**: 005-ui-redesign
**Date**: 2026-01-26

## Overview

This feature is a **visual-only redesign** with no data model changes.

- No new entities
- No database changes
- No API changes
- No state management changes

## Existing Entities (Unchanged)

The following types remain unchanged:

```typescript
// lib/types.ts - NO CHANGES
type RestaurantStyle = 'cafe' | 'gastropub' | 'bistro' | 'steakhouse' | 'michelin' | 'tasting';
type DescriptionLength = 'short' | 'medium' | 'excessive' | 'unnecessary';

interface TranslatorOptions {
  style: RestaurantStyle;
  length: DescriptionLength;
  addReveal: boolean;
  addChefEgo: boolean;
  addTechniques: boolean;
}

interface TranslationResult {
  originalDish: string;
  description: string;
  style: RestaurantStyle;
  generatedAt: Date;
}
```

## New Types (UI Only)

```typescript
// components/ToggleGroup.tsx
type ToggleVariant = 'mint' | 'pink' | 'butter';

// tailwind.config.ts - new color tokens
type NewColors = {
  'cream-light': string;
  'mint-light': string;
  'pink-blob': string;
  'blue-stroke': string;
  'purple-btn': string;
  'purple-btn-light': string;
  'butter-light': string;
  'toggle-pink': string;
  'tan-outline': string;
};
```

These types are purely for styling purposes and don't affect application data flow.
