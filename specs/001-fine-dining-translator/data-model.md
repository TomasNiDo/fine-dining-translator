# Data Model: Fine Dining Translator

**Date**: 2026-01-26
**Feature**: [spec.md](./spec.md)

## Overview

This is a client-side only application with no persistent storage. All data exists in React component state during a user session. This document defines the TypeScript types and state shape.

## Enumerations

### RestaurantStyle

Available restaurant style options for translation tone.

```typescript
type RestaurantStyle =
  | 'cafe'
  | 'gastropub'
  | 'bistro'
  | 'steakhouse'
  | 'michelin'
  | 'tasting-menu';
```

| Value | Display Label | Tone Description |
|-------|---------------|------------------|
| `cafe` | Cafe | Casual, cozy, approachable pretension |
| `gastropub` | Gastropub | Elevated comfort food language |
| `bistro` | Bistro | French-inspired sophistication |
| `steakhouse` | Steakhouse | Bold, masculine, premium emphasis |
| `michelin` | Michelin | Refined, technical, artistic |
| `tasting-menu` | Tasting Menu (unhinged) | Absurdly over-the-top, maximum pretension |

**Default**: `gastropub`

---

### DescriptionLength

Controls the verbosity of generated descriptions.

```typescript
type DescriptionLength =
  | 'short'
  | 'medium'
  | 'excessive'
  | 'absolutely-unnecessary';
```

| Value | Display Label | Sentence Count |
|-------|---------------|----------------|
| `short` | Short | 1-2 sentences |
| `medium` | Medium | 2-3 sentences |
| `excessive` | Excessive | 3-4 sentences |
| `absolutely-unnecessary` | Absolutely Unnecessary | 4+ sentences |

**Default**: `medium`

---

## Interfaces

### TranslatorOptions

User-configurable options that affect translation output.

```typescript
interface TranslatorOptions {
  style: RestaurantStyle;
  length: DescriptionLength;
  addReveal: boolean;      // Appends "(It's [dish name])"
  addChefEgo: boolean;     // Adds chef attribution phrases
  addTechniques: boolean;  // Injects cooking technique words
}
```

**Default State**:
```typescript
const defaultOptions: TranslatorOptions = {
  style: 'gastropub',
  length: 'medium',
  addReveal: false,
  addChefEgo: false,
  addTechniques: false,
};
```

---

### TranslationRequest

Input to the translation function.

```typescript
interface TranslationRequest {
  dishName: string;
  options: TranslatorOptions;
}
```

**Validation Rules**:
- `dishName`: Non-empty string after trimming whitespace
- Maximum length: 200 characters (for display sanity)

---

### TranslationResult

Output from the translation function.

```typescript
interface TranslationResult {
  originalDish: string;
  description: string;
  style: RestaurantStyle;
  generatedAt: Date;
}
```

---

## Application State

### TranslatorState

Complete state shape for the main page component.

```typescript
interface TranslatorState {
  // User input
  dishName: string;
  options: TranslatorOptions;

  // UI state
  isGenerating: boolean;

  // Output
  result: TranslationResult | null;
  error: string | null;
}
```

**Initial State**:
```typescript
const initialState: TranslatorState = {
  dishName: '',
  options: defaultOptions,
  isGenerating: false,
  result: null,
  error: null,
};
```

---

## State Transitions

```
┌─────────────────────────────────────────────────────────────┐
│                       IDLE STATE                             │
│  dishName: ''                                                │
│  result: null                                                │
│  isGenerating: false                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ User types dish name
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    INPUT READY STATE                         │
│  dishName: 'Hot Dog'                                         │
│  result: null                                                │
│  isGenerating: false                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ User clicks "Generate Masterpiece"
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    GENERATING STATE                          │
│  dishName: 'Hot Dog'                                         │
│  result: null                                                │
│  isGenerating: true                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Mock logic completes (~300ms simulated)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    RESULT STATE                              │
│  dishName: 'Hot Dog'                                         │
│  result: { description: '...', ... }                         │
│  isGenerating: false                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ User changes input/options
                              ▼
                     (Back to INPUT READY STATE)
```

---

## Template Data Structure

### TranslationTemplate

Structure for mock translation templates.

```typescript
interface TranslationTemplate {
  style: RestaurantStyle;
  patterns: TemplatePattern[];
}

interface TemplatePattern {
  base: string;          // Main sentence template
  extensions?: string[]; // Additional sentences for longer lengths
  techniques?: string[]; // Words to inject when toggle enabled
}
```

**Example**:
```typescript
const gastropubTemplate: TranslationTemplate = {
  style: 'gastropub',
  patterns: [
    {
      base: 'Artisanal {dish} served on a {bread} cloud, adorned with a {condiment} reduction.',
      extensions: [
        'Locally sourced from farms you\'ve definitely never heard of.',
        'Paired with a carefully curated selection of craft beverages.',
      ],
      techniques: ['house-cured', 'dry-aged', 'small-batch'],
    },
    // ... more patterns
  ],
};
```

---

## Validation

### Input Validation

| Field | Rule | Error Message |
|-------|------|---------------|
| `dishName` | Required, non-empty after trim | "Please enter a dish name to translate" |
| `dishName` | Max 200 characters | "That's quite a mouthful! Try a shorter dish name" |

### State Validation

- Cannot generate while `isGenerating === true` (button disabled)
- Cannot generate with empty `dishName` (button disabled or shows error)
