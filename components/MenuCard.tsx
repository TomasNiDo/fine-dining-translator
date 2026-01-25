"use client";

import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import { TranslationResult } from "@/lib/types";

interface MenuCardProps {
  result: TranslationResult;
  isLoading?: boolean;
}

type CopyState = "idle" | "copied" | "error";

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
      className="menu-card"
      role="region"
      aria-label="Translation result"
      aria-busy={isLoading}
    >
      <div className="space-y-4">
        {/* Menu heading */}
        <h2 className="text-center font-heading text-2xl text-charcoal tracking-wide">
          Menu
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-px bg-charcoal/30" />
          <div className="w-2 h-2 rounded-full bg-charcoal/30" />
          <div className="w-8 h-px bg-charcoal/30" />
        </div>

        {/* Generated description */}
        <p className="text-base md:text-lg leading-relaxed text-charcoal/90 font-body text-center px-2">
          {result.description}
        </p>

        {/* Original dish reveal */}
        {result.originalDish && (
          <p className="text-center text-sm text-charcoal/60 italic font-body">
            (It&apos;s {result.originalDish})
          </p>
        )}

        {/* Copy button */}
        <div className="flex justify-center pt-3">
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
