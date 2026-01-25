import { ChefHat, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 pb-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-charcoal/60">
        {/* Left links */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 hover:text-charcoal transition-colors"
          >
            <span>About the Chef</span>
            <ChefHat className="w-4 h-4" />
          </a>
          <span className="text-charcoal/30">|</span>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 hover:text-charcoal transition-colors"
          >
            <span>Donate to the Ego Fund</span>
            <Heart className="w-4 h-4 text-blush" />
          </a>
        </div>

        {/* Right copyright */}
        <p className="flex items-center gap-1">
          <span>Copyright fine wining this too.</span>
          <span role="img" aria-label="chef kiss">
            😙
          </span>
        </p>
      </div>
    </footer>
  );
}
