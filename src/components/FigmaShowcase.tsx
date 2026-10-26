import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Arrow } from "@/components/icons";

const IMAGE_FILE = /\.(webp|png|jpe?g|avif)$/i;

/**
 * Exported Figma frames in /public/<dir>, in natural filename order
 * (01-home.webp, 02-features.webp, …). Read at build time.
 */
function listFrames(dir: string) {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), "public", dir))
      .filter((f) => IMAGE_FILE.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => ({ src: `/${dir}/${f}`, label: frameLabel(f) }));
  } catch {
    return [];
  }
}

// "02-features_desktop.webp" → "Features desktop"
function frameLabel(file: string) {
  const words = file
    .replace(IMAGE_FILE, "")
    .replace(/^\d+[-_\s]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "Frame";
}

/** Figma-canvas style board for real design exports. Renders nothing until frames exist. */
export function FigmaShowcase({ dir, projectName }: { dir: string; projectName: string }) {
  const frames = listFrames(dir);
  if (frames.length === 0) return null;
  const [lead, ...rest] = frames;

  return (
    <div className="canvas-dots rounded-[1.25rem] border border-line bg-surface p-3 sm:rounded-[1.75rem] sm:p-6 lg:p-10">
      <Frame frame={lead} projectName={projectName} sizes="(min-width: 1408px) 1220px, 92vw" eager />
      {rest.length > 0 && (
        <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8 lg:mt-10 lg:gap-10">
          {rest.map((frame) => (
            <Frame key={frame.src} frame={frame} projectName={projectName} sizes="(min-width: 1408px) 600px, (min-width: 640px) 45vw, 92vw" />
          ))}
        </div>
      )}
    </div>
  );
}

function Frame({
  frame,
  projectName,
  sizes,
  eager = false,
}: {
  frame: { src: string; label: string };
  projectName: string;
  sizes: string;
  eager?: boolean;
}) {
  return (
    <figure data-reveal>
      {/* Frame name sits above the frame, as it does on a Figma canvas. */}
      <figcaption className="mb-2.5 flex items-center gap-2 text-[0.8125rem] text-muted">
        <svg aria-hidden width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
          <path d="M3 0v10M7 0v10M0 3h10M0 7h10" stroke="currentColor" strokeWidth="1" />
        </svg>
        {frame.label}
      </figcaption>
      <a
        href={frame.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open the ${frame.label} frame of the ${projectName} design at full size`}
        className="group relative block aspect-[16/10] overflow-hidden rounded-lg bg-paper ring-1 ring-white/10 transition-shadow duration-500 hover:ring-white/25 sm:rounded-xl"
      >
        <Image
          src={frame.src}
          alt={`${projectName} website design in Figma — ${frame.label}`}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.015]"
        />
        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-medium text-ink opacity-0 backdrop-blur transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Full frame <Arrow />
        </span>
      </a>
    </figure>
  );
}
