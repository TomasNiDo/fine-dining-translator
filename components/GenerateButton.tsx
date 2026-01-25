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
        w-full py-4 px-6 rounded-xl
        text-lg font-semibold
        border-2 border-charcoal
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-charcoal focus:ring-offset-2
        ${
          disabled || isLoading
            ? "bg-gray-200 text-charcoal/50 cursor-not-allowed"
            : "bg-charcoal text-cream hover:bg-charcoal/90 active:scale-[0.98]"
        }
        ${isLoading ? "cursor-wait" : ""}
      `}
    >
      {isLoading ? "Consulting the Sommelier..." : "Generate Masterpiece"}
    </button>
  );
}
