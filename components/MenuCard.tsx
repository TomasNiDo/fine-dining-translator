import { TranslationResult } from "@/lib/types";

interface MenuCardProps {
  result: TranslationResult;
  isLoading?: boolean;
}

export function MenuCard({ result, isLoading = false }: MenuCardProps) {
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
      </div>
    </div>
  );
}
