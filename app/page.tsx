"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DishInput } from "@/components/DishInput";
import { StyleSelector } from "@/components/StyleSelector";
import { LengthSelector } from "@/components/LengthSelector";
import { ToggleGroup } from "@/components/ToggleGroup";
import { GenerateButton } from "@/components/GenerateButton";
import { MenuCard } from "@/components/MenuCard";
import { generateTranslation } from "@/lib/translator";
import {
  TranslationResult,
  TranslatorOptions,
  RestaurantStyle,
  DescriptionLength,
  defaultOptions,
} from "@/lib/types";

export default function Home() {
  const [dishName, setDishName] = useState("");
  const [options, setOptions] = useState<TranslatorOptions>(defaultOptions);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateOption = <K extends keyof TranslatorOptions>(
    key: K,
    value: TranslatorOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    const trimmedDish = dishName.trim();
    if (!trimmedDish) return;

    setIsGenerating(true);

    // Simulate a brief delay for perceived "thinking"
    await new Promise((resolve) => setTimeout(resolve, 300));

    const translationResult = generateTranslation({
      dishName: trimmedDish,
      options,
    });

    setResult(translationResult);
    setIsGenerating(false);
  };

  const canGenerate = dishName.trim().length > 0;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Header />

        <div className="card space-y-6">
          <DishInput value={dishName} onChange={setDishName} />

          <StyleSelector
            value={options.style}
            onChange={(style: RestaurantStyle) => updateOption("style", style)}
          />

          <LengthSelector
            value={options.length}
            onChange={(length: DescriptionLength) =>
              updateOption("length", length)
            }
          />

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

        {result && !isGenerating && (
          <MenuCard result={result} isLoading={isGenerating} />
        )}

        {!result && !isGenerating && (
          <p className="text-center text-charcoal/60 italic">
            Enter a dish name above and click &ldquo;Generate
            Masterpiece&rdquo; to begin your culinary journey.
          </p>
        )}
      </div>
    </main>
  );
}
