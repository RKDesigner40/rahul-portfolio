"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Chevron } from "@/components/icons";
import type { Shot } from "@/content/projects";

type Props = {
  shots: Shot[];
  label: string;
  tint: string;
};

const SWIPE_THRESHOLD = 48;

export function ScreenshotSlider({ shots, label, tint }: Props) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; y: number; locked: "x" | "y" | null } | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const count = shots.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  // Keep the active thumbnail in view without scrolling the page vertically.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const target = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({ left: target, behavior: "smooth" });
  }, [index]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, locked: null };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (!s.locked && Math.hypot(dx, dy) > 6) {
      s.locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (s.locked === "x") {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setDragging(true);
      }
    }
    if (s.locked === "x") {
      // resist at the ends
      const atEdge = (index === 0 && dx > 0) || (index === count - 1 && dx < 0);
      setDrag(atEdge ? dx * 0.35 : dx);
    }
  };

  const endDrag = () => {
    const s = start.current;
    start.current = null;
    if (s?.locked === "x") {
      if (drag < -SWIPE_THRESHOLD && index < count - 1) go(index + 1);
      else if (drag > SWIPE_THRESHOLD && index > 0) go(index - 1);
    }
    setDrag(0);
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(count - 1);
    }
  };

  const current = shots[index];

  return (
    <section aria-roledescription="carousel" aria-label={label} className="select-none">
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ backgroundColor: tint, touchAction: "pan-y" }}
        aria-describedby={`${id}-hint`}
      >
        <p id={`${id}-hint`} className="sr-only">
          Use the left and right arrow keys, or swipe, to move between screens.
        </p>
        <div
          className="flex"
          style={{
            transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)`,
            transition: dragging ? "none" : "transform 0.75s var(--ease-out-expo)",
          }}
        >
          {shots.map((shot, i) => {
            const active = i === index;
            return (
              <div
                key={shot.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${shot.caption}`}
                aria-hidden={!active}
                inert={!active}
                className="relative aspect-[4/3] w-full shrink-0 sm:aspect-[16/10]"
              >
                <div
                  className="absolute inset-0 flex items-center justify-center p-4 transition-[opacity,scale] duration-700 ease-out-expo sm:p-[5%]"
                  style={{ opacity: active ? 1 : 0.35, scale: active ? "1" : "0.96" }}
                >
                  {shot.mobile ? (
                    <div className="h-full overflow-hidden rounded-[1rem] border-[4px] border-[#0b0b0a] bg-[#0b0b0a] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.6)] ring-1 ring-white/15 sm:rounded-[1.6rem] sm:border-[6px]">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        sizes="(min-width: 640px) 26vw, 40vw"
                        draggable={false}
                        loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                        className="h-full w-auto rounded-[0.7rem] sm:rounded-[1.15rem]"
                      />
                    </div>
                  ) : (
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 1408px) 1250px, 90vw"
                      draggable={false}
                      loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                      className="max-h-full w-auto rounded-md object-contain shadow-[0_30px_60px_-24px_rgb(20_20_18/0.45)] ring-1 ring-black/5 sm:rounded-xl"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-center justify-between p-4 sm:flex sm:p-6">
          <SliderButton direction="left" onClick={() => go(index - 1)} label="Previous screen" />
          <SliderButton direction="right" onClick={() => go(index + 1)} label="Next screen" />
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <p aria-live="polite" className="min-h-[3rem] text-[0.95rem] text-ink-soft">
          <span className="mr-3 tabular-nums text-ink">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          {current.caption}
        </p>
        <div className="flex shrink-0 gap-2 sm:hidden">
          <SliderButton direction="left" onClick={() => go(index - 1)} label="Previous screen" small />
          <SliderButton direction="right" onClick={() => go(index + 1)} label="Next screen" small />
        </div>
      </div>

      <div
        ref={thumbsRef}
        className="-mx-1 mt-3 flex gap-2.5 overflow-x-auto px-1 pt-1 pb-2 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Choose a screen"
      >
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            aria-current={i === index || undefined}
            aria-label={`Screen ${i + 1}: ${shot.caption}`}
            onClick={() => go(i)}
            className={`relative shrink-0 overflow-hidden rounded-lg transition-[opacity,box-shadow] duration-500 ${
              shot.mobile ? "h-14 w-[1.65rem] sm:h-[4.5rem] sm:w-[2.1rem]" : "h-14 w-[5.6rem] sm:h-[4.5rem] sm:w-[7.2rem]"
            } ${i === index ? "opacity-100 ring-2 ring-ink ring-offset-2 ring-offset-paper" : "opacity-50 hover:opacity-90"}`}
          >
            <Image src={shot.src} alt="" fill sizes="120px" className="object-cover object-top" draggable={false} />
          </button>
        ))}
      </div>
    </section>
  );
}

function SliderButton({
  direction,
  onClick,
  label,
  small = false,
}: {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`pointer-events-auto grid place-items-center rounded-full border border-line bg-paper/95 text-ink shadow-[0_6px_20px_-8px_rgb(20_20_18/0.35)] backdrop-blur transition-[transform,background-color,color] duration-300 hover:bg-ink hover:text-paper active:scale-95 ${
        small ? "size-11" : "size-12"
      }`}
    >
      <Chevron direction={direction} />
    </button>
  );
}
