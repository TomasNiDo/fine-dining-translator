"use client";

import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import { TranslationResult } from "@/lib/types";

interface MenuCardProps {
  result: TranslationResult;
  isLoading?: boolean;
}

type CopyState = "idle" | "copied" | "error";

// Corner flourish star/diamond SVG
function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14 8L20 6L16 12L22 14L16 16L20 22L14 18L12 24L10 18L4 22L8 16L2 14L8 12L4 6L10 8L12 2Z" />
    </svg>
  );
}

// Whisk decoration SVG
function WhiskDecoration() {
  return (
    <svg className="w-8 h-8 mx-auto mt-4 text-tan-outline" viewBox="0 0 40 50" fill="none">
      <path d="M20 0 L20 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 18 Q8 28, 6 45" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M20 18 Q13 30, 12 45" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M20 18 L20 45" stroke="currentColor" strokeWidth="2" />
      <path d="M20 18 Q27 30, 28 45" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M20 18 Q32 28, 34 45" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function MenuCard({ result, isLoading = false }: MenuCardProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.description);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 3000);
    }
  };

  return (
    <div
      className="bg-cream-light border-2 border-charcoal rounded-lg p-5"
      role="region"
      aria-label="Translation result"
      aria-busy={isLoading}
    >
      {/* Inner card with decorative border */}
      <div className="bg-white border-2 border-[#8B7355] rounded p-6 relative">
        {/* Corner flourishes */}
        <CornerFlourish className="absolute top-2 left-2 w-6 h-6 text-[#8B7355]" />
        <CornerFlourish className="absolute top-2 right-2 w-6 h-6 text-[#8B7355] -scale-x-100" />
        <CornerFlourish className="absolute bottom-2 left-2 w-6 h-6 text-[#8B7355] -scale-y-100" />
        <CornerFlourish className="absolute bottom-2 right-2 w-6 h-6 text-[#8B7355] scale-[-1]" />

        {/* Menu heading */}
        <h2 className="text-center font-heading text-[1.5rem] font-bold text-charcoal mb-4">
          Menu
        </h2>

        {/* Generated description */}
        <p className="text-center text-base leading-[1.7] text-[#444] px-4">
          {result.description}
        </p>

        {/* Copy button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleCopy}
            disabled={copyState === "copied"}
            aria-label={
              copyState === "copied"
                ? "Copied to clipboard"
                : copyState === "error"
                  ? "Failed to copy"
                  : "Copy description to clipboard"
            }
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
              border-2 transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${
                copyState === "copied"
                  ? "bg-mint border-charcoal/50 text-charcoal cursor-default focus-visible:ring-mint"
                  : copyState === "error"
                    ? "bg-blush-light border-charcoal/50 text-charcoal hover:bg-blush focus-visible:ring-blush"
                    : "bg-white border-charcoal/30 text-charcoal/70 hover:bg-cream hover:border-charcoal/50 hover:text-charcoal focus-visible:ring-charcoal/50"
              }
            `}
          >
            {copyState === "copied" ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : copyState === "error" ? (
              <>
                <X className="w-4 h-4" />
                <span>Copy failed</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
