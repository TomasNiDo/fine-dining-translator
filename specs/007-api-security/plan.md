# Implementation Plan: API Security Protection

**Branch**: `007-api-security` | **Date**: 2026-01-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-api-security/spec.md`

## Summary

Implement security measures to protect the Fine Dining Translator from API abuse and ensure the OpenAI API key remains server-side only. The approach uses IP-based rate limiting with in-memory storage (suitable for Vercel's serverless environment), input sanitization, and structured logging for security events.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 14 (App Router)
**Primary Dependencies**: Next.js 14, React 18, Tailwind CSS, OpenAI SDK (^6.16.0)
**Storage**: In-memory rate limit tracking (Map-based, resets on cold start) - N/A for persistent storage
**Testing**: Manual testing (no test framework currently configured)
**Target Platform**: Vercel serverless (Node.js runtime)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: <2 second response time (per constitution), rate limit check <10ms overhead
**Constraints**: Stateless serverless environment (rate limits may reset on cold starts), no external dependencies for rate limiting
**Scale/Scope**: Low-traffic hobby project, protecting against casual abuse rather than sophisticated attacks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| **I. User Delight** | Error states handled with humor-appropriate messaging | ✅ PASS | Rate limit messages will use playful tone ("The kitchen needs a breather!") |
| **I. User Delight** | Response time <2 seconds | ✅ PASS | Rate limit check adds <10ms overhead |
| **II. Simplicity** | Simplest approach that solves the problem | ✅ PASS | In-memory Map vs. Redis/external service |
| **II. Simplicity** | New dependencies justified | ✅ PASS | No new dependencies required |
| **II. Simplicity** | Avoid premature abstraction | ✅ PASS | Single rate-limit module, no middleware framework |
| **III. Accessibility** | Error messages readable | ✅ PASS | Plain text error responses |
| **Quality Standards** | No silent failures | ✅ PASS | All security events logged, user always receives feedback |

**Gate Result**: ✅ PASSED - No violations requiring justification

## Project Structure

### Documentation (this feature)

```text
specs/007-api-security/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.yaml         # OpenAPI spec for rate-limited endpoint
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
app/
├── api/
│   └── generate/
│       └── route.ts     # MODIFY: Add rate limiting, input sanitization, logging
lib/
├── types.ts             # MODIFY: Add rate limit types
├── prompts.ts           # Existing (no changes needed)
├── rate-limit.ts        # NEW: Rate limiting logic
├── sanitize.ts          # NEW: Input sanitization utilities
└── security-logger.ts   # NEW: Security event logging
```

**Structure Decision**: Single web application structure (existing Next.js App Router). Security utilities added to `lib/` to keep API route clean. No separate backend/frontend split needed.

## Complexity Tracking

> No violations requiring justification - all solutions use simplest viable approach.

| Decision | Approach Chosen | Simpler Alternative Considered |
|----------|-----------------|-------------------------------|
| Rate limiting | In-memory Map | None simpler exists for serverless |
| User identification | IP address from headers | Session tokens would add auth complexity |
| Logging | Console.log with structured format | File logging would need I/O handling |

---

## Post-Design Constitution Re-Check

*Re-evaluated after Phase 1 design completion.*

| Principle | Post-Design Status | Design Artifacts |
|-----------|-------------------|------------------|
| **I. User Delight** | ✅ CONFIRMED | `contracts/api.yaml` - playful error messages defined |
| **II. Simplicity** | ✅ CONFIRMED | 3 small utility files, no new dependencies |
| **III. Accessibility** | ✅ CONFIRMED | Plain text responses, no visual changes |
| **Quality Standards** | ✅ CONFIRMED | `data-model.md` - all events logged |

**Post-Design Gate**: ✅ PASSED - Design maintains all constitutional requirements

---

## Generated Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| Research | `specs/007-api-security/research.md` | ✅ Complete |
| Data Model | `specs/007-api-security/data-model.md` | ✅ Complete |
| API Contract | `specs/007-api-security/contracts/api.yaml` | ✅ Complete |
| Quickstart | `specs/007-api-security/quickstart.md` | ✅ Complete |
| Agent Context | `CLAUDE.md` | ✅ Updated |

**Next Step**: Run `/speckit.tasks` to generate implementation tasks
