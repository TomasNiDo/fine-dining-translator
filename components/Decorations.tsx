export function Decorations() {
  return (
    <div className="decorations" aria-hidden="true">
      {/* Top left - Cake slice */}
      <svg
        className="absolute top-4 left-4 w-20 h-20 md:w-28 md:h-28 animate-float opacity-90"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M20 80 L50 20 L80 80 Z"
          fill="#FADADD"
          stroke="#2D2A26"
          strokeWidth="2"
        />
        <path d="M30 60 L50 30 L70 60" fill="#F5B5C8" />
        <circle cx="40" cy="50" r="3" fill="#E8A87C" />
        <circle cx="55" cy="55" r="2" fill="#B8D4B8" />
        <circle cx="60" cy="45" r="2.5" fill="#F5E6A3" />
      </svg>

      {/* Top right - Croissant */}
      <svg
        className="absolute top-8 right-6 w-24 h-24 md:w-32 md:h-32 animate-float-delayed opacity-90"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M15 60 Q30 30, 50 35 Q70 40, 85 55 Q75 70, 50 65 Q25 60, 15 60"
          fill="#F5E6A3"
          stroke="#2D2A26"
          strokeWidth="2"
        />
        <path d="M25 55 Q40 45, 50 48" stroke="#D4956A" strokeWidth="1.5" fill="none" />
        <path d="M35 58 Q50 50, 65 53" stroke="#D4956A" strokeWidth="1.5" fill="none" />
        <path d="M45 60 Q60 55, 75 58" stroke="#D4956A" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Left side - Abstract blob */}
      <svg
        className="absolute top-1/3 -left-8 w-32 h-32 md:w-40 md:h-40 animate-float-slow opacity-70"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M30 50 Q20 30, 40 20 Q60 10, 70 30 Q80 50, 70 70 Q60 90, 40 80 Q20 70, 30 50"
          fill="#B5D4E8"
          stroke="#2D2A26"
          strokeWidth="1.5"
        />
      </svg>

      {/* Right side - Macaron stack */}
      <svg
        className="absolute top-1/2 -right-4 w-20 h-28 md:w-24 md:h-32 animate-float opacity-85"
        viewBox="0 0 80 120"
        fill="none"
      >
        <ellipse cx="40" cy="30" rx="25" ry="12" fill="#F5B5C8" stroke="#2D2A26" strokeWidth="1.5" />
        <rect x="15" y="28" width="50" height="8" fill="#FADADD" />
        <ellipse cx="40" cy="38" rx="25" ry="12" fill="#F5B5C8" stroke="#2D2A26" strokeWidth="1.5" />

        <ellipse cx="40" cy="60" rx="25" ry="12" fill="#B8D4B8" stroke="#2D2A26" strokeWidth="1.5" />
        <rect x="15" y="58" width="50" height="8" fill="#D4E8D4" />
        <ellipse cx="40" cy="68" rx="25" ry="12" fill="#B8D4B8" stroke="#2D2A26" strokeWidth="1.5" />

        <ellipse cx="40" cy="90" rx="25" ry="12" fill="#F5E6A3" stroke="#2D2A26" strokeWidth="1.5" />
        <rect x="15" y="88" width="50" height="8" fill="#FFF8DC" />
        <ellipse cx="40" cy="98" rx="25" ry="12" fill="#F5E6A3" stroke="#2D2A26" strokeWidth="1.5" />
      </svg>

      {/* Bottom left - Cupcake */}
      <svg
        className="absolute bottom-20 left-8 w-20 h-24 md:w-24 md:h-28 animate-float-delayed opacity-85"
        viewBox="0 0 80 100"
        fill="none"
      >
        <path
          d="M20 50 L25 85 L55 85 L60 50"
          fill="#E8A87C"
          stroke="#2D2A26"
          strokeWidth="2"
        />
        <path d="M25 55 L55 55" stroke="#2D2A26" strokeWidth="1" />
        <path d="M27 65 L53 65" stroke="#2D2A26" strokeWidth="1" />
        <path
          d="M15 50 Q25 25, 40 30 Q55 35, 65 50 Q55 55, 40 52 Q25 49, 15 50"
          fill="#F5B5C8"
          stroke="#2D2A26"
          strokeWidth="2"
        />
        <circle cx="40" cy="38" r="4" fill="#E8A87C" />
      </svg>

      {/* Bottom right - Abstract swirl */}
      <svg
        className="absolute bottom-12 right-12 w-28 h-28 md:w-36 md:h-36 animate-float-slow opacity-75"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="35" fill="none" stroke="#E6D5F2" strokeWidth="8" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="#FFDAB9" strokeWidth="6" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#B8D4B8" strokeWidth="4" />
        <circle cx="50" cy="50" r="5" fill="#F5B5C8" />
      </svg>

      {/* Bottom center - Small dots pattern */}
      <svg
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-8 opacity-40"
        viewBox="0 0 160 32"
        fill="none"
      >
        <circle cx="20" cy="16" r="4" fill="#B8D4B8" />
        <circle cx="50" cy="16" r="3" fill="#F5B5C8" />
        <circle cx="80" cy="16" r="5" fill="#F5E6A3" />
        <circle cx="110" cy="16" r="3" fill="#E8A87C" />
        <circle cx="140" cy="16" r="4" fill="#B5D4E8" />
      </svg>

      {/* Top center - Small decorative element */}
      <svg
        className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 opacity-60 hidden md:block"
        viewBox="0 0 50 50"
        fill="none"
      >
        <path
          d="M25 5 L30 20 L45 25 L30 30 L25 45 L20 30 L5 25 L20 20 Z"
          fill="#F5E6A3"
          stroke="#2D2A26"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
