# fine-dining-translator Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-26

## Active Technologies
- TypeScript 5.x with Next.js 14 (App Router) + Next.js 14, React 18, Tailwind CSS, OpenAI SDK (new) (002-ai-dish-generation)
- N/A (stateless - no persistence required) (002-ai-dish-generation)
- TypeScript 5.x with Next.js 14 (App Router) + OpenAI SDK (^6.16.0), React 18, Tailwind CSS (003-few-shot-prompts)
- N/A (stateless) (003-few-shot-prompts)
- TypeScript 5.x with Next.js 14 (App Router) + React 18, Tailwind CSS, OpenAI SDK (^6.16.0), Lucide React (icons) (004-copy-sentence-case)
- TypeScript 5.x with Next.js 14 (App Router) + React 18, Tailwind CSS 3.4.1, Lucide React, OpenAI SDK (005-ui-redesign)
- TypeScript 5.x with Next.js 14 (App Router) + React 18, Tailwind CSS 3.4.1, Lucide React (icons) (006-option-tooltips)
- N/A (stateless - tooltip content is static) (006-option-tooltips)
- TypeScript 5.x with Next.js 14 (App Router) + Next.js 14, React 18, Tailwind CSS, OpenAI SDK (^6.16.0) (007-api-security)
- In-memory rate limit tracking (Map-based, resets on cold start) - N/A for persistent storage (007-api-security)
- TypeScript 5.x with Next.js 14 (App Router) + @vercel/analytics (new), React 18, Next.js 14.2.35 (008-vercel-analytics)
- N/A (analytics data stored by Vercel, no local persistence) (008-vercel-analytics)

- TypeScript 5.x with Next.js 14 (App Router) + Next.js 14, Tailwind CSS, Lucide React (icons) (001-fine-dining-translator)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x with Next.js 14 (App Router): Follow standard conventions

## Recent Changes
- 008-vercel-analytics: Added TypeScript 5.x with Next.js 14 (App Router) + @vercel/analytics (new), React 18, Next.js 14.2.35
- 007-api-security: Added TypeScript 5.x with Next.js 14 (App Router) + Next.js 14, React 18, Tailwind CSS, OpenAI SDK (^6.16.0)
- 006-option-tooltips: Added TypeScript 5.x with Next.js 14 (App Router) + React 18, Tailwind CSS 3.4.1, Lucide React (icons)


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
