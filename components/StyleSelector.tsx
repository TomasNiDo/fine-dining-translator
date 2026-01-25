import { RestaurantStyle, STYLE_LABELS } from "@/lib/types";
import { PillButton } from "@/components/ui/PillButton";

const STYLE_OPTIONS: RestaurantStyle[] = ["cafe", "gastropub", "bistro", "steakhouse", "michelin", "tasting-menu"];

interface StyleSelectorProps {
  value: RestaurantStyle;
  onChange: (style: RestaurantStyle) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-charcoal">
        Choose Your Establishment
      </legend>
      <div className="flex flex-wrap gap-2">
        {STYLE_OPTIONS.map((style) => (
          <PillButton
            key={style}
            name="style"
            value={style}
            label={STYLE_LABELS[style]}
            checked={value === style}
            onChange={(v) => onChange(v as RestaurantStyle)}
            variant="mint"
          />
        ))}
      </div>
    </fieldset>
  );
}
