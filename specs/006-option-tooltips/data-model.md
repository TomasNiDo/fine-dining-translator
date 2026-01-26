# Data Model: Option Tooltips

**Feature**: 006-option-tooltips
**Date**: 2026-01-26

## Overview

This feature adds static tooltip content mappings for existing option types. No new entities are created—only new constant mappings that parallel the existing `STYLE_LABELS` and `LENGTH_LABELS` patterns.

## Entities

### TooltipContent (New Constants)

Tooltip text mappings for each option type, stored in `lib/types.ts`.

#### STYLE_TOOLTIPS

| Key | Value |
|-----|-------|
| `cafe` | "Casual and approachable—your avocado toast gets a trendy twist" |
| `gastropub` | "Elevated pub fare—hearty dishes with pretentious adjectives" |
| `bistro` | "French-inspired charm—simple dishes sound très sophistiqué" |
| `steakhouse` | "Bold and masculine—everything sounds like it was aged and seared to perfection" |
| `michelin` | "Peak pretension—your dish becomes an artistic meditation" |
| `tasting-menu` | "Maximum theater—expect 'journeys' and 'experiences'" |

**Type**: `Record<RestaurantStyle, string>`

#### LENGTH_TOOLTIPS

| Key | Value |
|-----|-------|
| `short` | "1-2 concise sentences" |
| `medium` | "A modest paragraph of culinary description" |
| `excessive` | "Multiple sentences of increasingly unnecessary detail" |
| `absolutely-unnecessary` | "A full theatrical monologue about your humble dish" |

**Type**: `Record<DescriptionLength, string>`

#### TOGGLE_TOOLTIPS

| Key | Value |
|-----|-------|
| `reveal` | "Ends with a dramatic reveal: '(It's just [dish name])'" |
| `chefEgo` | "Adds self-congratulatory phrases like 'Chef's signature interpretation'" |
| `techniques` | "Sprinkles in fancy technique words like 'sous vide', 'deconstructed', 'foam'" |

**Type**: `Record<'reveal' | 'chefEgo' | 'techniques', string>`

## Component Props Extensions

### TooltipProps (New)

Props for the new Tooltip UI component.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `content` | `string` | Yes | - | Tooltip text to display |
| `children` | `ReactNode` | Yes | - | Trigger element |
| `id` | `string` | Yes | - | Unique ID for aria-describedby |
| `position` | `'above' \| 'below'` | No | `'above'` | Preferred tooltip position |

### PillButtonProps (Extended)

Add tooltip prop to existing PillButton.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tooltip` | `string` | No | - | Tooltip text (if provided, wraps in Tooltip) |

### ToggleProps (Extended)

Add tooltip prop to existing Toggle.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `tooltip` | `string` | No | - | Tooltip text (if provided, wraps in Tooltip) |

## Relationships

```
┌─────────────────────┐
│   RestaurantStyle   │◄──── STYLE_TOOLTIPS[key]
│   (existing type)   │
└─────────────────────┘

┌─────────────────────┐
│  DescriptionLength  │◄──── LENGTH_TOOLTIPS[key]
│   (existing type)   │
└─────────────────────┘

┌─────────────────────┐
│   Toggle Options    │◄──── TOGGLE_TOOLTIPS[key]
│   (reveal, ego,     │
│    techniques)      │
└─────────────────────┘
```

## Validation Rules

1. **Tooltip content length**: Max 100 characters to ensure readability on mobile
2. **All options covered**: Every key in `RestaurantStyle` and `DescriptionLength` MUST have a corresponding tooltip
3. **No HTML in tooltips**: Plain text only for security and consistency

## State Management

No state changes. Tooltip visibility is managed locally within the Tooltip component:

- `isVisible: boolean` - Controlled by hover/focus/touch events
- No global state, no persistence, no server interaction
