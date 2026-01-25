interface PillButtonProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export function PillButton({
  name,
  value,
  label,
  checked,
  onChange,
}: PillButtonProps) {
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
      <span
        className={`
          inline-block px-4 py-2 rounded-full border-2 border-charcoal
          transition-colors whitespace-nowrap
          hover:bg-butter/50
          focus-within:outline-none focus-within:ring-2 focus-within:ring-charcoal focus-within:ring-offset-2
          peer-checked:bg-mint peer-checked:border-charcoal
          peer-focus:ring-2 peer-focus:ring-charcoal peer-focus:ring-offset-2
        `}
      >
        {label}
      </span>
    </label>
  );
}
