import { RestaurantStyle, STYLE_LABELS } from "@/lib/types";
import { PillButton } from "@/components/ui/PillButton";

const STYLES: RestaurantStyle[] = [
  "cafe",
  "gastropub",
  "bistro",
  "steakhouse",
  "michelin",
  "tasting-menu",
];

interface StyleSelectorProps {
  value: RestaurantStyle;
  onChange: (style: RestaurantStyle) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-charcoal">
        Restaurant Style
      </legend>
      <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
        {STYLES.map((style) => (
          <PillButton
            key={style}
            name="style"
            value={style}
            label={STYLE_LABELS[style]}
            checked={value === style}
            onChange={(v) => onChange(v as RestaurantStyle)}
          />
        ))}
      </div>
    </fieldset>
  );
}
