import { DescriptionLength, LENGTH_LABELS } from "@/lib/types";
import { PillButton } from "@/components/ui/PillButton";

const LENGTHS: DescriptionLength[] = [
  "short",
  "medium",
  "excessive",
  "absolutely-unnecessary",
];

interface LengthSelectorProps {
  value: DescriptionLength;
  onChange: (length: DescriptionLength) => void;
}

export function LengthSelector({ value, onChange }: LengthSelectorProps) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="text-[1.05rem] font-bold text-charcoal mb-2.5">
        Description Verbosity
      </legend>
      <div className="flex flex-wrap gap-2">
        {LENGTHS.map((length) => (
          <PillButton
            key={length}
            name="length"
            value={length}
            label={LENGTH_LABELS[length]}
            checked={value === length}
            onChange={(v) => onChange(v as DescriptionLength)}
          />
        ))}
      </div>
    </fieldset>
  );
}
