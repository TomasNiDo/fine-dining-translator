import { Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

// Magic wand/pen icon from variant-f
function MagicPenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

export function GenerateButton({
  onClick,
  disabled,
  isLoading,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full max-w-[360px] mx-auto h-[60px] px-8 rounded-full
        flex items-center justify-center gap-3
        border-[3px] border-charcoal
        font-heading text-[1.35rem] font-bold text-white
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-purple-btn focus:ring-offset-2
        ${
          disabled || isLoading
            ? "opacity-50 cursor-not-allowed"
            : "hover:translate-y-0.5 hover:shadow-[0_2px_0_#4A3A74,inset_0_2px_4px_rgba(255,255,255,0.3)] active:translate-y-1 active:shadow-[0_0_0_#4A3A74,inset_0_2px_4px_rgba(255,255,255,0.2)]"
        }
      `}
      style={{
        background: disabled || isLoading
          ? "#999"
          : "linear-gradient(180deg, #8B7DB5 0%, #6B5B95 50%, #5A4A84 100%)",
        boxShadow: disabled || isLoading
          ? "none"
          : "0 4px 0 #4A3A74, inset 0 2px 4px rgba(255,255,255,0.3)",
        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Consulting the Chef...</span>
        </>
      ) : (
        <>
          <span>Generate Masterpiece</span>
          <MagicPenIcon />
        </>
      )}
    </button>
  );
}
