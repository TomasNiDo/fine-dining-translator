import { RateLimitRecord, RateLimitResult, RateLimitConfig } from "./types";

// Default configuration: 10 requests per minute
const DEFAULT_CONFIG: RateLimitConfig = {
  limit: 10,
  windowMs: 60 * 1000, // 1 minute in milliseconds
};

// In-memory storage for rate limit records
// Note: Resets on serverless cold start (acceptable for hobby project)
const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Extract client IP address from request headers.
 * Vercel sets x-forwarded-for automatically.
 */
export function getClientIp(request: Request): string {
  // x-forwarded-for may contain multiple IPs; take the first (original client)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  // Fallback to x-real-ip
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Local development fallback
  return "127.0.0.1";
}

/**
 * Check if a request is within rate limits using sliding window algorithm.
 * Returns whether the request is allowed and rate limit metadata.
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // No existing record - first request
  if (!record) {
    rateLimitStore.set(identifier, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: config.limit - 1,
      resetTime: now + config.windowMs,
    };
  }

  const windowEnd = record.windowStart + config.windowMs;

  // Window has expired - reset
  if (now >= windowEnd) {
    rateLimitStore.set(identifier, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: config.limit - 1,
      resetTime: now + config.windowMs,
    };
  }

  // Within window - check count
  if (record.count >= config.limit) {
    const retryAfter = Math.ceil((windowEnd - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      resetTime: windowEnd,
    };
  }

  // Within window and under limit - increment
  record.count++;
  return {
    allowed: true,
    remaining: config.limit - record.count,
    resetTime: windowEnd,
  };
}

/**
 * Get the default rate limit configuration.
 * Useful for adding headers to responses.
 */
export function getRateLimitConfig(): RateLimitConfig {
  return { ...DEFAULT_CONFIG };
}
