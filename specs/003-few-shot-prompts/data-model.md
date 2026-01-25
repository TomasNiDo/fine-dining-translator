# Data Model: Few-Shot Prompt Examples

**Feature**: 003-few-shot-prompts
**Date**: 2026-01-26

## Overview

This feature adds no new persisted data. It introduces one in-memory data structure for prompt construction.

## New Types

### FewShotExample

A static structure representing a single few-shot example for prompt construction.

| Field | Type | Description |
|-------|------|-------------|
| dish | string | The ordinary dish name (input) |
| style | RestaurantStyle | Restaurant style for the example |
| length | DescriptionLength | Length setting for the example |
| output | string | The pretentious description (expected output) |

**Usage**: Array of 3 FewShotExample objects, hardcoded in `lib/prompts.ts`.

**Notes**:
- Not persisted - exists only in code
- Not exposed to API - internal to prompt construction
- Read-only after initialization

## Existing Types (No Changes)

The following types from `lib/types.ts` remain unchanged:
- `RestaurantStyle` - Enum of restaurant styles
- `DescriptionLength` - Enum of length options
- `GenerateRequest` - API request structure
- `GenerateResponse` - API response structure

## Data Flow

```
User Input (dish, style, length, toggles)
    ↓
buildPrompt() reads FEW_SHOT_EXAMPLES constant
    ↓
Prompt string includes formatted examples
    ↓
OpenAI API receives complete prompt
    ↓
Response returned (no data model changes)
```

## Storage Impact

**None** - This feature is purely computational. No database, localStorage, or file storage involved.
