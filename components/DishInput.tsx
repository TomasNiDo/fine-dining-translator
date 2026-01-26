import { Utensils } from "lucide-react";

interface DishInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DishInput({ value, onChange }: DishInputProps) {
  return (
    <div className="bg-mint border-[3px] border-charcoal rounded-3xl p-4 flex items-stretch gap-4 mb-6">
      {/* Icon box - spans full height */}
      <div className="bg-cream-light border-2 border-charcoal rounded-xl w-[3.5rem] flex items-center justify-center flex-shrink-0">
        <Utensils className="w-7 h-7 text-tan-outline" />
      </div>

      {/* Label + Input wrapper */}
      <div className="flex-1 flex flex-col justify-center">
        <label
          htmlFor="dish-name"
          className="block font-semibold text-base mb-1.5 text-charcoal"
        >
          Your Simple Dish Name
        </label>
        <input
          type="text"
          id="dish-name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Grilled Cheese"
          maxLength={200}
          className="
            w-full px-4 py-3 rounded-full
            border-2 border-charcoal
            bg-white text-charcoal
            text-base font-body
            placeholder:text-[#999]
            focus:outline-none focus:ring-[3px] focus:ring-mint/50
            transition-all duration-200
          "
        />
      </div>
    </div>
  );
}
