export function Decorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* LARGE PINK BLOB - Top Left */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "-5%", left: "-8%", width: "350px", height: "400px" }}
        viewBox="0 0 350 400"
        fill="none"
      >
        <path
          d="M150 30 Q280 20, 320 120 Q360 220, 280 300 Q200 380, 100 340 Q0 300, 20 180 Q40 60, 150 30"
          fill="#FFC4D0"
        />
      </svg>

      {/* LARGE MINT/GREEN BLOB - Left Side */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "45%", left: "-5%", width: "280px", height: "350px" }}
        viewBox="0 0 280 350"
        fill="none"
      >
        <path
          d="M100 20 Q200 0, 250 80 Q300 160, 260 250 Q220 340, 120 330 Q20 320, 10 220 Q0 120, 100 20"
          fill="#A8E6CF"
        />
      </svg>

      {/* MINT BLOB - Bottom Center Left */}
      <svg
        className="absolute hidden md:block"
        style={{ bottom: "5%", left: "15%", width: "200px", height: "180px" }}
        viewBox="0 0 200 180"
        fill="none"
      >
        <path
          d="M80 20 Q160 0, 190 60 Q220 120, 160 160 Q100 200, 40 150 Q-20 100, 30 50 Q80 0, 80 20"
          fill="#B8E6CF"
        />
      </svg>

      {/* PEACH/CORAL BLOB - Top Right Area */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "2%", right: "25%", width: "200px", height: "150px" }}
        viewBox="0 0 200 150"
        fill="none"
      >
        <path
          d="M60 20 Q140 -10, 180 50 Q220 110, 150 130 Q80 150, 30 100 Q-20 50, 60 20"
          fill="#FFDAB9"
        />
      </svg>

      {/* PINK BLOB - Bottom Right */}
      <svg
        className="absolute hidden md:block"
        style={{ bottom: "8%", right: "5%", width: "250px", height: "220px" }}
        viewBox="0 0 250 220"
        fill="none"
      >
        <path
          d="M100 20 Q180 0, 230 60 Q280 120, 220 180 Q160 240, 80 200 Q0 160, 20 90 Q40 20, 100 20"
          fill="#FFC4D0"
        />
      </svg>

      {/* BLUE CURVED LINE/SWIRL - Right Side */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "15%", right: "-2%", width: "180px", height: "500px" }}
        viewBox="0 0 180 500"
        fill="none"
      >
        <path
          d="M150 30 Q200 100, 120 180 Q40 260, 100 340 Q160 420, 80 480"
          stroke="#4A90D9"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Small blue accent - bottom right */}
      <svg
        className="absolute hidden md:block"
        style={{ bottom: "25%", right: "3%", width: "100px", height: "80px" }}
        viewBox="0 0 100 80"
        fill="none"
      >
        <path
          d="M20 60 Q50 20, 80 40"
          stroke="#4A90D9"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* ========== LINE ART FOOD ILLUSTRATIONS (Tan/Brown Outlines) ========== */}

      {/* CAKE SLICE - Top Left */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "8%", left: "12%", width: "70px", height: "70px" }}
        viewBox="0 0 70 70"
        fill="none"
      >
        <path d="M15 60 L25 20 L55 20 L60 60 Z" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <path d="M25 20 Q35 10, 55 20" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <circle cx="40" cy="12" r="5" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <path d="M40 7 Q45 2, 42 0" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <path d="M20 35 L55 35" stroke="#C4A77D" strokeWidth="1.5" />
        <path d="M18 48 L57 48" stroke="#C4A77D" strokeWidth="1.5" />
      </svg>

      {/* CROISSANT - Top Left Area */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "4%", left: "22%", width: "65px", height: "50px" }}
        viewBox="0 0 65 50"
        fill="none"
      >
        <path
          d="M5 30 Q15 10, 32 15 Q50 20, 60 35 Q50 45, 32 40 Q15 35, 5 30"
          stroke="#C4A77D"
          strokeWidth="2"
          fill="none"
        />
        <path d="M15 28 Q28 20, 35 23" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <path d="M25 32 Q38 26, 48 30" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
      </svg>

      {/* GARLIC - Left Side */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "28%", left: "5%", width: "50px", height: "55px" }}
        viewBox="0 0 50 55"
        fill="none"
      >
        <ellipse cx="25" cy="35" rx="18" ry="15" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <path d="M25 20 L25 8 Q28 2, 25 0" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <path d="M15 30 Q25 25, 35 30" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <path d="M18 38 Q25 42, 32 38" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
      </svg>

      {/* PLATE WITH FOOD - Left Side */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "48%", left: "2%", width: "80px", height: "50px" }}
        viewBox="0 0 80 50"
        fill="none"
      >
        <ellipse cx="40" cy="40" rx="35" ry="8" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <path d="M15 35 Q25 20, 40 22 Q55 24, 65 35" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <circle cx="30" cy="28" r="4" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <circle cx="45" cy="26" r="5" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <path d="M52 30 L58 25" stroke="#C4A77D" strokeWidth="1.5" />
      </svg>

      {/* PIE/TART - Bottom Left */}
      <svg
        className="absolute hidden md:block"
        style={{ bottom: "22%", left: "8%", width: "70px", height: "45px" }}
        viewBox="0 0 70 45"
        fill="none"
      >
        <path
          d="M5 35 L15 15 L55 15 L65 35 Q35 45, 5 35"
          stroke="#C4A77D"
          strokeWidth="2"
          fill="none"
        />
        <path d="M15 15 Q35 5, 55 15" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <path
          d="M20 25 L25 20 L30 25 L35 20 L40 25 L45 20 L50 25"
          stroke="#C4A77D"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* TACO - Bottom Left */}
      <svg
        className="absolute hidden md:block"
        style={{ bottom: "12%", left: "18%", width: "60px", height: "40px" }}
        viewBox="0 0 60 40"
        fill="none"
      >
        <path d="M5 30 Q30 0, 55 30" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <path d="M10 28 Q30 10, 50 28" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="22" r="3" stroke="#C4A77D" strokeWidth="1" fill="none" />
        <circle cx="32" cy="20" r="4" stroke="#C4A77D" strokeWidth="1" fill="none" />
        <circle cx="42" cy="23" r="3" stroke="#C4A77D" strokeWidth="1" fill="none" />
      </svg>

      {/* HOT DOG/BAGUETTE - Right Side */}
      <svg
        className="absolute hidden md:block"
        style={{ top: "25%", right: "8%", width: "70px", height: "45px" }}
        viewBox="0 0 70 45"
        fill="none"
      >
        <path
          d="M5 25 Q10 10, 35 12 Q60 14, 65 28 Q60 38, 35 36 Q10 34, 5 25"
          stroke="#C4A77D"
          strokeWidth="2"
          fill="none"
        />
        <path d="M15 22 Q35 18, 55 24" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <path d="M20 28 Q35 32, 50 28" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
      </svg>

      {/* PIZZA SLICE - Bottom Right */}
      <svg
        className="absolute hidden md:block"
        style={{ bottom: "35%", right: "10%", width: "55px", height: "65px" }}
        viewBox="0 0 55 65"
        fill="none"
      >
        <path d="M27 5 L5 60 L50 60 Z" stroke="#C4A77D" strokeWidth="2" fill="none" />
        <path d="M10 50 Q27 45, 45 50" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="35" r="4" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <circle cx="32" cy="42" r="3" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <circle cx="25" cy="50" r="3" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
      </svg>

      {/* BREAD/BAGUETTE - Right Side Lower */}
      <svg
        className="absolute hidden md:block"
        style={{ bottom: "18%", right: "5%", width: "75px", height: "35px" }}
        viewBox="0 0 75 35"
        fill="none"
      >
        <path
          d="M5 20 Q15 5, 37 8 Q60 11, 70 22 Q60 32, 37 30 Q15 28, 5 20"
          stroke="#C4A77D"
          strokeWidth="2"
          fill="none"
        />
        <path d="M15 18 L25 12" stroke="#C4A77D" strokeWidth="1.5" />
        <path d="M30 16 L40 10" stroke="#C4A77D" strokeWidth="1.5" />
        <path d="M45 18 L55 12" stroke="#C4A77D" strokeWidth="1.5" />
      </svg>

      {/* WHISK - Bottom Center */}
      <svg
        className="absolute hidden md:block"
        style={{ bottom: "3%", left: "45%", width: "40px", height: "50px" }}
        viewBox="0 0 40 50"
        fill="none"
      >
        <path d="M20 0 L20 20" stroke="#C4A77D" strokeWidth="2" />
        <path d="M20 20 Q10 30, 8 45" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <path d="M20 20 Q15 32, 14 45" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <path d="M20 20 L20 45" stroke="#C4A77D" strokeWidth="1.5" />
        <path d="M20 20 Q25 32, 26 45" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
        <path d="M20 20 Q30 30, 32 45" stroke="#C4A77D" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}
