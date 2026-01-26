# Tasks: API Security Protection

**Input**: Design documents from `/specs/007-api-security/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: No automated tests requested (manual testing per quickstart.md)

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1, US2, US3, US4)
- File paths relative to repository root

---

## Phase 1: Setup

**Purpose**: Add TypeScript types for security features

- [x] T001 Add rate limit types (RateLimitRecord, RateLimitResult, RateLimitConfig) to lib/types.ts
- [x] T002 Add security event types (SecurityEventType, SecurityEvent) to lib/types.ts

---

## Phase 2: Foundational (Shared Security Infrastructure)

**Purpose**: Core security utilities that multiple user stories depend on

**⚠️ CRITICAL**: US1 and US4 both depend on these utilities

- [x] T003 [P] Create security logger module with hashIp() and logSecurityEvent() in lib/security-logger.ts
- [x] T004 [P] Create IP extraction utility getClientIp() in lib/rate-limit.ts

**Checkpoint**: Security infrastructure ready - user story implementation can begin

---

## Phase 3: User Story 1 - Rate Limiting Protection (Priority: P1) 🎯 MVP

**Goal**: Enforce 10 requests per minute per user to protect API costs

**Independent Test**: Make 11 rapid requests via curl - 11th should return 429 with playful message

### Implementation for User Story 1

- [x] T005 [US1] Implement sliding window rate limiter checkRateLimit() in lib/rate-limit.ts
- [x] T006 [US1] Add rate limit check at start of POST handler in app/api/generate/route.ts
- [x] T007 [US1] Add rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) to all responses in app/api/generate/route.ts
- [x] T008 [US1] Add 429 response with playful message ("The kitchen needs a breather!") in app/api/generate/route.ts
- [x] T009 [US1] Add Retry-After header to 429 responses in app/api/generate/route.ts
- [x] T010 [US1] Log RATE_LIMIT_EXCEEDED events using security logger in app/api/generate/route.ts

**Checkpoint**: Rate limiting functional - verify with 11 rapid requests returning 429 on 11th

---

## Phase 4: User Story 2 - Input Validation & Sanitization (Priority: P1)

**Goal**: Sanitize all inputs to prevent XSS and handle prompt injection safely

**Independent Test**: Submit `<script>alert(1)</script>` as dish name - should be sanitized to `&lt;script&gt;alert(1)&lt;/script&gt;`

### Implementation for User Story 2

- [x] T011 [P] [US2] Create input sanitization module with sanitizeInput() in lib/sanitize.ts
- [x] T012 [US2] Integrate sanitizeInput() before buildPrompt() call in app/api/generate/route.ts
- [x] T013 [US2] Log VALIDATION_FAILED events for rejected inputs in app/api/generate/route.ts
- [x] T014 [US2] Verify prompt structure uses triple-quote delimiters for user input in lib/prompts.ts

**Checkpoint**: Input sanitization working - HTML tags converted to entities, prompt injection treated as literal text

---

## Phase 5: User Story 3 - API Key Protection (Priority: P1)

**Goal**: Verify OpenAI API key is never exposed to clients

**Independent Test**: Inspect network requests, view page source, search JS bundles for "sk-" pattern - no matches

### Verification for User Story 3

- [x] T015 [US3] Verify .env.local is in .gitignore
- [x] T016 [US3] Verify no NEXT_PUBLIC_OPENAI_API_KEY exists in codebase (grep search)
- [x] T017 [US3] Verify error responses don't include API key or hints about it in app/api/generate/route.ts
- [x] T018 [US3] Document API key security architecture in specs/007-api-security/quickstart.md

**Checkpoint**: API key security verified - no exposure vectors found

---

## Phase 6: User Story 4 - Abuse Monitoring (Priority: P2)

**Goal**: Log security events for visibility into abuse patterns

**Independent Test**: Trigger rate limit and validation errors, verify JSON logs appear in console

### Implementation for User Story 4

- [x] T019 [US4] Ensure all security events use consistent JSON format in lib/security-logger.ts
- [x] T020 [US4] Add SUSPICIOUS_INPUT detection for common injection patterns in lib/sanitize.ts
- [x] T021 [US4] Log SUSPICIOUS_INPUT events (without logging actual content) in app/api/generate/route.ts
- [x] T022 [US4] Verify logs appear in Vercel dashboard (deploy and test)

**Checkpoint**: Security events visible in Vercel logs with searchable JSON format

---

## Phase 7: Polish & Verification

**Purpose**: Final validation and documentation

- [x] T023 Run full manual test suite from quickstart.md
- [x] T024 Verify all rate limit edge cases (cold start, concurrent requests)
- [x] T025 Update quickstart.md Definition of Done checklist with test results
- [x] T026 Deploy to Vercel and verify production behavior

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ←── BLOCKS ALL USER STORIES
    ↓
┌───┴───┬───────┬───────┐
↓       ↓       ↓       ↓
US1     US2     US3     US4
(P1)    (P1)    (P1)    (P2)
└───┬───┴───┬───┴───────┘
    ↓
Phase 7 (Polish)
```

### User Story Dependencies

| Story | Depends On | Can Run In Parallel With |
|-------|-----------|-------------------------|
| US1 (Rate Limiting) | Phase 2 | US2, US3 |
| US2 (Input Sanitization) | Phase 2 | US1, US3 |
| US3 (API Key Protection) | None (verification only) | US1, US2, US4 |
| US4 (Abuse Monitoring) | Phase 2 (logging infra) | US1, US2, US3 |

### Within Each User Story

1. Utility functions first (lib/)
2. Integration into route.ts second
3. Logging integration last

### Parallel Opportunities

**Phase 2** (after Phase 1):
```
T003 [P] lib/security-logger.ts
T004 [P] lib/rate-limit.ts (getClientIp only)
```

**After Phase 2** (all can run in parallel):
```
US1: T005-T010 (rate limiting)
US2: T011-T014 (sanitization)
US3: T015-T018 (verification)
US4: T019-T022 (monitoring)
```

---

## Parallel Example: Starting Implementation

```bash
# After Phase 2 completes, launch US1 and US2 in parallel:

# US1 - Rate Limiting
Task: "T005 [US1] Implement sliding window rate limiter checkRateLimit() in lib/rate-limit.ts"

# US2 - Input Sanitization
Task: "T011 [P] [US2] Create input sanitization module with sanitizeInput() in lib/sanitize.ts"

# US3 - Verification (no code changes needed)
Task: "T015 [US3] Verify .env.local is in .gitignore"
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup (types)
2. Complete Phase 2: Foundational (logger, IP extraction)
3. Complete Phase 3: US1 - Rate Limiting
4. **STOP and VALIDATE**: Test with 11 rapid requests
5. Deploy to verify rate limiting works in production

### Incremental Delivery

1. Setup + Foundational → Infrastructure ready
2. Add US1 (Rate Limiting) → Test → **Deploy (MVP!)**
3. Add US2 (Input Sanitization) → Test → Deploy
4. Add US3 (API Key Verification) → Document → No deploy needed
5. Add US4 (Abuse Monitoring) → Test in Vercel logs → Deploy

### File Touch Summary

| File | Tasks | Changes |
|------|-------|---------|
| lib/types.ts | T001, T002 | Add security types |
| lib/security-logger.ts | T003, T019 | NEW: Logging utilities |
| lib/rate-limit.ts | T004, T005 | NEW: Rate limiting logic |
| lib/sanitize.ts | T011, T020 | NEW: Input sanitization |
| lib/prompts.ts | T014 | Verify (no changes expected) |
| app/api/generate/route.ts | T006-T010, T012, T013, T017, T021 | Integrate all security |

---

## Notes

- **No new dependencies**: All functionality uses built-in Node.js/Web APIs
- **Manual testing only**: No test framework configured; use curl commands from quickstart.md
- **Playful tone**: Error messages must match existing style ("The kitchen needs a breather!")
- **Privacy**: IP addresses are hashed before logging; user input content is never logged
- **Cold start tolerance**: Rate limits may reset on serverless cold starts (acceptable for hobby project)
