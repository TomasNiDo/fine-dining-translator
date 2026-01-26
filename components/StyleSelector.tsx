import { RestaurantStyle, STYLE_LABELS, STYLE_TOOLTIPS } from "@/lib/types";
import { PillButton } from "@/components/ui/PillButton";
import { ChefHatIcon } from "@/components/ui/ChefHatIcon";

const STYLE_OPTIONS_ROW1: RestaurantStyle[] = ["cafe", "gastropub", "bistro", "steakhouse"];
const STYLE_OPTIONS_ROW2: RestaurantStyle[] = ["michelin", "tasting-menu"];

interface StyleSelectorProps {
  value: RestaurantStyle;
  onChange: (style: RestaurantStyle) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="text-[1.05rem] font-bold text-charcoal mb-2.5">
        Choose Your Establishment
      </legend>

      {/* First row with chef hat */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <ChefHatIcon className="w-5 h-5 text-tan-outline mr-1" />
        {STYLE_OPTIONS_ROW1.map((style) => (
          <PillButton
            key={style}
            name="style"
            value={style}
            label={STYLE_LABELS[style]}
            checked={value === style}
            onChange={(v) => onChange(v as RestaurantStyle)}
            tooltip={STYLE_TOOLTIPS[style]}
            tooltipId={`tooltip-${style}`}
          />
        ))}
      </div>

      {/* Second row with chef hat */}
      <div className="flex flex-wrap items-center gap-2">
        <ChefHatIcon className="w-5 h-5 text-tan-outline mr-1" />
        {STYLE_OPTIONS_ROW2.map((style) => (
          <PillButton
            key={style}
            name="style"
            value={style}
            label={STYLE_LABELS[style]}
            checked={value === style}
            onChange={(v) => onChange(v as RestaurantStyle)}
            variant={style === "tasting-menu" ? "tasting" : "default"}
            tooltip={STYLE_TOOLTIPS[style]}
            tooltipId={`tooltip-${style}`}
          />
        ))}
      </div>
    </fieldset>
  );
}
