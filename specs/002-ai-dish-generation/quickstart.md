# Quickstart: AI-Powered Dish Generation

**Feature**: 002-ai-dish-generation
**Date**: 2026-01-26

## Prerequisites

- Node.js 18+ installed
- OpenAI API key with GPT-4o access
- Existing fine-dining-translator codebase

## Setup Steps

### 1. Install OpenAI SDK

```bash
npm install openai
```

### 2. Configure Environment

Create `.env.local` in project root (this file is git-ignored):

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

### 3. Verify Setup

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 and try generating a description.

## Testing the Feature

### Manual Test Cases

| Test | Steps | Expected Result |
|------|-------|-----------------|
| Basic Generation | Enter "Pizza", click Generate | Unique pretentious description appears |
| Style Variation | Generate "Burger" with Cafe style, then Tasting Menu | Noticeably different tones |
| Length Variation | Generate "Fries" at Short, then Absolutely Unnecessary | Short has 1-2 sentences, long has 4+ |
| Reveal Toggle | Enable Reveal, generate "Mac and Cheese" | Ends with "(It's mac and cheese.)" or similar |
| Chef Ego Toggle | Enable Chef Ego, generate any dish | Contains chef attribution phrase |
| Techniques Toggle | Enable Techniques, generate "Steak" | Contains cooking terms like "sous vide" |
| Uniqueness | Generate same dish twice with same settings | Different descriptions |
| Error Handling | Disconnect network, try to generate | Friendly error message appears |
| Empty Input | Leave dish name empty, click Generate | Button disabled or validation message |

### Verifying AI Integration

To confirm GPT-4o is being called correctly:

1. Open browser DevTools → Network tab
2. Generate a description
3. Look for POST request to `/api/generate`
4. Response should contain unique `description` field

## Troubleshooting

### "The chef is on vacation" error

- Check that `OPENAI_API_KEY` is set in `.env.local`
- Verify the API key is valid and has GPT-4o access
- Restart the dev server after adding environment variable

### Slow responses (>5 seconds)

- GPT-4o responses typically take 2-4 seconds
- If consistently slow, check OpenAI status page
- Consider reducing `max_tokens` in API route if needed

### Identical descriptions

- Verify `temperature` is set to 0.9 in the API route
- Check that the prompt includes variation instructions

## Architecture Overview

```
User clicks Generate
        │
        ▼
  page.tsx (client)
        │
        │ POST /api/generate
        │ { dishName, options }
        ▼
  route.ts (server)
        │
        │ Builds prompt from options
        │ Calls OpenAI GPT-4o
        ▼
  OpenAI API
        │
        │ Returns completion
        ▼
  route.ts
        │
        │ Extracts description
        │ Returns JSON response
        ▼
  page.tsx
        │
        │ Updates state
        │ Renders MenuCard
        ▼
  User sees result
```

## Files Changed

| File | Change |
|------|--------|
| `package.json` | Added `openai` dependency |
| `.env.local` | Added `OPENAI_API_KEY` (new file, git-ignored) |
| `app/api/generate/route.ts` | New API route for AI generation |
| `app/page.tsx` | Updated to call API instead of sync function |
| `lib/types.ts` | Added error types |
| `lib/prompts.ts` | New prompt templates for AI |
| `lib/translator.ts` | Removed (replaced by API route) |
| `lib/data/templates.ts` | Removed (no longer needed) |
