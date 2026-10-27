type IconProps = { className?: string };

export function Arrow({ className = "" }: IconProps) {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Download({ className = "" }: IconProps) {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M6 1.5v6.5M3.25 5.5 6 8.25 8.75 5.5M2 10.5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron({ className = "", direction = "right" }: IconProps & { direction?: "left" | "right" }) {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d={direction === "right" ? "M6 3.5L10.5 8L6 12.5" : "M10 3.5L5.5 8L10 12.5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
