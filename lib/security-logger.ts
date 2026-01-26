import { SecurityEvent, SecurityEventType } from "./types";

/**
 * Hash an IP address for privacy-preserving logging.
 * Uses a simple hash since we don't need cryptographic security,
 * just consistent anonymization.
 */
export function hashIp(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

/**
 * Log a security event in structured JSON format.
 * Captured by Vercel's logging dashboard for searchability.
 */
export function logSecurityEvent(
  type: SecurityEventType,
  ipHash: string,
  details: Record<string, unknown>
): void {
  const event: SecurityEvent = {
    type,
    timestamp: new Date().toISOString(),
    ipHash,
    details,
  };

  console.log(JSON.stringify({ security: event }));
}
