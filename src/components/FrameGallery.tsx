import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Arrow } from "@/components/icons";
import { ScreenshotSlider } from "@/components/ScreenshotSlider";
import type { DesignFrame, Shot } from "@/content/projects";
import { imageDims } from "@/lib/image-dims";

const IMAGE_FILE = /\.(webp|png|jpe?g)$/i;

type Pair = { title: string; text: string; from: DesignFrame; to: DesignFrame };

type Props = {
  /** Folder under /public, e.g. "work/dip-trading/dashboard". Read at build time. */
  dir: string;
  projectName: string;
  /** What the frames show, used in alt text and placeholder labels, e.g. "Dashboard screen". */
  kind: string;
  /** "slider" = large stage + thumbnails; "pairs" = two-up sequential frames. */
  layout: "slider" | "pairs";
  tint: string;
  /** How many labelled placeholders to show while there are no frames. */
  placeholders: number;
  /** Explicit order + captions for files in `dir`; otherwise the folder is listed in filename order. */
  frames?: DesignFrame[];
  /** Before → after state pairs (files in `dir`); rendered as numbered sequences. */
  pairs?: Pair[];
};

// A phone screenshot is narrow AND tall; full-page desktop exports are tall but wide.
const isPhone = (w: number, h: number) => w < 1000 && h > w * 1.4;

function toShot(dir: string, file: string, caption: string, kind: string, projectName: string): Shot | null {
  const dims = imageDims(path.join(process.cwd(), "public", dir, file));
  if (!dims) return null;
  return {
    src: `/${dir}/${file}`,
    width: dims.width,
    height: dims.height,
    mobile: isPhone(dims.width, dims.height),
    caption,
    alt: `${projectName} ${kind.toLowerCase()} design — ${caption}`,
  };
}

// "02-portfolio_overview.webp" → "Portfolio overview"
function frameLabel(file: string) {
  const words = file.replace(IMAGE_FILE, "").replace(/^\d+[-_\s]*/, "").replace(/[-_]+/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "";
}

function listFrames(dir: string, kind: string, projectName: string, explicit?: DesignFrame[]): Shot[] {
  if (explicit) {
    // Missing files are skipped rather than rendered broken.
    return explicit.flatMap((f) => toShot(dir, f.file, f.caption, kind, projectName) ?? []);
  }
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", dir)).filter((f) => IMAGE_FILE.test(f));
  } catch {
    return [];
  }
  return files
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .flatMap((f, i) => toShot(dir, f, frameLabel(f) || `${kind} ${String(i + 1).padStart(2, "0")}`, kind, projectName) ?? []);
}

/** Real exported design frames from `dir`; clearly marked placeholders until they're added. */
export function FrameGallery({ dir, projectName, kind, layout, tint, placeholders, frames: explicit, pairs }: Props) {
  if (pairs) {
    const resolved = pairs.flatMap((p) => {
      const from = toShot(dir, p.from.file, p.from.caption, kind, projectName);
      const to = toShot(dir, p.to.file, p.to.caption, kind, projectName);
      return from && to ? [{ ...p, from, to }] : [];
    });
    if (resolved.length > 0) return <StatePairs pairs={resolved} tint={tint} />;
  }

  const frames = listFrames(dir, kind, projectName, explicit);

  if (frames.length === 0) {
    return (
      <div className={`grid gap-4 sm:gap-6 ${layout === "pairs" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {Array.from({ length: placeholders }, (_, i) => (
          <FramePlaceholder key={i} label={`${kind} ${String(i + 1).padStart(2, "0")}`} />
        ))}
      </div>
    );
  }

  if (layout === "slider") {
    // Full-page exports are top-anchored so the key content stays large; "Open full size" shows the rest.
    return <ScreenshotSlider shots={frames} label={`${projectName} ${kind.toLowerCase()}s`} tint={tint} zoomable fit="top" />;
  }

  return (
    <ol className="grid gap-6 sm:grid-cols-2 sm:gap-8">
      {frames.map((f, i) => (
        <li key={f.src} data-reveal style={{ "--reveal-delay": (i % 2) * 80 } as React.CSSProperties}>
          <figure>
            <a
              href={f.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${f.caption} at full size (new tab)`}
              className="group block overflow-hidden rounded-xl ring-1 ring-white/10 transition-shadow duration-500 hover:ring-white/25"
              style={{ backgroundColor: tint }}
            >
              <Image
                src={f.src}
                alt={f.alt}
                width={f.width}
                height={f.height}
                sizes="(min-width: 1408px) 640px, (min-width: 640px) 45vw, 92vw"
                className="block h-auto w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.015]"
              />
            </a>
            <figcaption className="mt-3 flex items-baseline gap-3 text-[0.9375rem] text-ink-soft">
              <span className="tabular-nums text-ink">{String(i + 1).padStart(2, "0")}</span>
              {f.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ol>
  );
}

/** Numbered before → after sequences, two frames side by side with a step arrow between. */
function StatePairs({ pairs, tint }: { pairs: { title: string; text: string; from: Shot; to: Shot }[]; tint: string }) {
  return (
    <ol className="space-y-16 sm:space-y-24">
      {pairs.map((p, i) => (
        <li key={p.title} data-reveal>
          <div className="grid gap-3 sm:grid-cols-12 sm:gap-6">
            <p className="font-serif text-2xl text-accent italic sm:col-span-1">{String(i + 1).padStart(2, "0")}</p>
            <div className="sm:col-span-11">
              <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
              <p className="mt-2 max-w-2xl text-ink-soft">{p.text}</p>
            </div>
          </div>
          <div className="relative mt-8 grid gap-6 sm:grid-cols-2 sm:gap-10">
            {[p.from, p.to].map((s, step) => (
              <figure key={s.src}>
                <a
                  href={s.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${s.caption} at full size (new tab)`}
                  className="group block overflow-hidden rounded-xl ring-1 ring-white/10 transition-shadow duration-500 hover:ring-white/25"
                  style={{ backgroundColor: tint }}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    sizes="(min-width: 1408px) 640px, (min-width: 640px) 45vw, 92vw"
                    className="block h-auto w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.015]"
                  />
                </a>
                <figcaption className="mt-3 flex items-baseline gap-3 text-[0.9375rem] text-ink-soft">
                  <span className="eyebrow text-ink">Step {step + 1}</span>
                  {s.caption}
                </figcaption>
              </figure>
            ))}
            {/* Step arrow between the two states (desktop). */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 hidden size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-accent ring-1 ring-line-strong sm:grid"
            >
              <Arrow className="rotate-45" />
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Explicitly labelled stand-in — shows no invented UI, only that an image is due here. */
function FramePlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label} — design image to be added`}
      className="canvas-dots grid aspect-[16/10] place-items-center rounded-xl border border-dashed border-line-strong bg-surface/60 p-6 text-center"
    >
      <div>
        <p className="flex items-center justify-center gap-2 text-[0.75rem] font-semibold tracking-[0.08em] text-accent uppercase">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          Placeholder
        </p>
        <p className="mt-2 font-medium text-ink">{label}</p>
        <p className="mt-1 text-sm text-muted">Design image to be added</p>
      </div>
    </div>
  );
}
