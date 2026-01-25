# Implementation Plan: AI-Powered Dish Generation

**Branch**: `002-ai-dish-generation` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-ai-dish-generation/spec.md`

## Summary

Replace the template-based dish translation engine with OpenAI GPT-4o to generate unique, creative pretentious menu descriptions. The AI will respect user-selected restaurant style (6 levels), description length (4 levels), and optional pretension toggles (reveal, chef ego, techniques). The existing UI remains unchanged; only the generation logic is replaced.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14 (App Router)
**Primary Dependencies**: Next.js 14, React 18, Tailwind CSS, OpenAI SDK (new)
**Storage**: N/A (stateless - no persistence required)
**Testing**: Manual testing (no test framework currently configured)
**Target Platform**: Web browser (responsive, mobile-first)
**Project Type**: Web application (single Next.js project)
**Performance Goals**: <5 second response time for AI generation (per SC-001)
**Constraints**: API key must remain server-side; graceful error handling required
**Scale/Scope**: Single-user client-side app, no concurrent user considerations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. User Delight** | ✅ PASS | AI generation enhances entertainment value with creative, unique outputs |
| **II. Simplicity** | ✅ PASS | Single new dependency (OpenAI SDK) justified - no simpler way to add AI |
| **III. Accessibility** | ✅ PASS | No UI changes; generated text remains readable by screen readers |
| **Response time <2s** | ⚠️ RISK | AI may exceed 2s; spec allows 5s - document as accepted deviation |
| **No silent failures** | ✅ PASS | FR-006 requires graceful error handling with user-friendly messages |

**Deviation Justification**: Constitution specifies <2 second response time. AI generation inherently takes longer. Spec defines 5 second target (SC-001) which balances user experience with AI capabilities. This is an acceptable tradeoff given the significantly enhanced entertainment value.

## Project Structure

### Documentation (this feature)

```text
specs/002-ai-dish-generation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.yaml         # OpenAPI spec for /api/generate endpoint
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── api/
│   └── generate/
│       └── route.ts     # NEW: Server-side API route for OpenAI calls
├── layout.tsx           # Existing (no changes)
├── page.tsx             # MODIFY: Update to call API route instead of sync function
├── globals.css          # Existing (no changes)
└── favicon.ico          # Existing (no changes)

components/              # Existing (no changes to any components)
├── DishInput.tsx
├── GenerateButton.tsx
├── Header.tsx
├── LengthSelector.tsx
├── MenuCard.tsx
├── StyleSelector.tsx
├── ToggleGroup.tsx
└── ui/
    ├── PillButton.tsx
    └── Toggle.tsx

lib/
├── types.ts             # MODIFY: Add error types, update TranslationResult
├── translator.ts        # REMOVE: No longer needed (replaced by API route)
├── prompts.ts           # NEW: AI prompt templates for each style/length
└── data/
    └── templates.ts     # REMOVE: No longer needed (templates replaced by AI)
```

**Structure Decision**: Maintain existing Next.js App Router structure. Add single API route at `/api/generate` for server-side OpenAI calls. This keeps API key secure and follows Next.js conventions.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Response time >2s | AI generation inherently slower | Templates were faster but repetitive/less entertaining |
| New dependency (openai) | Required for GPT-4o integration | No simpler way to call OpenAI API |

## Implementation Approach

### Phase 0: Research (Complete)
See [research.md](./research.md) for GPT-4o integration patterns, prompt engineering strategies, and error handling approaches.

### Phase 1: Design (Complete)
- [data-model.md](./data-model.md) - Request/response types
- [contracts/api.yaml](./contracts/api.yaml) - API endpoint specification
- [quickstart.md](./quickstart.md) - Setup and testing guide

### Phase 2: Tasks (Next Step)
Run `/speckit.tasks` to generate implementation tasks from this plan.
