import { Utensils } from "lucide-react";

interface DishInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DishInput({ value, onChange }: DishInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="dish-name"
        className="block text-sm font-semibold text-charcoal"
      >
        Your Simple Dish Name
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50">
          <Utensils className="w-5 h-5" />
        </div>
        <input
          type="text"
          id="dish-name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Grilled Cheese"
          maxLength={200}
          className="
            w-full pl-12 pr-4 py-3.5 rounded-2xl
            border-2 border-dashed border-charcoal/40
            bg-mint-light/30
            text-charcoal
            placeholder:text-charcoal/40
            focus:outline-none focus:border-solid focus:border-charcoal/60 focus:bg-white
            transition-all duration-200
          "
        />
      </div>
    </div>
  );
}
