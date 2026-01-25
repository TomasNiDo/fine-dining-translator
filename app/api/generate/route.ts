import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt, SYSTEM_PROMPT } from "@/lib/prompts";
import {
  GenerateRequest,
  GenerateResponse,
  GenerateErrorResponse,
} from "@/lib/types";

// Initialize OpenAI client (API key from environment)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Error response helper with user-friendly messages
function errorResponse(
  code: string,
  message: string,
  status: number
): NextResponse<GenerateErrorResponse> {
  return NextResponse.json(
    {
      success: false as const,
      error: { code, message },
    },
    { status }
  );
}

export async function POST(
  request: Request
): Promise<NextResponse<GenerateResponse | GenerateErrorResponse>> {
  // Parse request body
  let body: GenerateRequest;
  try {
    body = await request.json();
  } catch {
    return errorResponse(
      "INVALID_INPUT",
      "Hmm, we couldn't read that request. Please try again.",
      400
    );
  }

  // Validate dish name
  const dishName = body.dishName?.trim();
  if (!dishName) {
    return errorResponse(
      "DISH_NAME_REQUIRED",
      "Please enter a dish name to transform.",
      400
    );
  }

  if (dishName.length > 200) {
    return errorResponse(
      "DISH_NAME_TOO_LONG",
      "That dish name is quite the mouthful! Please keep it under 200 characters.",
      400
    );
  }

  // Validate options exist
  if (!body.options) {
    return errorResponse(
      "INVALID_INPUT",
      "Missing options. Please select your preferences and try again.",
      400
    );
  }

  // Build the prompt
  const prompt = buildPrompt({
    dishName,
    options: body.options,
  });
  // Call OpenAI GPT-4o
  try {
    const completion = await openai.chat.completions.create({
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
        500
      );
    }

    // Success response
    const response: GenerateResponse = {
      success: true,
      data: {
        originalDish: dishName,
        description,
        style: body.options.style,
        generatedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return errorResponse(
          "RATE_LIMITED",
          "Our kitchen is too busy right now. Please wait a moment and try again.",
          429
        );
      }

      if (error.status === 401) {
        console.error("OpenAI API key invalid or missing");
        return errorResponse(
          "AI_SERVICE_ERROR",
          "The chef is on vacation. Please try again later.",
          500
        );
      }

      if (error.code === "timeout" || error.status === 504) {
        return errorResponse(
          "AI_TIMEOUT",
          "This dish is taking too long to prepare. Please try again.",
          504
        );
      }
    }

    // Generic error fallback
    console.error("OpenAI API error:", error);
    return errorResponse(
      "AI_SERVICE_ERROR",
      "The chef had a creative block. Let's try again.",
      500
    );
  }
}
