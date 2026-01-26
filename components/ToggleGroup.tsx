import { Toggle } from "@/components/ui/Toggle";
import { ChefHatIcon } from "@/components/ui/ChefHatIcon";

type ToggleVariant = "mint" | "pink" | "butter";

interface ToggleBoxProps {
  variant: ToggleVariant;
  children: React.ReactNode;
}

function ToggleBox({ variant, children }: ToggleBoxProps) {
  const bgColors: Record<ToggleVariant, string> = {
    mint: "bg-mint-light",
    pink: "bg-toggle-pink",
    butter: "bg-butter-light",
  };

  return (
    <div
      className={`
        relative flex items-center gap-2 px-4 py-2.5
        border-2 border-charcoal rounded-full
        ${bgColors[variant]}
      `}
    >
      {children}
      {/* Chef hat decoration */}
      <ChefHatIcon className="absolute -top-2 -right-1.5 w-5 h-5 text-tan-outline" />
    </div>
  );
}

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
    <fieldset className="mb-6">
      <legend className="sr-only">Extra Pretension Options</legend>
      <div className="flex flex-wrap gap-2.5 justify-center">
        <ToggleBox variant="mint">
          <Toggle
            id="reveal"
            label="Add the reveal<br>at the end 🤫"
            checked={addReveal}
            onChange={onRevealChange}
          />
        </ToggleBox>

        <ToggleBox variant="pink">
          <Toggle
            id="chef-ego"
            label="Extra chef ego"
            checked={addChefEgo}
            onChange={onChefEgoChange}
          />
        </ToggleBox>

        <ToggleBox variant="butter">
          <Toggle
            id="techniques"
            label="Add suspiciously specific<br>technique words 🤔"
            checked={addTechniques}
            onChange={onTechniquesChange}
          />
        </ToggleBox>
      </div>
    </fieldset>
  );
}
