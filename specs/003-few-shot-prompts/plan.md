# Implementation Plan: Few-Shot Prompt Examples

**Branch**: `003-few-shot-prompts` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-few-shot-prompts/spec.md`

## Summary

Add 2-3 few-shot examples to the AI prompt in `lib/prompts.ts` that demonstrate the comedic pattern: elaborate pretentious description building to a mundane reveal. This teaches the model the joke structure by example rather than instruction alone.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14 (App Router)
**Primary Dependencies**: OpenAI SDK (^6.16.0), React 18, Tailwind CSS
**Storage**: N/A (stateless)
**Testing**: Manual testing via UI (no test framework currently configured)
**Target Platform**: Web (modern browsers)
**Project Type**: Web application (Next.js)
**Performance Goals**: <2 seconds response time (per constitution)
**Constraints**: Prompt must stay within reasonable token limits
**Scale/Scope**: Single prompt modification, minimal code changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| I. User Delight | Output descriptions MUST be genuinely creative and amusing | ✅ PASS | Few-shot examples will improve humor consistency |
| I. User Delight | Response time MUST remain snappy (<2 seconds) | ⚠️ MONITOR | Adding examples increases prompt size; verify performance |
| II. Simplicity | Solutions MUST use the simplest approach | ✅ PASS | Modifying existing prompt builder, no new dependencies |
| II. Simplicity | Avoid premature abstraction | ✅ PASS | Hardcoded examples are simpler than dynamic generation |
| III. Accessibility | Generated text MUST be readable by screen readers | ✅ PASS | No accessibility changes |
| Quality Standards | No Silent Failures | ✅ PASS | No new error scenarios |

**Gate Result**: ✅ PASS - No violations. Monitor token usage impact on latency.

## Project Structure

### Documentation (this feature)

```text
specs/003-few-shot-prompts/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal - no data model changes)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API changes)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
lib/
├── prompts.ts           # PRIMARY: Add few-shot examples here
└── types.ts             # No changes needed

app/
├── api/generate/route.ts # No changes needed (uses buildPrompt)
└── page.tsx             # No changes needed
```

**Structure Decision**: Minimal changes - only `lib/prompts.ts` needs modification. The existing `buildPrompt()` function will be extended to include few-shot examples in the prompt string.

## Complexity Tracking

> No violations to justify. This feature adds minimal complexity.
