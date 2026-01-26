import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt, SYSTEM_PROMPT } from "@/lib/prompts";
import {
  GenerateRequest,
  GenerateResponse,
  GenerateErrorResponse,
  RateLimitResult,
} from "@/lib/types";
import {
  getClientIp,
  checkRateLimit,
  getRateLimitConfig,
} from "@/lib/rate-limit";
import { hashIp, logSecurityEvent } from "@/lib/security-logger";
import { sanitizeInput } from "@/lib/sanitize";

// Lazy-initialize OpenAI client to avoid build-time errors
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

// Helper to add rate limit headers to response
function addRateLimitHeaders(
  headers: Headers,
  rateLimitResult: RateLimitResult
): void {
  const config = getRateLimitConfig();
  headers.set("X-RateLimit-Limit", config.limit.toString());
  headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
  headers.set(
    "X-RateLimit-Reset",
    Math.floor(rateLimitResult.resetTime / 1000).toString()
  );
}

// Error response helper with user-friendly messages
function errorResponse(
  code: string,
  message: string,
  status: number,
  rateLimitResult?: RateLimitResult
): NextResponse<GenerateErrorResponse> {
  const response = NextResponse.json(
    {
      success: false as const,
      error: { code, message },
    },
    { status }
  );

  if (rateLimitResult) {
    addRateLimitHeaders(response.headers, rateLimitResult);
    if (rateLimitResult.retryAfter) {
      response.headers.set("Retry-After", rateLimitResult.retryAfter.toString());
    }
  }

  return response;
}

export async function POST(
  request: Request
): Promise<NextResponse<GenerateResponse | GenerateErrorResponse>> {
  // Extract client IP for rate limiting
  const clientIp = getClientIp(request);
  const ipHash = hashIp(clientIp);

  // Check rate limit first (before any processing)
  const rateLimitResult = checkRateLimit(clientIp);

  if (!rateLimitResult.allowed) {
    // Log rate limit exceeded event
    logSecurityEvent("RATE_LIMIT_EXCEEDED", ipHash, {
      requestCount: getRateLimitConfig().limit,
      retryAfter: rateLimitResult.retryAfter,
    });

    return errorResponse(
      "RATE_LIMITED",
      "The kitchen needs a breather! Please wait a moment before your next order.",
      429,
      rateLimitResult
    );
  }

  // Parse request body
  let body: GenerateRequest;
  try {
    body = await request.json();
  } catch {
    return errorResponse(
      "INVALID_INPUT",
      "Hmm, we couldn't read that request. Please try again.",
      400,
      rateLimitResult
    );
  }

  // Validate dish name exists
  const rawDishName = body.dishName?.trim();
  if (!rawDishName) {
    logSecurityEvent("VALIDATION_FAILED", ipHash, {
      reason: "empty_dish_name",
    });
    return errorResponse(
      "DISH_NAME_REQUIRED",
      "Please enter a dish name to transform.",
      400,
      rateLimitResult
    );
  }

  if (rawDishName.length > 200) {
    logSecurityEvent("VALIDATION_FAILED", ipHash, {
      reason: "dish_name_too_long",
      inputLength: rawDishName.length,
    });
    return errorResponse(
      "DISH_NAME_TOO_LONG",
      "That dish name is quite the mouthful! Please keep it under 200 characters.",
      400,
      rateLimitResult
    );
  }

  // Sanitize input and check for suspicious patterns
  const sanitizeResult = sanitizeInput(rawDishName);
  const dishName = sanitizeResult.sanitized;

  // Log suspicious input (but don't block - treat as literal text)
  if (sanitizeResult.isSuspicious) {
    logSecurityEvent("SUSPICIOUS_INPUT", ipHash, {
      pattern: sanitizeResult.suspiciousPattern,
      inputLength: rawDishName.length,
    });
  }

  // Validate options exist
  if (!body.options) {
    return errorResponse(
      "INVALID_INPUT",
      "Missing options. Please select your preferences and try again.",
      400,
      rateLimitResult
    );
  }

  // Build the prompt with sanitized input
  const prompt = buildPrompt({
    dishName,
    options: body.options,
  });

  // Call OpenAI GPT-4o
  try {
    const completion = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.9, // Higher for creativity
    });

    const description = completion.choices[0]?.message?.content?.trim();

    if (!description) {
      return errorResponse(
        "AI_SERVICE_ERROR",
        "The chef had a creative block. Let's try again.",
        500,
        rateLimitResult
      );
    }

    // Success response with rate limit headers
    const response = NextResponse.json<GenerateResponse>({
      success: true,
      data: {
        originalDish: dishName,
        description,
        style: body.options.style,
        generatedAt: new Date().toISOString(),
      },
    });

    addRateLimitHeaders(response.headers, rateLimitResult);
    return response;
  } catch (error) {
    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return errorResponse(
          "RATE_LIMITED",
          "Our kitchen is too busy right now. Please wait a moment and try again.",
          429,
          rateLimitResult
        );
      }

      if (error.status === 401) {
        console.error("OpenAI API key invalid or missing");
        return errorResponse(
          "AI_SERVICE_ERROR",
          "The chef is on vacation. Please try again later.",
          500,
          rateLimitResult
        );
      }

      if (error.code === "timeout" || error.status === 504) {
        return errorResponse(
          "AI_TIMEOUT",
          "This dish is taking too long to prepare. Please try again.",
          504,
          rateLimitResult
        );
      }
    }

    // Generic error fallback
    console.error("OpenAI API error:", error);
    return errorResponse(
      "AI_SERVICE_ERROR",
      "The chef had a creative block. Let's try again.",
      500,
      rateLimitResult
    );
  }
}
