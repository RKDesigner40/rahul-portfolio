import Link from "next/link";
import type { CSSProperties } from "react";
import { Hero } from "@/components/Hero";
import { Arrow } from "@/components/icons";
import { ProjectPreview } from "@/components/ProjectPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { ToolMarquee } from "@/components/ToolMarquee";
import { projects, type Project } from "@/content/projects";
import { experience, process, profile, skills } from "@/content/site";

const delay = (ms: number) => ({ "--reveal-delay": ms }) as CSSProperties;

export default function Home() {
  const [first, ...rest] = projects;

  return (
    <>
      <Hero />

      <section aria-label="Tools" className="bg-surface">
        <ToolMarquee />
      </section>

      {/* ─── Work ─── */}
      <section id="work" aria-labelledby="work-title" className="container-x scroll-mt-20 pt-24 pb-28 sm:pt-32 sm:pb-40">
        <SectionHeading
          index="01"
          label="Selected work"
          id="work-title"
          title={
            <>
              Websites designed with <span className="font-serif font-normal italic">purpose</span>
            </>
          }
        />

        <div className="mt-14 sm:mt-20">
          <ProjectRow project={first} n={1} eager />
        </div>
        <div className="mt-20 grid gap-x-8 gap-y-20 sm:mt-28 lg:grid-cols-2 lg:gap-x-10">
          {rest.map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "lg:mt-32" : ""}>
              <ProjectRow project={p} n={i + 2} compact />
            </div>
          ))}
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" aria-labelledby="about-title" className="scroll-mt-20 bg-surface py-28 sm:py-40">
        <div className="container-x">
          <SectionHeading
            index="02"
            label="About"
            id="about-title"
            title={
              <>
                {profile.yearsExperience} years of turning complex ideas into{" "}
                <span className="font-serif font-normal italic">interfaces people can use.</span>
              </>
            }
          />

          <div className="mt-14 grid gap-14 sm:mt-20 lg:grid-cols-12">
            <div className="space-y-5 text-lead text-ink-soft lg:col-span-5 lg:col-start-4">
              {profile.about.map((para, i) => (
                <p key={i} data-reveal style={delay(i * 80)}>
                  {para}
                </p>
              ))}
              <p data-reveal style={delay(160)} className="pt-2">
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-base font-medium text-ink"
                >
                  <span className="link-line">Download résumé</span>
                  <Arrow className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-start lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
              {[
                ["Experience", `${profile.yearsExperience} years`],
                ["Based in", "India"],
                ["Working", "Globally, remote"],
                ["Status", "Open to freelance"],
              ].map(([k, v], i) => (
                <div key={k} data-reveal style={delay(i * 60)} className="border-t border-line-strong pt-3">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-lg font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Experience */}
          <div className="mt-24 grid gap-8 sm:mt-32 lg:grid-cols-12">
            <h3 className="eyebrow lg:col-span-3">Experience</h3>
            <ol className="lg:col-span-9">
              {experience.map((job, i) => (
                <li
                  key={job.company + job.period}
                  data-reveal
                  style={delay(i * 50)}
                  className="group grid gap-x-6 gap-y-1 border-t border-line-strong py-6 last:border-b sm:grid-cols-12"
                >
                  <p className="text-sm tabular-nums text-muted sm:col-span-3 sm:pt-1">{job.period}</p>
                  <div className="sm:col-span-5">
                    <p className="text-lg font-medium tracking-tight">{job.role}</p>
                    <p className="text-ink-soft">
                      {job.company} · {job.place}
                    </p>
                  </div>
                  <p className="text-base text-muted sm:col-span-4 sm:pt-1">{job.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section aria-labelledby="skills-title" className="container-x py-28 sm:py-40">
        <SectionHeading
          index="03"
          label="Skills"
          id="skills-title"
          title={
            <>
              Designing with how it&rsquo;ll be <span className="font-serif font-normal italic">built</span> in mind.
            </>
          }
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 md:grid-cols-3">
          {skills.map((s, i) => (
            <div key={s.group} data-reveal style={delay(i * 90)} className="bg-paper p-7 sm:p-9">
              <p className="eyebrow">{s.group}</p>
              <ul className="mt-6 space-y-3">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg tracking-tight">
                    <span aria-hidden className="h-px w-3 bg-line-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Process ─── */}
      <section id="process" aria-labelledby="process-title" className="scroll-mt-20 bg-surface py-28 sm:py-40">
        <div className="container-x">
        <SectionHeading
          index="04"
          label="Process"
          id="process-title"
          title={
            <>
              Six steps, from <span className="font-serif font-normal italic">first question</span> to handoff.
            </>
          }
        />
        <ol className="mt-14 grid gap-x-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <li key={p.step} data-reveal style={delay((i % 3) * 90)} className="group border-t border-line-strong py-8 sm:py-10">
              <div className="flex items-baseline justify-between">
                <h3 className="text-title font-medium">{p.step}</h3>
                <span className="font-serif text-2xl text-muted italic transition-colors duration-500 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 max-w-sm text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ol>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" aria-labelledby="contact-title" className="contact-glow scroll-mt-20">
        <div className="container-x py-28 sm:py-40">
          <p className="eyebrow flex gap-3">
            <span className="text-ink">05</span>Contact
          </p>
          <h2 id="contact-title" data-reveal className="mt-10 max-w-5xl text-display font-medium">
            Have a product that needs <span className="font-serif font-normal italic">clarity?</span>
          </h2>
          <div data-reveal style={delay(120)} className="mt-14 flex flex-col gap-10 sm:mt-20 lg:flex-row lg:items-end lg:justify-between">
            <a
              href={`mailto:${profile.contactEmail}`}
              className="group inline-flex max-w-full items-center gap-4 text-[clamp(1.35rem,0.9rem+2.6vw,3rem)] font-medium tracking-tight break-all"
            >
              <span className="link-line">Email Me</span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-bright text-white transition-transform duration-500 ease-out-expo group-hover:rotate-45 sm:size-14">
                <Arrow className="size-4 sm:size-5" />
              </span>
            </a>
            <ul className="flex flex-wrap gap-3">
              {[
                ["LinkedIn", profile.links.linkedin],
                ["Behance", profile.links.behance],
                ["Résumé", profile.links.resume],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {label}
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectRow({ project, n, compact = false, eager = false }: { project: Project; n: number; compact?: boolean; eager?: boolean }) {
  return (
    <article data-reveal>
      <Link href={`/work/${project.slug}`} className="group block" aria-label={`${project.name} — view case study`}>
        <div className="relative">
          <ProjectPreview
            project={project}
            compact={compact}
            eager={eager}
            sizes={compact ? "(min-width: 1024px) 40vw, 90vw" : "(min-width: 1408px) 1000px, 80vw"}
          />
          <span className="pointer-events-none absolute bottom-5 left-5 hidden translate-y-3 items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink opacity-0 shadow-lg transition-[opacity,transform] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:inline-flex">
            View case study <Arrow />
          </span>
        </div>
        <div className={`mt-6 grid grid-cols-12 items-baseline gap-x-4 gap-y-2 ${compact ? "" : "sm:mt-8"}`}>
          <span className="col-span-2 text-sm tabular-nums text-muted sm:col-span-1">{String(n).padStart(2, "0")}</span>
          <h3 className={`col-span-10 text-title font-medium ${compact ? "sm:col-span-11" : "sm:col-span-4"}`}>
            <span className="link-line">{project.name}</span>
          </h3>
          <p
            className={`col-span-12 text-ink-soft col-start-1 sm:col-start-2 ${
              compact ? "sm:col-span-11" : "sm:col-span-5 sm:col-start-auto"
            }`}
          >
            {project.summary}
          </p>
          <p className={`eyebrow col-span-12 col-start-1 mt-2 sm:col-start-2 ${compact ? "sm:col-span-11" : "sm:col-span-2 sm:col-start-auto sm:mt-0 sm:text-right"}`}>
            {project.category}
          </p>
        </div>
      </Link>
    </article>
  );
}
