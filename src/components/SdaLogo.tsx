import React from 'react';

interface SdaLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  height?: number | string;
  theme?: 'light' | 'dark';
}

export const SdaLogo: React.FC<SdaLogoProps> = ({
  className = '',
  variant = 'full',
  height = 42,
  theme = 'light',
}) => {
  const textColor = theme === 'dark' ? '#FFFFFF' : '#14171F';
  const orange = '#FF6A00';
  const orangeDark = '#E65100';

  if (variant === 'mark') {
    // Compact Brand Mark: The Beacon Crown + Orange 'S' with Network Nodes
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height }}
        className={`inline-block ${className}`}
        aria-label="Shanti Digital Agency Brandmark"
      >
        <rect width="100" height="100" rx="22" fill={theme === 'dark' ? '#1E222D' : '#FFF7ED'} />
        
        {/* Crown & Beacon Symbol */}
        <g transform="translate(18, 12) scale(0.65)">
          {/* Crown */}
          <path
            d="M50 8 L58 20 L74 12 L66 32 L34 32 L26 12 L42 20 Z"
            fill={theme === 'dark' ? '#FFFFFF' : '#14171F'}
          />
          <circle cx="50" cy="7" r="3.5" fill={theme === 'dark' ? '#FFFFFF' : '#14171F'} />
          <circle cx="74" cy="11" r="3" fill={theme === 'dark' ? '#FFFFFF' : '#14171F'} />
          <circle cx="26" cy="11" r="3" fill={theme === 'dark' ? '#FFFFFF' : '#14171F'} />
          <circle cx="38" cy="16" r="2.5" fill={theme === 'dark' ? '#FFFFFF' : '#14171F'} />
          <circle cx="62" cy="16" r="2.5" fill={theme === 'dark' ? '#FFFFFF' : '#14171F'} />

          {/* Broadcast signal arcs */}
          <path
            d="M36 38 C42 34, 58 34, 64 38"
            stroke={theme === 'dark' ? '#FFFFFF' : '#14171F'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M40 44 C45 41, 55 41, 60 44"
            stroke={theme === 'dark' ? '#FFFFFF' : '#14171F'}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="52" r="5" fill={theme === 'dark' ? '#FFFFFF' : '#14171F'} />
        </g>

        {/* Orange Brand Character with Network Nodes */}
        <path
          d="M 68 56 C 68 50, 60 46, 50 48 C 38 50, 32 54, 32 63 C 32 73, 44 76, 55 78 C 65 80, 68 83, 68 89 C 68 96, 58 100, 48 100 C 37 100, 30 95, 29 88"
          stroke={orange}
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
          transform="translate(1, -6)"
        />
        {/* Constellation Nodes */}
        <circle cx="38" cy="62" r="3" fill="#FFFFFF" />
        <circle cx="48" cy="72" r="2.5" fill="#FFFFFF" />
        <circle cx="60" cy="80" r="3" fill="#FFFFFF" />
        <line x1="38" y1="62" x2="48" y2="72" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
        <line x1="48" y1="72" x2="60" y2="80" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
      </svg>
    );
  }

  // Full High-Resolution Vector Representation of the Shanti Digital Agency Logo
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height }}
        className="w-auto block"
        aria-label="Shanti Digital Agency"
      >
        <defs>
          <linearGradient id="sdaOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#FF6A00" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* ------------------------------------------------------------------
            CROWN & BROADCAST BEACON ABOVE THE 'i'
            ------------------------------------------------------------------ */}
        <g id="crown-beacon" transform="translate(492, 10)">
          {/* Crown */}
          <path
            d="M-28 16 L-18 2 L0 10 L18 2 L28 16 L18 18 L0 14 L-18 18 Z"
            fill={textColor}
          />
          <path
            d="M-28 16 L-20 28 L20 28 L28 16 L12 21 L0 14 L-12 21 Z"
            fill={textColor}
          />
          {/* Crown Tips */}
          <circle cx="-28" cy="15" r="3.2" fill={textColor} />
          <circle cx="-18" cy="2" r="3.4" fill={textColor} />
          <circle cx="0" cy="9" r="3.8" fill={textColor} />
          <circle cx="18" cy="2" r="3.4" fill={textColor} />
          <circle cx="28" cy="15" r="3.2" fill={textColor} />

          {/* Radio / Wi-Fi broadcast signal waves */}
          <path
            d="M-19 36 C-12 30, 12 30, 19 36"
            stroke={textColor}
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M-13 44 C-7 39, 7 39, 13 44"
            stroke={textColor}
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          {/* Beacon Dot (dot of the 'i') */}
          <circle cx="0" cy="56" r="8.5" fill={textColor} />
        </g>

        {/* ------------------------------------------------------------------
            LETTERS: "shanti"
            ------------------------------------------------------------------ */}
        <g id="shanti-letters" fill="url(#sdaOrangeGrad)">
          {/* LETTER: 's' */}
          <g id="letter-s">
            <path
              d="M 28 108 C 28 85, 42 70, 72 70 C 88 70, 96 75, 102 81 L 87 97 C 82 92, 76 89, 68 89 C 55 89, 48 94, 48 102 C 48 111, 56 114, 76 119 C 102 125, 114 135, 114 153 C 114 177, 96 193, 68 193 C 48 193, 34 186, 25 177 L 40 160 C 47 167, 56 172, 67 172 C 81 172, 89 165, 89 156 C 89 146, 80 142, 60 137 C 38 131, 28 123, 28 108 Z"
            />
            {/* Network Constellation Inside 's' */}
            <circle cx="48" cy="102" r="4.5" fill="#FFFFFF" />
            <circle cx="70" cy="116" r="3.8" fill="#FFFFFF" />
            <circle cx="56" cy="154" r="4.2" fill="#FFFFFF" />
            <circle cx="82" cy="162" r="3.5" fill="#FFFFFF" />
            <line x1="48" y1="102" x2="70" y2="116" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="70" y1="116" x2="56" y2="154" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="56" y1="154" x2="82" y2="162" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
          </g>

          {/* LETTER: 'h' */}
          <g id="letter-h">
            <path
              d="M 132 40 L 157 34 L 157 100 C 166 84, 180 73, 201 73 C 224 73, 235 88, 235 110 L 235 190 L 210 190 L 210 115 C 210 102, 204 94, 191 94 C 178 94, 157 106, 157 124 L 157 190 L 132 190 Z"
            />
            {/* Network Constellation Inside 'h' */}
            <circle cx="145" cy="74" r="4.2" fill="#FFFFFF" />
            <circle cx="145" cy="120" r="4" fill="#FFFFFF" />
            <circle cx="178" cy="88" r="3.6" fill="#FFFFFF" />
            <circle cx="198" cy="118" r="7.5" fill="#FFFFFF" />
            <circle cx="222" cy="148" r="4" fill="#FFFFFF" />
            <line x1="145" y1="74" x2="145" y2="120" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="145" y1="74" x2="178" y2="88" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="178" y1="88" x2="198" y2="118" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="145" y1="120" x2="198" y2="118" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="198" y1="118" x2="222" y2="148" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
          </g>

          {/* LETTER: 'a' */}
          <g id="letter-a">
            <path
              d="M 292 73 C 322 73, 342 94, 342 130 L 342 190 L 318 190 L 318 174 C 310 187, 298 193, 281 193 C 259 193, 244 179, 244 158 C 244 135, 262 122, 294 122 L 317 122 L 317 118 C 317 101, 307 92, 291 92 C 277 92, 268 97, 260 105 L 246 90 C 258 79, 273 73, 292 73 Z M 317 139 L 297 139 C 278 139, 269 146, 269 157 C 269 168, 277 175, 290 175 C 304 175, 317 165, 317 149 Z"
            />
            {/* Network Constellation Inside 'a' */}
            <circle cx="282" cy="100" r="4.2" fill="#FFFFFF" />
            <circle cx="260" cy="148" r="4" fill="#FFFFFF" />
            <circle cx="295" cy="155" r="9" fill="#FFFFFF" />
            <circle cx="330" cy="108" r="4.2" fill="#FFFFFF" />
            <circle cx="330" cy="168" r="3.5" fill="#FFFFFF" />
            <line x1="282" y1="100" x2="295" y2="155" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="260" y1="148" x2="295" y2="155" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="330" y1="108" x2="295" y2="155" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="295" y1="155" x2="330" y2="168" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
          </g>

          {/* LETTER: 'n' */}
          <g id="letter-n">
            <path
              d="M 360 76 L 384 76 L 384 94 C 394 80, 408 73, 427 73 C 450 73, 462 88, 462 110 L 462 190 L 437 190 L 437 115 C 437 102, 431 94, 418 94 C 404 94, 385 106, 385 125 L 385 190 L 360 190 Z"
            />
            {/* Network Constellation Inside 'n' */}
            <circle cx="372" cy="100" r="4.5" fill="#FFFFFF" />
            <circle cx="372" cy="160" r="4" fill="#FFFFFF" />
            <circle cx="410" cy="88" r="3.6" fill="#FFFFFF" />
            <circle cx="448" cy="120" r="6" fill="#FFFFFF" />
            <line x1="372" y1="100" x2="410" y2="88" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="372" y1="100" x2="372" y2="160" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="410" y1="88" x2="448" y2="120" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="372" y1="160" x2="448" y2="120" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
          </g>

          {/* LETTER: 't' */}
          <g id="letter-t">
            <path
              d="M 478 52 L 503 52 L 503 76 L 526 76 L 526 95 L 503 95 L 503 154 C 503 167, 508 172, 518 172 C 522 172, 526 171, 528 170 L 528 189 C 524 191, 516 193, 508 193 C 488 193, 478 180, 478 158 L 478 95 L 466 95 L 466 76 L 478 76 Z"
            />
            {/* Network Constellation Inside 't' */}
            <circle cx="490" cy="108" r="4" fill="#FFFFFF" />
            <circle cx="515" cy="115" r="5" fill="#FFFFFF" />
            <circle cx="496" cy="155" r="3.5" fill="#FFFFFF" />
            <line x1="490" y1="108" x2="515" y2="115" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="490" y1="108" x2="496" y2="155" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
          </g>

          {/* LETTER: 'i' stem */}
          <g id="letter-i">
            <path
              d="M 480 82 C 480 76, 484 74, 492 74 C 500 74, 504 76, 504 82 L 504 182 C 504 188, 500 190, 492 190 C 484 190, 480 188, 480 182 Z"
              transform="translate(42, 0)"
            />
            {/* Network Constellation Inside 'i' */}
            <circle cx="534" cy="105" r="4" fill="#FFFFFF" />
            <circle cx="534" cy="145" r="4.5" fill="#FFFFFF" />
            <circle cx="534" cy="175" r="3.5" fill="#FFFFFF" />
            <line x1="534" y1="105" x2="534" y2="145" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
            <line x1="534" y1="145" x2="534" y2="175" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
          </g>
        </g>

        {/* ------------------------------------------------------------------
            BASELINE: "— DIGITAL AGENCY —"
            ------------------------------------------------------------------ */}
        <g id="digital-agency-baseline" fill={textColor}>
          {/* Left Sleek Tapered Dash */}
          <path d="M 28 222 L 56 222 L 52 225 L 24 225 Z" transform="translate(0, -18)" />

          {/* Geometric Lettering: DIGITAL AGENCY */}
          <text
            x="270"
            y="207"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="18"
            fontWeight="900"
            letterSpacing="8"
            textAnchor="middle"
            fill={textColor}
          >
            DIGITAL AGENCY
          </text>

          {/* Right Sleek Tapered Dash */}
          <path d="M 488 222 L 516 222 L 520 225 L 492 225 Z" transform="translate(0, -18)" />
        </g>
      </svg>
    </div>
  );
};
