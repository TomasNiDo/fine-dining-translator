# Data Model: API Security Protection

**Feature**: 007-api-security
**Date**: 2026-01-26

## Entities

### RateLimitRecord

Tracks request counts per user identifier within a time window.

| Field | Type | Description |
|-------|------|-------------|
| identifier | string | Hashed IP address or session ID |
| count | number | Number of requests in current window |
| windowStart | number | Unix timestamp (ms) when window began |

**Lifecycle**:
- Created on first request from an identifier
- Updated on subsequent requests within window
- Reset when window expires (lazy cleanup on next request)
- Evicted on serverless cold start (acceptable trade-off)

**Validation Rules**:
- `count` must be non-negative integer
- `windowStart` must be valid Unix timestamp
- `identifier` should be consistently derived (same IP = same identifier)

### SecurityEvent

Captures security-relevant events for logging and monitoring.

| Field | Type | Description |
|-------|------|-------------|
| type | enum | Event category (see below) |
| timestamp | string | ISO 8601 timestamp |
| ipHash | string | SHA-256 hash of client IP (privacy-preserving) |
| details | object | Event-specific metadata |

**Event Types**:
| Type | Trigger | Details Included |
|------|---------|------------------|
| `RATE_LIMIT_EXCEEDED` | User exceeds 10 req/min | `requestCount`, `windowRemaining` |
| `VALIDATION_FAILED` | Input fails validation | `reason`, `inputLength` |
| `SUSPICIOUS_INPUT` | Potential injection detected | `pattern` (generic category, not actual input) |

**Privacy Considerations**:
- IP addresses are hashed before logging (one-way, not reversible)
- User input content is NOT logged (could contain PII)
- Only metadata about violations is recorded

### RateLimitResult

Returned by rate limit check function.

| Field | Type | Description |
|-------|------|-------------|
| allowed | boolean | Whether request should proceed |
| remaining | number | Requests remaining in window |
| retryAfter | number? | Seconds until window resets (if blocked) |

## Relationships

```
┌─────────────────────┐
│    API Request      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐     ┌─────────────────────┐
│  RateLimitRecord    │────▶│   SecurityEvent     │
│  (in-memory Map)    │     │   (console log)     │
└─────────────────────┘     └─────────────────────┘
          │
          ▼
┌─────────────────────┐
│  RateLimitResult    │
└─────────────────────┘
```

## State Transitions

### Rate Limit Record Lifecycle

```
[No Record] ──first request──▶ [Active Window]
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
            request within window              window expired
                    │                                   │
                    ▼                                   ▼
            [count++, same window]           [reset count=1, new window]
```

### Request Flow States

```
[Incoming Request]
        │
        ▼
[Extract IP] ──failed──▶ [Use 'unknown' identifier]
        │
        ▼
[Check Rate Limit]
        │
   ┌────┴────┐
   │         │
allowed   blocked
   │         │
   ▼         ▼
[Validate]  [429 Response + Log Event]
   │
   ├──valid──▶ [Process Request]
   │
   └──invalid──▶ [400 Response + Log Event]
```

## Types (TypeScript)

```typescript
// Rate limiting types
export interface RateLimitRecord {
  count: number;
  windowStart: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
}

export interface RateLimitConfig {
  limit: number;      // Max requests per window (default: 10)
  windowMs: number;   // Window duration in ms (default: 60000)
}

// Security logging types
export type SecurityEventType =
  | 'RATE_LIMIT_EXCEEDED'
  | 'VALIDATION_FAILED'
  | 'SUSPICIOUS_INPUT';

export interface SecurityEvent {
  type: SecurityEventType;
  timestamp: string;
  ipHash: string;
  details: Record<string, unknown>;
}

// Extended error response (adds rate limit headers)
export interface RateLimitedResponse {
  success: false;
  error: {
    code: 'RATE_LIMITED';
    message: string;
  };
}
```
