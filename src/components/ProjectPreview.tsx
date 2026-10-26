import Image from "next/image";
import { coverShot, mobileShot, type Project } from "@/content/projects";

type Props = {
  project: Project;
  /** Taller crop for two-up grid cells. */
  compact?: boolean;
  eager?: boolean;
  sizes: string;
};

/** Desktop screenshot in a browser frame with an overlapping phone, on the product's tint. */
export function ProjectPreview({ project, compact = false, eager = false, sizes }: Props) {
  const cover = coverShot(project);
  const phone = mobileShot(project);
  const dark = project.tintInk === "light";
  const host = new URL(project.url).host;

  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] ring-1 ring-white/[0.07] ring-inset sm:rounded-[1.75rem] ${
        compact ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-[16/10]"
      }`}
      style={{ backgroundColor: project.tint }}
    >
      {/* soft light from the top-left keeps flat tints from looking pasted on */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(120% 80% at 0% 0%, rgb(255 255 255 / 0.07), transparent 60%)"
            : "radial-gradient(120% 80% at 0% 0%, rgb(255 255 255 / 0.55), transparent 60%)",
        }}
      />

      <div
        className={`absolute top-[10%] left-[6%] transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-2 ${
          phone ? "w-[88%] sm:w-[76%]" : "w-[88%]"
        }`}
      >
        <div
          className={`overflow-hidden rounded-lg shadow-[0_30px_60px_-20px_rgb(20_20_18/0.35),0_8px_20px_-10px_rgb(20_20_18/0.2)] sm:rounded-xl ${
            dark ? "ring-1 ring-white/10" : "ring-1 ring-black/5"
          }`}
        >
          <div className={`flex h-5 items-center gap-1.5 px-2.5 sm:h-7 sm:px-3.5 ${dark ? "bg-[#26242b]" : "bg-white"}`}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`size-1.5 rounded-full sm:size-2 ${dark ? "bg-white/20" : "bg-black/10"}`} />
            ))}
            <span
              className={`mx-auto hidden rounded px-3 text-[0.65rem] tracking-wide sm:block ${dark ? "text-white/45" : "text-black/40"}`}
            >
              {host}
            </span>
          </div>
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className="block h-auto w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.015]"
          />
        </div>
      </div>

      {phone && (
        <div className="absolute top-[22%] right-[5%] hidden w-[19%] transition-transform delay-75 duration-[1.2s] ease-out-expo group-hover:-translate-y-4 sm:block">
          <div className="overflow-hidden rounded-[0.9rem] border-[3px] border-[#0b0b0a] bg-[#0b0b0a] shadow-[0_30px_50px_-18px_rgb(0_0_0/0.6)] ring-1 ring-white/15 lg:rounded-[1.4rem] lg:border-[5px]">
            <Image
              src={phone.src}
              alt={phone.alt}
              width={phone.width}
              height={phone.height}
              sizes="(min-width: 1024px) 18vw, 22vw"
              loading={eager ? "eager" : "lazy"}
              className="block h-auto w-full rounded-[0.65rem] lg:rounded-[1.05rem]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
