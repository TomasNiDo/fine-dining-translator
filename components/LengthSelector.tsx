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
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-charcoal">
        Description Length
      </legend>
      <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
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
