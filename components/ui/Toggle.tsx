import { Tooltip } from "@/components/ui/Tooltip";

interface ToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  tooltip?: string;
  tooltipId?: string;
}

export function Toggle({ id, label, checked, onChange, tooltip, tooltipId }: ToggleProps) {
  const toggleContent = (
    <div className="relative flex items-center gap-2">
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
          relative w-10 h-[1.375rem] rounded-full
          border-2 border-charcoal
          transition-colors duration-200 cursor-pointer
          ${checked ? "bg-toggle-pink" : "bg-white"}
        `}
        onClick={() => onChange(!checked)}
      >
        {/* Thumb */}
        <div
          className={`
            absolute top-0.5 w-[0.95rem] h-[0.95rem] rounded-full bg-charcoal
            transition-transform duration-200 ease-out
            ${checked ? "translate-x-[1.1rem]" : "translate-x-0.5"}
          `}
        />
      </div>
      <label
        htmlFor={id}
        className="text-[0.8rem] text-charcoal leading-tight cursor-pointer"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );

  if (tooltip && tooltipId) {
    return (
      <Tooltip content={tooltip} id={tooltipId}>
        {toggleContent}
      </Tooltip>
    );
  }

  return toggleContent;
}
