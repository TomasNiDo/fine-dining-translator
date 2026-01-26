"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { DishInput } from "@/components/DishInput";
import { StyleSelector } from "@/components/StyleSelector";
import { LengthSelector } from "@/components/LengthSelector";
import { ToggleGroup } from "@/components/ToggleGroup";
import { GenerateButton } from "@/components/GenerateButton";
import { MenuCard } from "@/components/MenuCard";
import { Footer } from "@/components/Footer";
import { Decorations } from "@/components/Decorations";
import {
  TranslationResult,
  TranslatorOptions,
  RestaurantStyle,
  DescriptionLength,
  defaultOptions,
  GenerateResponse,
  GenerateErrorResponse,
  GenerationError,
} from "@/lib/types";

export default function Home() {
  const [dishName, setDishName] = useState("");
  const [options, setOptions] = useState<TranslatorOptions>(defaultOptions);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState<GenerationError | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);

  // Scroll to result card when generation completes
  useEffect(() => {
    if (result && !isGenerating && resultCardRef.current) {
      resultCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [result, isGenerating]);

  const updateOption = <K extends keyof TranslatorOptions>(
    key: K,
    value: TranslatorOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    const trimmedDish = dishName.trim();
    if (!trimmedDish || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dishName: trimmedDish,
          options,
        }),
      });

      const data: GenerateResponse | GenerateErrorResponse =
        await response.json();

      if (data.success) {
        setResult({
          originalDish: data.data.originalDish,
          description: data.data.description,
          style: data.data.style,
          generatedAt: new Date(data.data.generatedAt),
        });
        setError(null);
      } else {
        setError(data.error);
        setResult(null);
      }
    } catch {
      setError({
        code: "NETWORK_ERROR",
        message:
          "Lost connection to our culinary imagination. Please check your connection and try again.",
      });
      setResult(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = dishName.trim().length > 0 && !isGenerating;

  return (
    <>
      <Decorations />
      <main className="min-h-screen p-4 md:p-8 lg:p-10 relative z-10">
        <div className="max-w-[800px] mx-auto">
          <Header />

          {/* Input Section */}
          <DishInput value={dishName} onChange={setDishName} />

          {/* Options Section */}
          <div className="grid sm:grid-cols-[1.2fr_1fr] gap-5 md:gap-8 mb-5">
            <StyleSelector
              value={options.style}
              onChange={(style: RestaurantStyle) =>
                updateOption("style", style)
              }
            />

            <LengthSelector
              value={options.length}
              onChange={(length: DescriptionLength) =>
                updateOption("length", length)
              }
            />
          </div>

          {/* Toggle Section */}
          <ToggleGroup
            addReveal={options.addReveal}
            addChefEgo={options.addChefEgo}
            addTechniques={options.addTechniques}
            onRevealChange={(checked) => updateOption("addReveal", checked)}
            onChefEgoChange={(checked) => updateOption("addChefEgo", checked)}
            onTechniquesChange={(checked) =>
              updateOption("addTechniques", checked)
            }
          />

          {/* Generate Button */}
          <div className="mb-6">
            <GenerateButton
              onClick={handleGenerate}
              disabled={!canGenerate}
              isLoading={isGenerating}
            />
          </div>

          {/* Error message */}
          {error && !isGenerating && (
            <div className="bg-blush-light/50 border-2 border-blush rounded-lg p-4 mb-6 text-charcoal">
              <p className="text-center">{error.message}</p>
            </div>
          )}

          {/* Result Card */}
          {result && !isGenerating && !error && (
            <div ref={resultCardRef}>
              <MenuCard result={result} isLoading={isGenerating} />
            </div>
          )}

          {/* Placeholder text */}
          {!result && !isGenerating && !error && (
            <p className="text-center text-[#888] italic text-[0.9rem] mb-6">
              Enter a dish name above and click &ldquo;Generate
              Masterpiece&rdquo; to begin.
            </p>
          )}

          <Footer />
        </div>
      </main>
    </>
  );
}
