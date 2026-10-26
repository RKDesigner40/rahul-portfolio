/** Clearly marked gap for content Rahul still needs to supply. Never fill these with guesses. */
export function Placeholder({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-surface/60 p-5 sm:p-6">
      <p className="flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.08em] text-accent uppercase">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        Placeholder · to be provided
      </p>
      <p className="mt-3 font-medium text-ink">{title}</p>
      {children && <div className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
