# Fine Dining Translator - AI Coding Instructions

## Project Overview
A comedic Next.js 14 app that transforms ordinary dish names (e.g., "grilled cheese") into pretentious fine-dining menu descriptions using Gemini 1.5 Flash 8B. The humor comes from the contrast between simple dishes and over-the-top culinary prose.

## Architecture

### Data Flow
1. User selects options in `app/page.tsx` (client component)
2. `POST /api/generate` receives `{ dishName, options }` → validates/sanitizes → builds prompt → calls Gemini
3. Response includes `{ originalDish, description, style, generatedAt }`

### Key Files
- **[lib/types.ts](../lib/types.ts)** - All TypeScript types, constants, and display labels (`RestaurantStyle`, `DescriptionLength`, `TranslatorOptions`)
- **[lib/prompts.ts](../lib/prompts.ts)** - Few-shot examples and prompt engineering (`SYSTEM_PROMPT`, `buildPrompt()`)
- **[app/api/generate/route.ts](../app/api/generate/route.ts)** - API endpoint with rate limiting, sanitization, Gemini integration
- **[lib/rate-limit.ts](../lib/rate-limit.ts)** - In-memory sliding window rate limiter (10 req/min per IP)
- **[lib/sanitize.ts](../lib/sanitize.ts)** - XSS prevention + prompt injection detection (logs but doesn't block)

### Component Pattern
Components in `components/` are presentational. State lives in `app/page.tsx`. UI primitives in `components/ui/` (Tooltip, PillButton, Toggle).

## Conventions

### Adding New Styles or Lengths
1. Add to union type in `lib/types.ts` (e.g., `RestaurantStyle`)
2. Add display label in `STYLE_LABELS` / `LENGTH_LABELS`
3. Add tooltip in `STYLE_TOOLTIPS` / `LENGTH_TOOLTIPS`
4. Add prompt description in `STYLE_DESCRIPTIONS` / `LENGTH_INSTRUCTIONS` in `lib/prompts.ts`
5. Add few-shot example variant if needed

### API Error Responses
Return typed `GenerateErrorResponse` with user-friendly, themed messages:
```typescript
return errorResponse(
  "RATE_LIMITED",  // code for client logic
  "The kitchen needs a breather! Please wait a moment before your next order.",  // themed message
  429,
  rateLimitResult
);
```

### Prompt Engineering
Few-shot examples in `lib/prompts.ts` teach the comedic "pretentious buildup → mundane reveal" pattern. The `addReveal` toggle controls whether descriptions end with self-deprecating reveals like "...but let's be honest, it's just grilled cheese."

## Design System

### Colors (Tailwind)
Use semantic tokens defined in `tailwind.config.ts`:
- `cream` / `cream-light` - backgrounds
- `charcoal` - primary text
- `tan-outline` - decorative borders
- `purple-btn` / `purple-btn-light` - primary CTA

### Typography
- `font-heading` (Playfair Display) - titles, menu headings
- `font-body` (Inter) - body text, UI elements

## Development

### Commands
```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run lint   # ESLint check
```

### Environment Variables
```env
GEMINI_API_KEY=...  # Required - server-side only
```

### Security Notes
- Gemini key is server-side only (never exposed to client)
- Input sanitization: HTML entities encoded, prompt injection patterns logged
- Rate limit: 10 requests/minute per IP (in-memory, resets on cold start)

## Specs Directory
Feature specifications live in `specs/{number}-{feature}/`. Each includes `spec.md`, `plan.md`, `tasks.md`. Use these for understanding feature requirements and design decisions.
