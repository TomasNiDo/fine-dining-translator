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
      className="inline-flex items-center gap-3 cursor-pointer select-none group"
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
            w-14 h-8 rounded-full transition-all duration-200
            border-2
            ${
              checked
                ? "bg-blush border-charcoal/50"
                : "bg-white border-charcoal/30 group-hover:border-charcoal/50"
            }
            peer-focus:ring-2 peer-focus:ring-blush peer-focus:ring-offset-2
          `}
        />
        {/* Thumb */}
        <div
          className={`
            absolute top-1.5 w-5 h-5 rounded-full bg-charcoal
            transition-all duration-200 ease-out
            shadow-sm
            ${checked ? "left-7" : "left-1.5"}
          `}
        />
      </div>
      <span className="text-sm text-charcoal/80 group-hover:text-charcoal transition-colors">
        {label}
      </span>
    </label>
  );
}
