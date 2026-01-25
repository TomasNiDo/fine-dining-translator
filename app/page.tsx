"use client";

import { useState } from "react";
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
      <main className="min-h-screen p-4 md:p-8 relative z-10">
        <div className="max-w-2xl mx-auto space-y-8">
          <Header />

          <div className="card space-y-6">
            <DishInput value={dishName} onChange={setDishName} />

            <div className="grid md:grid-cols-2 gap-6">
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

            <GenerateButton
              onClick={handleGenerate}
              disabled={!canGenerate}
              isLoading={isGenerating}
            />
          </div>

          {error && !isGenerating && (
            <div className="card bg-blush-light/50 border-blush text-charcoal">
              <p className="text-center">{error.message}</p>
            </div>
          )}

          {result && !isGenerating && !error && (
            <MenuCard result={result} isLoading={isGenerating} />
          )}

          {!result && !isGenerating && !error && (
            <p className="text-center text-charcoal/50 italic text-sm">
              Enter a dish name above and click &ldquo;Generate
              Masterpiece&rdquo; to begin your culinary journey.
            </p>
          )}

          <Footer />
        </div>
      </main>
    </>
  );
}
