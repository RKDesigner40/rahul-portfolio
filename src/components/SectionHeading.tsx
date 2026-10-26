type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
};

export function SectionHeading({ index, label, title, aside, id }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <p className="eyebrow flex gap-3 lg:col-span-3">
        <span className="tabular-nums text-ink">{index}</span>
        {label}
      </p>
      <div data-reveal className="lg:col-span-9">
        <h2 id={id} className="max-w-4xl text-headline font-medium">
          {title}
        </h2>
        {aside && <div className="mt-6 max-w-2xl text-lead text-ink-soft">{aside}</div>}
      </div>
    </div>
  );
}
