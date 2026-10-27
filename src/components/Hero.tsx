import Image from "next/image";
import type { CSSProperties } from "react";
import { Arrow, Download } from "@/components/icons";
import { profile } from "@/content/site";
import portrait from "@/assets/rk-designer.webp";

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

// From md up the cut-out portrait is anchored bottom-right (sized in
// .hero-portrait), and .hero-text keeps the copy clear of it. The section uses
// min-height, so on short screens it grows instead of clipping; headline, CTAs
// and portrait all fit in the first viewport at 1366×768.
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden md:flex md:min-h-[clamp(40rem,100svh,60rem)] md:items-center"
    >
      {/* Designer-canvas backdrop: masked dot grid + fine grain. Static, decorative. */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0" />
      <div className="container-x relative z-10 w-full pt-24 pb-12 sm:pt-28 md:pb-14 lg:pt-24 lg:pb-12">
        <div className="hero-text">
        <p
          className="hero-fade inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-4 py-1.5 text-[0.875rem] text-ink-soft"
          style={d(100)}
        >
          <span aria-hidden className="status-dot size-1.5 rounded-full bg-[#22a05a]" />
          {profile.status}
        </p>

        <h1 id="hero-title" className="mt-7 text-hero font-medium lg:mt-8">
          {/* The {" "} spaces keep the heading's text readable ("…digital experiences people…") for search engines and screen readers. */}
          <span className="hero-line">
            <span style={d(150)}>Designing digital</span>
          </span>{" "}
          <span className="hero-line">
            <span style={d(260)}>experiences</span>
          </span>{" "}
          {/* The frame sits outside the clipping mask so its labels and cursor aren't cut off. */}
          <SelectionFrame>
            <span className="hero-line">
              <span style={d(370)}>
                <span className="font-serif font-normal italic tracking-[-0.02em]">people love</span>
                <span className="text-accent">.</span>
              </span>
            </span>
          </SelectionFrame>
        </h1>

        <p className="hero-fade mt-12 max-w-xl text-lead text-ink-soft lg:mt-[3.25rem]" style={d(700)}>
          {profile.intro}
        </p>

        <div className="hero-fade mt-8 flex flex-wrap items-center gap-3" style={d(820)}>
          <a
            href="#work"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-[0.95rem] font-medium text-paper transition-[background-color,transform] duration-300 hover:bg-accent active:scale-[0.97]"
          >
            View My Work
            <Arrow className="rotate-90 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" />
          </a>
          <a
            href={profile.links.resume}
            download
            className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong px-6 text-[0.95rem] font-medium text-ink transition-[border-color,background-color,transform] duration-300 hover:border-ink hover:bg-ink/[0.03] active:scale-[0.97]"
          >
            Download Resume
            <Download className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" />
          </a>
        </div>
        </div>
      </div>

      {/* From md the portrait is pinned to the bottom-right of the container's content box,
          so its right edge lines up with the header CTA and the sections below. */}
      <div className="md:pointer-events-none md:absolute md:inset-0">
      <div className="container-x md:h-full">
      <div className="relative md:h-full">
      <figure className="hero-portrait relative mx-auto w-[92%] max-w-[26rem] md:absolute md:right-0 md:bottom-0 md:mx-0 md:max-w-none">
        {/* Warm rim-light glow + orbit rings separate the black shirt from the dark ground. */}
        <div aria-hidden className="hero-glow pointer-events-none absolute top-[38%] left-[52%] aspect-square w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div aria-hidden className="hero-rings pointer-events-none absolute top-[30%] left-[50%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 rounded-full border border-white/[0.09]" />
          <span className="absolute -inset-[16%] rounded-full border border-white/[0.05]" />
          <span className="absolute top-[14%] right-[6%] size-2 rounded-full bg-accent shadow-[0_0_14px_rgb(240_120_76/0.8)]" />
        </div>
        <Image
          src={portrait}
          alt={`${profile.name}, freelance UI/UX designer based in Kerala, India`}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 40vw, (min-width: 768px) 42vw, 92vw"
          className="hero-person relative block h-auto w-full"
        />
      </figure>
      </div>
      </div>
      </div>
    </section>
  );
}

/** A Figma-style selection box with handles, a layer label and a collaborator cursor. */
function SelectionFrame({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block px-[0.08em]">
      {children}
      <span aria-hidden className="hero-frame pointer-events-none absolute inset-x-[-0.06em] inset-y-[-0.02em] border-[1.5px] border-accent-bright">
        {[
          "-left-[5px] -top-[5px]",
          "-right-[5px] -top-[5px]",
          "-left-[5px] -bottom-[5px]",
          "-right-[5px] -bottom-[5px]",
        ].map((pos) => (
          <span key={pos} className={`hero-handle absolute size-[9px] border-[1.5px] border-accent-bright bg-paper ${pos}`} />
        ))}
      </span>
      <span aria-hidden className="hero-cursor pointer-events-none absolute bottom-[-1.75rem] left-full ml-1 hidden items-start gap-1 font-sans not-italic sm:flex">
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path d="M1.5 1.5L16 9.2L9.4 10.9L6.6 17.6L1.5 1.5Z" fill="#F3F2EC" stroke="#131312" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        {/* Label drawn via CSS content so it isn't part of the H1's text. */}
        <span
          data-label="Rahul"
          className="mt-4 rounded-full bg-ink px-2.5 py-1 text-xs font-medium tracking-normal text-paper after:content-[attr(data-label)]"
        />
      </span>
    </span>
  );
}
