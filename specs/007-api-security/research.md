# Research: API Security Protection

**Feature**: 007-api-security
**Date**: 2026-01-26

## Research Questions

### 1. Rate Limiting in Vercel Serverless Environment

**Question**: How to implement rate limiting in a stateless serverless environment without external dependencies?

**Decision**: Use in-memory Map with sliding window algorithm

**Rationale**:
- Vercel serverless functions share memory within a single instance during warm state
- In-memory approach requires zero dependencies and zero configuration
- Sliding window provides smoother rate limiting than fixed windows
- Trade-off: Rate limits reset on cold starts, but this is acceptable for a hobby project protecting against casual abuse

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|--------------|
| Vercel KV / Redis | Adds external dependency, cost, and complexity for a hobby project |
| Upstash Rate Limit SDK | External service dependency; overkill for current scale |
| Database-backed tracking | No database in this project; would add significant complexity |
| Client-side rate limiting only | Easily bypassed; provides no real protection |

**Implementation Pattern**:
```typescript
// Sliding window rate limiter
const requestCounts = new Map<string, { count: number; windowStart: number }>();

function checkRateLimit(identifier: string, limit: number, windowMs: number): { allowed: boolean; retryAfter?: number }
```

### 2. IP Address Extraction in Next.js on Vercel

**Question**: How to reliably get client IP address for rate limiting in Next.js App Router?

**Decision**: Use `x-forwarded-for` header with `x-real-ip` fallback

**Rationale**:
- Vercel sets these headers automatically for all requests
- `x-forwarded-for` contains the original client IP as the first value
- Fallback chain ensures IP is always available
- No need for additional middleware or configuration

**Implementation Pattern**:
```typescript
function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  return 'unknown'; // Fallback for local development
}
```

### 3. Input Sanitization for LLM Prompts

**Question**: How to protect against prompt injection while maintaining functionality?

**Decision**: Treat all input as literal text data, not instructions; use strict character limits and HTML entity encoding

**Rationale**:
- Prompt injection is fundamentally about confusing instruction vs. data boundaries
- By placing user input within clear "data" delimiters in the prompt, injection attempts become literal text
- Character limit (200) already exists; prevents long injection payloads
- HTML encoding prevents XSS if descriptions are ever displayed as HTML
- No blocklist approach (too easy to bypass with creative spelling)

**Implementation Pattern**:
```typescript
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .slice(0, 200);
}
```

**Prompt Structure** (already in place, verify):
```
System: You are a menu description writer...
User: Create a description for this dish: """[USER INPUT]"""
```

The triple-quote delimiter clearly marks user input as data, not instructions.

### 4. Security Event Logging Best Practices

**Question**: What should be logged for security events and in what format?

**Decision**: Structured JSON logging to console (captured by Vercel's logging)

**Rationale**:
- Vercel captures all console output in their logging dashboard
- JSON format enables filtering and searching in log viewers
- Include: event type, timestamp, IP (hashed for privacy), request details
- Exclude: full API keys, user content that might be sensitive

**Implementation Pattern**:
```typescript
interface SecurityEvent {
  type: 'RATE_LIMIT_EXCEEDED' | 'VALIDATION_FAILED' | 'SUSPICIOUS_INPUT';
  timestamp: string;
  ipHash: string;  // SHA-256 of IP for privacy
  details: Record<string, unknown>;
}

function logSecurityEvent(event: SecurityEvent): void {
  console.log(JSON.stringify({ security: event }));
}
```

### 5. API Key Protection Verification

**Question**: Is the current architecture sufficient for API key protection?

**Decision**: Current architecture is secure; add verification checklist

**Rationale**:
- API key is stored in environment variable (`.env.local`, Vercel env)
- OpenAI client is instantiated server-side only in API route
- No `NEXT_PUBLIC_` prefix means key is never bundled to client
- Request to `/api/generate` doesn't expose key in headers or responses

**Verification Checklist**:
- [x] API key in server-side environment variable only
- [x] No `NEXT_PUBLIC_OPENAI_API_KEY` anywhere in codebase
- [x] OpenAI client created in API route, not in shared client code
- [x] Error responses don't include API key or reveal its presence
- [ ] Add `.env.local` to `.gitignore` (verify)
- [ ] Remove any hardcoded keys from history if present

## Research Summary

All technical questions resolved. No external dependencies needed. Implementation uses:
- In-memory sliding window rate limiter
- IP extraction from standard headers
- HTML entity encoding for sanitization
- Structured JSON logging to console
- Existing secure API key handling (verified)

**Ready for Phase 1: Design & Contracts**
