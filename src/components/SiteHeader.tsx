"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";
import logo from "@/assets/rk-logo.webp";
import { Arrow } from "@/components/icons";
import { profile } from "@/content/site";

const stagger = (ms: number) => ({ "--d": ms }) as CSSProperties;

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled || open ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper/0"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="logo header-in group flex items-center gap-3 text-[1.0625rem] font-semibold tracking-tight"
        >
          <Image
            src={logo}
            alt=""
            loading="eager"
            sizes="72px"
            className="logo-mark h-8 w-auto sm:h-9"
          />
          {profile.shortName}
        </Link>

        {/* Frosted pill keeps the links legible where the header overlaps the hero photo. */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 rounded-full bg-paper/85 py-1.5 pr-1.5 pl-6 shadow-[0_1px_2px_rgb(20_20_18/0.06)] ring-1 ring-line backdrop-blur-md md:flex lg:gap-8"
        >
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link header-in text-[0.9375rem] font-medium"
              style={stagger(80 + i * 60)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="header-cta header-in group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-paper"
            style={stagger(80 + nav.length * 60)}
          >
            Let&rsquo;s talk
            <Arrow className="transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>

        <button
          type="button"
          className="header-in relative -mr-2 grid size-11 place-items-center md:hidden"
          style={stagger(80)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-out-expo ${open ? "rotate-45" : "-translate-y-[4px]"}`}
          />
          <span
            className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-out-expo ${open ? "-rotate-45" : "translate-y-[4px]"}`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-line bg-paper md:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex h-full flex-col justify-between py-10">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="header-in" style={stagger(i * 50)}>
                <Link href={item.href} className="block py-2 text-headline font-medium" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${profile.email}`} className="text-lg text-ink-soft underline decoration-line-strong underline-offset-4">
            {profile.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
