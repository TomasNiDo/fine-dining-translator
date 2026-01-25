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
    <fieldset className="space-y-4">
      <legend className="sr-only">Extra Pretension Options</legend>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <Toggle
          id="reveal"
          label="Add the reveal at the end"
          checked={addReveal}
          onChange={onRevealChange}
        />
        <Toggle
          id="chef-ego"
          label="Extra chef ego"
          checked={addChefEgo}
          onChange={onChefEgoChange}
        />
        <Toggle
          id="techniques"
          label="Add suspiciously specific technique words"
          checked={addTechniques}
          onChange={onTechniquesChange}
        />
      </div>
    </fieldset>
  );
}
