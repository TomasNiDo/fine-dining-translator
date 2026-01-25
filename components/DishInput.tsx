interface DishInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DishInput({ value, onChange }: DishInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="dish-name" className="block text-sm font-medium text-charcoal">
        What humble dish shall we elevate?
      </label>
      <input
        type="text"
        id="dish-name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Grilled Cheese, Hot Dog, Frozen Pizza..."
        maxLength={200}
        className="
          w-full px-4 py-3 rounded-xl
          border-2 border-charcoal
          bg-white text-charcoal
          placeholder:text-charcoal/50
          focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2
          transition-shadow
        "
      />
    </div>
  );
}
