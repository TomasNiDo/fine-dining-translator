export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between items-center gap-4 mt-6 text-sm">
      {/* Links */}
      <div className="flex gap-6">
        <a
          href="#"
          className="text-charcoal no-underline hover:underline transition-colors"
        >
          About the Chef 👨‍🍳
        </a>
        <a
          href="#"
          className="text-charcoal no-underline hover:underline transition-colors"
        >
          Donate to the Ego Fund 👑
        </a>
      </div>

      {/* Copyright */}
      <div className="text-[#666]">
        © Copyright fine winking this too. 😊
      </div>
    </footer>
  );
}
