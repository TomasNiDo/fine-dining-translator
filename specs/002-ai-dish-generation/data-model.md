# Data Model: AI-Powered Dish Generation

**Feature**: 002-ai-dish-generation
**Date**: 2026-01-26

## Overview

This feature is stateless - no database or persistent storage required. Data flows through request/response cycles only.

## Type Definitions

### Existing Types (from lib/types.ts - unchanged)

```typescript
// Restaurant style options - unchanged
type RestaurantStyle = "cafe" | "gastropub" | "bistro" | "steakhouse" | "michelin" | "tasting-menu";

// Description length options - unchanged
type DescriptionLength = "short" | "medium" | "excessive" | "absolutely-unnecessary";

// User-configurable options - unchanged
interface TranslatorOptions {
  style: RestaurantStyle;
  length: DescriptionLength;
  addReveal: boolean;
  addChefEgo: boolean;
  addTechniques: boolean;
}
```

### API Request Type (new)

```typescript
// Sent from client to /api/generate
interface GenerateRequest {
  dishName: string;           // The simple dish name to transform
  options: TranslatorOptions; // User's selected options
}
```

**Validation Rules**:
- `dishName`: Required, non-empty after trimming, max 200 characters
- `options.style`: Must be valid RestaurantStyle value
- `options.length`: Must be valid DescriptionLength value
- `options.addReveal/addChefEgo/addTechniques`: Boolean, defaults to false

### API Response Type (new)

```typescript
// Successful response from /api/generate
interface GenerateResponse {
  success: true;
  data: {
    originalDish: string;     // Echo of input dish name
    description: string;      // AI-generated pretentious description
    style: RestaurantStyle;   // Echo of selected style
    generatedAt: string;      // ISO 8601 timestamp
  };
}

// Error response from /api/generate
interface GenerateErrorResponse {
  success: false;
  error: {
    code: string;             // Machine-readable error code
    message: string;          // User-friendly error message
  };
}
```

**Error Codes**:
| Code | HTTP Status | Meaning |
|------|-------------|---------|
| `INVALID_INPUT` | 400 | Missing or malformed request body |
| `DISH_NAME_REQUIRED` | 400 | Empty dish name |
| `DISH_NAME_TOO_LONG` | 400 | Dish name exceeds 200 characters |
| `AI_SERVICE_ERROR` | 500 | OpenAI API returned an error |
| `AI_TIMEOUT` | 504 | OpenAI request exceeded timeout |
| `RATE_LIMITED` | 429 | Too many requests |

### Updated Client Type (modified)

```typescript
// Updated TranslationResult to support async generation
interface TranslationResult {
  originalDish: string;
  description: string;
  style: RestaurantStyle;
  generatedAt: Date;          // Parsed from ISO string
}

// New: Error state for UI
interface GenerationError {
  code: string;
  message: string;
}
```

## Data Flow

```
┌─────────────┐     POST /api/generate      ┌─────────────┐
│   Client    │ ──────────────────────────▶ │  API Route  │
│  (page.tsx) │    GenerateRequest          │ (route.ts)  │
└─────────────┘                             └──────┬──────┘
       ▲                                           │
       │                                           ▼
       │                                    ┌─────────────┐
       │      GenerateResponse              │   OpenAI    │
       │◀─────────────────────────────────  │   GPT-4o    │
       │      or GenerateErrorResponse      └─────────────┘
```

## State Management (Client-Side)

```typescript
// In page.tsx - updated state shape
const [result, setResult] = useState<TranslationResult | null>(null);
const [error, setError] = useState<GenerationError | null>(null);
const [isGenerating, setIsGenerating] = useState(false);
```

**State Transitions**:
1. Initial: `result=null, error=null, isGenerating=false`
2. Generate clicked: `isGenerating=true, error=null`
3. Success: `result={...}, isGenerating=false`
4. Error: `error={...}, result=null, isGenerating=false`
