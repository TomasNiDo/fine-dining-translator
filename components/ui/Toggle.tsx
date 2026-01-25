interface ToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ id, label, checked, onChange }: ToggleProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        {/* Track */}
        <div
          className={`
            w-12 h-6 rounded-full transition-colors
            border-2 border-charcoal
            ${checked ? "bg-mint" : "bg-gray-200"}
            peer-focus:ring-2 peer-focus:ring-charcoal peer-focus:ring-offset-2
          `}
        />
        {/* Thumb */}
        <div
          className={`
            absolute top-1 left-1 w-4 h-4 rounded-full bg-charcoal
            transition-transform duration-200 ease-in-out
            ${checked ? "translate-x-6" : "translate-x-0"}
          `}
        />
      </div>
      <span className="text-charcoal">{label}</span>
    </label>
  );
}
