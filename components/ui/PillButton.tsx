interface PillButtonProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  variant?: "mint" | "butter";
}

export function PillButton({
  name,
  value,
  label,
  checked,
  onChange,
  variant = "mint",
}: PillButtonProps) {
  const baseStyles = `
    inline-flex items-center px-4 py-2 rounded-full
    border-2 transition-all duration-200 whitespace-nowrap
    text-sm font-medium
    focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2
  `;

  const variantStyles = {
    mint: checked
      ? "bg-mint border-charcoal/70 text-charcoal shadow-soft"
      : "bg-white/60 border-charcoal/30 text-charcoal/70 hover:bg-mint-light/50 hover:border-charcoal/50",
    butter: checked
      ? "bg-butter border-charcoal/70 text-charcoal shadow-soft"
      : "bg-white/60 border-charcoal/30 text-charcoal/70 hover:bg-butter/30 hover:border-charcoal/50",
  };

  const focusStyles = {
    mint: "focus-within:ring-mint",
    butter: "focus-within:ring-butter",
  };

  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only peer"
      />
      <span className={`${baseStyles} ${variantStyles[variant]} ${focusStyles[variant]}`}>
        {label}
      </span>
    </label>
  );
}
