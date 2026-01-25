# Research: AI-Powered Dish Generation

**Feature**: 002-ai-dish-generation
**Date**: 2026-01-26

## Research Questions

### 1. OpenAI GPT-4o Integration in Next.js

**Decision**: Use the official `openai` npm package with Next.js App Router API routes.

**Rationale**:
- Official SDK provides TypeScript types and handles authentication
- API routes keep the OpenAI API key server-side (secure)
- Next.js 14 App Router's `route.ts` files are the recommended pattern for API endpoints

**Alternatives Considered**:
- Direct fetch to OpenAI API: Rejected - loses TypeScript types, more boilerplate
- Vercel AI SDK: Rejected - adds unnecessary complexity for simple text generation; better suited for streaming chat interfaces

**Implementation Pattern**:
```typescript
// app/api/generate/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: buildPrompt(body) }],
    max_tokens: 500,
    temperature: 0.9, // Higher for creativity
  });
  return NextResponse.json({ description: completion.choices[0].message.content });
}
```

### 2. Prompt Engineering Strategy

**Decision**: Use a single system prompt with dynamic instructions based on user selections.

**Rationale**:
- Simpler than multiple specialized prompts per style
- Easier to maintain and tune
- Style/length/toggle instructions are naturally composable

**Prompt Structure**:

```text
System: You are a pretentious food critic writing menu descriptions for fine dining restaurants.
Your task is to transform a simple dish name into an absurdly over-the-top, humorously pretentious
menu description.

Style: {style_description}
Length: {length_instruction}
{optional_toggle_instructions}

Important: Be genuinely creative and amusing. Each description should feel unique.
Never be generic or repetitive.

User: Transform this dish: "{dish_name}"
```

**Style Descriptions**:
| Style | Prompt Description |
|-------|-------------------|
| Cafe | Casual but trying too hard. Use words like "artisanal", "locally-sourced", "hand-crafted". Mild pretension. |
| Gastropub | Elevated comfort food vibes. Reference craft processes and unexpected ingredient origins. |
| Bistro | French-inspired elegance. Sprinkle in French terms (sans translation). Slightly aloof. |
| Steakhouse | Masculine, premium, bold. Emphasize quality, aging, provenance. Words like "prime", "heritage", "grass-fed". |
| Michelin | Technical precision meets poetry. Reference cooking techniques, seasonal ingredients, terroir. |
| Tasting Menu | Maximum pretension. Philosophical musings about the dish's essence. Absurdly elaborate. Unhinged creativity. |

**Length Instructions**:
| Length | Instruction |
|--------|-------------|
| Short | Write exactly 1-2 sentences. Be punchy but pretentious. |
| Medium | Write exactly 2-3 sentences. Balance wit with verbosity. |
| Excessive | Write 3-4 sentences. Really lean into the pretension. |
| Absolutely Unnecessary | Write 4+ sentences. Go completely overboard. Include philosophical tangents. |

**Toggle Instructions**:
- Reveal: End with a parenthetical reveal like "(It's just [original dish name].)"
- Chef Ego: Include a chef attribution like "Chef's signature interpretation" or "Personally curated by Chef [fancy name]"
- Techniques: Incorporate cooking technique terminology like "sous vide", "dehydrated", "spherified", "foam", "gel"

### 3. Error Handling Strategy

**Decision**: Implement three-tier error handling with user-friendly messages.

**Rationale**:
- Constitution requires no silent failures
- Users should understand what went wrong and how to recover
- Different errors require different guidance

**Error Categories**:

| Error Type | User Message | Technical Handling |
|------------|--------------|-------------------|
| API Key Missing | "The chef is on vacation. Please try again later." | Log error, return 500 |
| Rate Limited | "Our kitchen is too busy right now. Please wait a moment and try again." | Return 429 with retry-after |
| Network Error | "Lost connection to our culinary imagination. Please check your connection." | Return 503 |
| Invalid Response | "The chef had a creative block. Let's try again." | Log response, return 500 |
| Timeout | "This dish is taking too long to prepare. Please try again." | 30s timeout, return 504 |

### 4. Performance Optimization

**Decision**: Use standard request/response pattern without streaming.

**Rationale**:
- Menu descriptions are short (max ~100 words) - streaming overhead not worth it
- Simpler implementation aligns with Simplicity principle
- 5 second target is achievable with direct API calls

**Optimizations Applied**:
- Set `max_tokens: 500` to limit response length
- Use `gpt-4o` (faster than gpt-4-turbo for this use case)
- Single API call per generation (no chained prompts)

### 5. API Key Security

**Decision**: Store API key in environment variable, access only via server-side API route.

**Rationale**:
- API key never exposed to client
- Next.js API routes run server-side only
- Standard pattern for sensitive credentials

**Environment Setup**:
```bash
# .env.local (git-ignored)
OPENAI_API_KEY=sk-...
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| openai | ^4.x | Official OpenAI SDK for GPT-4o access |

## Open Questions (Resolved)

1. ~~Which OpenAI model to use?~~ → GPT-4o (user specified)
2. ~~Stream responses or wait for complete?~~ → Wait (simpler, responses are short)
3. ~~How to structure prompts?~~ → Single dynamic system prompt with composable instructions
