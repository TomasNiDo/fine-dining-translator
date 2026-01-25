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
        <h2 className="text-2xl md:text-3xl font-heading text-charcoal text-center">
          {result.originalDish}
        </h2>
        <div className="w-16 h-0.5 bg-charcoal/30 mx-auto" />
        <p className="text-lg leading-relaxed text-charcoal/90 font-heading italic text-center">
          {result.description}
        </p>

        <div className="flex justify-center pt-2">
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
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2
              ${
                copyState === "copied"
                  ? "bg-green-100 text-green-700 cursor-default"
                  : copyState === "error"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10 hover:text-charcoal"
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
            <span className="sr-only">
              {copyState === "copied"
                ? "Description copied to clipboard"
                : copyState === "error"
                  ? "Failed to copy description. Please try again."
                  : "Copy description to clipboard"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
