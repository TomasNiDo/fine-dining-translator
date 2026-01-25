import { Pencil, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
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
        w-full py-4 px-6 rounded-full
        text-lg font-semibold
        flex items-center justify-center gap-3
        border-2 border-charcoal/80
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2
        ${
          disabled || isLoading
            ? "bg-charcoal/20 text-charcoal/40 cursor-not-allowed border-charcoal/30"
            : "bg-coral text-charcoal hover:bg-coral-dark hover:border-charcoal active:scale-[0.98] shadow-soft hover:shadow-soft-lg"
        }
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Consulting the Sommelier...</span>
        </>
      ) : (
        <>
          <span>Generate Masterpiece</span>
          <Pencil className="w-5 h-5" />
        </>
      )}
    </button>
  );
}
