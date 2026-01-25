# Data Model: Copy Feature & Sentence Case Formatting

**Feature**: 004-copy-sentence-case
**Date**: 2026-01-26

## Overview

This feature requires minimal data model changes. No new entities are persisted; only transient UI state is added.

## Entities

### Existing Entities (Unchanged)

#### TranslationResult
The AI-generated menu description. No changes required.

| Field | Type | Description |
|-------|------|-------------|
| originalDish | string | User's input dish name |
| description | string | AI-generated fancy description (now in sentence case) |
| style | RestaurantStyle | Selected style option |
| generatedAt | Date | Timestamp of generation |

### New Entities (Transient UI State)

#### CopyState
Local React state for copy button feedback. Not persisted.

| Field | Type | Description |
|-------|------|-------------|
| status | 'idle' \| 'copied' \| 'error' | Current copy action state |
| message | string \| null | Error message if copy failed |

**State Transitions**:
```
idle ──[click copy]──> (attempting)
  │
  ├──[success]──> copied ──[2s timeout]──> idle
  │
  └──[failure]──> error ──[user dismisses or 5s timeout]──> idle
```

## Validation Rules

### Copy Action
- **Pre-condition**: `description` must be non-empty string
- **Post-condition (success)**: System clipboard contains exact `description` text
- **Post-condition (failure)**: Error message displayed to user

### Sentence Case Output
- **Rule**: First character of description is uppercase
- **Rule**: Subsequent characters follow natural English capitalization (proper nouns, sentence beginnings)
- **Rule**: No Title Case pattern (e.g., "Every Word Capitalized")

## No API Contract Changes

The `/api/generate` endpoint contract remains unchanged:
- Same request shape (dishName, options)
- Same response shape (success, data, error)
- Only the content of `data.description` changes (sentence case formatting)

This is a **prompt engineering change**, not an API contract change.
