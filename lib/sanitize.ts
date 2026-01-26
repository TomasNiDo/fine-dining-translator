/**
 * Input sanitization utilities for security protection.
 * Prevents XSS and handles prompt injection by treating input as literal text.
 */

// Common patterns that may indicate prompt injection attempts
// We don't block these - we just flag them for logging
const SUSPICIOUS_PATTERNS = [
  /ignore\s+(all\s+)?previous/i,
  /disregard\s+(all\s+)?instructions/i,
  /you\s+are\s+now/i,
  /pretend\s+to\s+be/i,
  /act\s+as\s+(if|a)/i,
  /system\s*:/i,
  /\[\[.*\]\]/,
  /```[\s\S]*```/,
];

export interface SanitizeResult {
  sanitized: string;
  isSuspicious: boolean;
  suspiciousPattern?: string;
}

/**
 * Sanitize user input for safe use in prompts and display.
 * - Trims whitespace
 * - Encodes HTML entities to prevent XSS
 * - Detects (but doesn't block) suspicious injection patterns
 */
export function sanitizeInput(input: string): SanitizeResult {
  // Trim whitespace
  let sanitized = input.trim();

  // HTML entity encoding for XSS prevention
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

  // Check for suspicious patterns (for logging, not blocking)
  let isSuspicious = false;
  let suspiciousPattern: string | undefined;

  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(input)) {
      isSuspicious = true;
      // Store a generic description, not the actual match (privacy)
      suspiciousPattern = "potential_injection";
      break;
    }
  }

  return {
    sanitized,
    isSuspicious,
    suspiciousPattern,
  };
}

/**
 * Quick sanitize without suspicious pattern detection.
 * Use when you just need safe output without logging.
 */
export function quickSanitize(input: string): string {
  return input
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
