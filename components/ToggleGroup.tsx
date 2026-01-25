import { Toggle } from "@/components/ui/Toggle";

interface ToggleGroupProps {
  addReveal: boolean;
  addChefEgo: boolean;
  addTechniques: boolean;
  onRevealChange: (checked: boolean) => void;
  onChefEgoChange: (checked: boolean) => void;
  onTechniquesChange: (checked: boolean) => void;
}

export function ToggleGroup({
  addReveal,
  addChefEgo,
  addTechniques,
  onRevealChange,
  onChefEgoChange,
  onTechniquesChange,
}: ToggleGroupProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-charcoal mb-2">
        Extra Pretension
      </legend>
      <div className="space-y-3">
        <Toggle
          id="reveal"
          label="Add the reveal (It's...)"
          checked={addReveal}
          onChange={onRevealChange}
        />
        <Toggle
          id="chef-ego"
          label="Add chef ego"
          checked={addChefEgo}
          onChange={onChefEgoChange}
        />
        <Toggle
          id="techniques"
          label="Add fancy techniques"
          checked={addTechniques}
          onChange={onTechniquesChange}
        />
      </div>
    </fieldset>
  );
}
