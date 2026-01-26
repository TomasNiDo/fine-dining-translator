interface ChefHatIconProps {
  className?: string;
}

export function ChefHatIcon({ className = "w-5 h-5 text-tan-outline" }: ChefHatIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3C9.79 3 8 4.79 8 7H6C4.9 7 4 7.9 4 9V10C4 11.1 4.9 12 6 12H7V19C7 20.1 7.9 21 9 21H15C16.1 21 17 20.1 17 19V12H18C19.1 12 20 11.1 20 10V9C20 7.9 19.1 7 18 7H16C16 4.79 14.21 3 12 3Z" />
    </svg>
  );
}
