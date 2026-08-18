// Simple monochrome "UAT" monogram — a placeholder mark standing in for
// Up A Tree LLC's real logo, which will be swapped in later. Kept as an
// inline SVG so it can be recolored via props without shipping a new
// image asset.

interface LogoProps {
  className?: string;
  /** Badge background color. */
  bg?: string;
  /** Letter/monogram color. */
  fg?: string;
}

export default function Logo({
  className = "h-9 w-9",
  bg = "#1c4224",
  fg = "#faf8f3",
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Up A Tree LLC logo"
      className={className}
    >
      <rect x="4" y="4" width="112" height="112" rx="26" fill={bg} />
      <text
        x="60"
        y="66"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="42"
        letterSpacing="1"
        fill={fg}
      >
        UAT
      </text>
    </svg>
  );
}
