# Quickstart: API Security Protection

**Feature**: 007-api-security
**Estimated Scope**: 3 new files, 1 modified file

## Prerequisites

- Node.js 20+ installed
- Repository cloned and on `007-api-security` branch
- `npm install` completed
- `.env.local` with `OPENAI_API_KEY` set

## Implementation Overview

### New Files to Create

1. **`lib/rate-limit.ts`** - Rate limiting logic
   - `checkRateLimit(ip: string): RateLimitResult`
   - `getClientIp(request: Request): string`
   - In-memory Map storage with sliding window

2. **`lib/sanitize.ts`** - Input sanitization
   - `sanitizeInput(input: string): string`
   - HTML entity encoding for `<` and `>`
   - Trim and length enforcement

3. **`lib/security-logger.ts`** - Security event logging
   - `logSecurityEvent(event: SecurityEvent): void`
   - `hashIp(ip: string): string`
   - JSON structured output to console

### Files to Modify

4. **`app/api/generate/route.ts`** - Integrate security measures
   - Add rate limit check before processing
   - Add input sanitization before AI call
   - Add rate limit headers to responses
   - Log security events

## Quick Test Plan

After implementation, verify with these manual tests:

### Rate Limiting
```bash
# Make 11 rapid requests - 11th should return 429
for i in {1..11}; do
  curl -X POST http://localhost:3000/api/generate \
    -H "Content-Type: application/json" \
    -d '{"dishName":"test","options":{"style":"gastropub","length":"short","addReveal":false,"addChefEgo":false,"addTechniques":false}}'
  echo ""
done
```

### Input Validation
```bash
# Test with HTML tags - should be sanitized
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"dishName":"<script>alert(1)</script>","options":{"style":"gastropub","length":"short","addReveal":false,"addChefEgo":false,"addTechniques":false}}'

# Test with excessively long input - should return 400
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"dishName":"'"$(python3 -c "print('a'*201)")"'","options":{"style":"gastropub","length":"short","addReveal":false,"addChefEgo":false,"addTechniques":false}}'
```

### Security Logging
```bash
# Run dev server and watch logs
npm run dev

# Trigger rate limit, then check terminal for JSON log entries like:
# {"security":{"type":"RATE_LIMIT_EXCEEDED","timestamp":"...","ipHash":"...","details":{...}}}
```

## Key Implementation Notes

1. **Rate limit resets on cold start** - This is acceptable for the current scale. If this becomes a problem, consider Vercel KV.

2. **IP from headers** - Use `x-forwarded-for` first, fallback to `x-real-ip`. Vercel sets these automatically.

3. **Playful error messages** - Keep the tone consistent with existing errors (e.g., "The kitchen needs a breather!").

4. **No new dependencies** - All functionality uses built-in Node.js and Web APIs.

## API Key Security Architecture

The OpenAI API key is protected through multiple layers:

| Layer | Protection | Verification |
|-------|------------|--------------|
| **Storage** | Server-side environment variable only (`OPENAI_API_KEY`) | `.env.local` in `.gitignore` |
| **Naming** | No `NEXT_PUBLIC_` prefix | Key never bundled to client |
| **Initialization** | Lazy initialization in API route only | No client-side imports |
| **Error Handling** | Generic messages ("The chef is on vacation") | No key hints in errors |
| **Logging** | IP hashed, no sensitive data logged | Console output sanitized |
| **Network** | All OpenAI calls server-side via `/api/generate` | Key never in browser requests |

**Verification Commands**:
```bash
# Check no NEXT_PUBLIC exposure
grep -r "NEXT_PUBLIC_OPENAI" . --include="*.ts" --include="*.tsx"
# Expected: No results

# Check .gitignore coverage
grep "env" .gitignore
# Expected: .env*.local listed

# Check error responses (run server first)
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"dishName":"test"}' 2>&1 | grep -i "key\|sk-"
# Expected: No results
```

## Definition of Done

- [x] Rate limit enforced: 10 req/min returns 429 on 11th
- [x] Rate limit headers present on all responses (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)
- [x] Input sanitized: `<script>` becomes `&lt;script&gt;` (plus &, ", ')
- [x] Security events logged as JSON to console (RATE_LIMIT_EXCEEDED, VALIDATION_FAILED, SUSPICIOUS_INPUT)
- [x] Existing functionality unchanged for normal use
- [x] No API key exposure in responses or logs
- [x] Build succeeds without errors
- [ ] Production deployment verified on Vercel
