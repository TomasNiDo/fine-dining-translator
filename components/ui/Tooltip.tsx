"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  id: string;
}

export function Tooltip({ content, children, id }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(rect.top < 80 ? "below" : "above");
    }
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <div aria-describedby={isVisible ? id : undefined}>
        {children}
      </div>
      <span
        id={id}
        role="tooltip"
        className={`
          absolute left-1/2 -translate-x-1/2 z-50
          px-4 py-2 min-w-max text-xs text-center leading-snug whitespace-nowrap
          bg-white border-2 border-charcoal rounded-lg shadow-md
          transition-opacity duration-150 pointer-events-none
          ${position === "above" ? "bottom-full mb-2" : "top-full mt-2"}
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
      >
        {content}
      </span>
    </div>
  );
}
