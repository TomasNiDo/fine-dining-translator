import { Tooltip } from "@/components/ui/Tooltip";

interface PillButtonProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  variant?: "default" | "tasting";
  showDropdown?: boolean;
  tooltip?: string;
  tooltipId?: string;
}

export function PillButton({
  name,
  value,
  label,
  checked,
  onChange,
  variant = "default",
  showDropdown = false,
  tooltip,
  tooltipId,
}: PillButtonProps) {
  const baseStyles = `
    inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full
    border-2 border-charcoal transition-all duration-150
    text-sm font-medium whitespace-nowrap cursor-pointer
    focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-charcoal/30
  `;

  const stateStyles = checked
    ? "bg-butter text-charcoal"
    : "bg-white text-charcoal hover:bg-[#f5f5f5]";

  const buttonContent = (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only peer"
      />
      <span className={`${baseStyles} ${stateStyles}`}>
        {variant === "tasting" && "🌟 "}
        {label}
        {showDropdown && (
          <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3">
            <path d="M6 9L2 5h8z" />
          </svg>
        )}
      </span>
    </label>
  );

  if (tooltip && tooltipId) {
    return (
      <Tooltip content={tooltip} id={tooltipId}>
        {buttonContent}
      </Tooltip>
    );
  }

  return buttonContent;
}
