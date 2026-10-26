import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { FigmaShowcase } from "@/components/FigmaShowcase";
import { Arrow } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { ProjectPreview } from "@/components/ProjectPreview";
import { ScreenshotSlider } from "@/components/ScreenshotSlider";
import {
  coverShot,
  getNextProject,
  getProject,
  projects,
  type ProductCaseStudy,
  type Project,
  type WebsiteCaseStudy,
} from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} case study`,
    description: project.summary,
    openGraph: { images: [{ url: coverShot(project).src, width: 2000, height: 1250 }] },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug) + 1;
  const next = getNextProject(slug);
  const isWebsite = project.kind === "website";

  return (
    <article className="page-enter">
      {/* ─── Intro ─── */}
      <header className="container-x pt-28 sm:pt-40">
        <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
          <Arrow className="-rotate-135 transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5" />
          <span className="link-line">All work</span>
        </Link>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow flex gap-3">
              <span className="tabular-nums text-ink">{String(index).padStart(2, "0")}</span>
              {project.category}
            </p>
            <h1 className="mt-6 text-display font-medium">{project.name}</h1>
            <p className="mt-6 max-w-2xl font-serif text-[clamp(1.5rem,1.1rem+1.4vw,2.4rem)] leading-tight text-ink-soft italic">
              {project.tagline}
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-[0.95rem] font-medium text-paper transition-colors hover:bg-accent"
            >
              Visit {new URL(project.url).host}
              <Arrow className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-6 sm:mt-20 lg:grid-cols-4">
          <Meta label="My role">
            {project.role ?? <span className="text-accent">To be confirmed</span>}
          </Meta>
          {isWebsite ? (
            <Meta label="Project type">{project.projectType}</Meta>
          ) : (
            <Meta label="Platform">{project.platform}</Meta>
          )}
          <Meta label="Category">{project.category}</Meta>
          <Meta label={project.stackLabel ?? (isWebsite ? "Built with" : "Live site built with")}>
            {project.stack.map((s) => s.name).join(" + ")}
            <span className="mt-1 block text-xs font-normal text-muted">
              {project.stackNote ?? "Verified on the live site, Oct 2026"}
            </span>
          </Meta>
        </dl>
      </header>

      <div className="container-x mt-14 sm:mt-20">
        <ProjectPreview project={project} eager sizes="(min-width: 1408px) 1300px, 95vw" />
      </div>

      {/* ─── Body ─── */}
      {project.kind === "website" ? <WebsiteBody project={project} /> : <ProductBody project={project} />}

      {/* ─── Final UI ─── */}
      <section aria-labelledby="final-ui" className="container-x mt-24 sm:mt-36">
        <div className="grid gap-6 border-t border-line pt-6 lg:grid-cols-12">
          <p className="eyebrow flex gap-3 lg:col-span-3">
            <span className="tabular-nums text-ink">{project.kind === "website" && project.techStack ? "06" : "05"}</span>Final UI
          </p>
          <h2 id="final-ui" className="text-headline font-medium lg:col-span-9">
            Screens from the <span className="font-serif font-normal italic">{isWebsite ? "live website" : "live product"}</span>
          </h2>
        </div>
        <div className="mt-10 sm:mt-14">
          <ScreenshotSlider shots={project.shots} label={`${project.name} screens`} tint={project.tint} />
        </div>
      </section>

      {project.kind !== "website" && (
        <div className="container-x mt-24 sm:mt-36">
          <CaseSection label="Key learnings" n="06">
            {project.learnings ? (
              <ul className="space-y-4 text-lead text-ink-soft">
                {project.learnings.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            ) : (
              <Placeholder title="What you learned on this project">
                Two or three honest takeaways — what worked, what you&rsquo;d change, and what you&rsquo;d carry into the next product.
              </Placeholder>
            )}
          </CaseSection>
        </div>
      )}

      <NextProject project={next} />
    </article>
  );
}

/** Marketing-website case study: overview, role, Figma design, website experience. */
function WebsiteBody({ project }: { project: WebsiteCaseStudy }) {
  return (
    <div className="mt-24 space-y-24 sm:mt-36 sm:space-y-36">
      <div className="container-x space-y-24 sm:space-y-36">
        <CaseSection label="Overview" n="01">
          <p className="text-lead text-ink-soft">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
          >
            <span className="link-line">Visit Live Website</span>
            <Arrow className="text-accent transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </CaseSection>

        <CaseSection label="My role" n="02">
          <p className="text-title font-medium">{project.role}</p>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {project.roleDetails.map((r, i) => (
              <div key={r.title} data-reveal style={revealDelay(i * 80)} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6 sm:py-7">
                <dt className="flex items-baseline gap-3 font-medium sm:col-span-4">
                  <span className="font-serif text-lg font-normal text-accent italic">{String(i + 1).padStart(2, "0")}</span>
                  {r.title}
                </dt>
                <dd className="text-ink-soft sm:col-span-8">{r.text}</dd>
              </div>
            ))}
          </dl>
        </CaseSection>
      </div>

      {/* Wide section so real Figma frames get room; frames appear once exported into figma.framesDir. */}
      <section aria-labelledby="figma-design" className="container-x">
        <div className="grid gap-6 border-t border-line pt-6 lg:grid-cols-12">
          <p className="eyebrow flex gap-3 lg:col-span-3">
            <span className="tabular-nums text-ink">03</span>Figma design
          </p>
          <div data-reveal className="lg:col-span-9">
            <h2 id="figma-design" className="text-headline font-medium">
              {project.figma.title.replace(/ in Figma$/, "")}{" "}
              <span className="font-serif font-normal italic">in Figma</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-ink-soft">{project.figma.description}</p>
          </div>
        </div>
        <div className="mt-10 sm:mt-14 empty:hidden">
          <FigmaShowcase dir={project.figma.framesDir} projectName={project.name} />
        </div>
      </section>

      <div className="container-x space-y-24 sm:space-y-36">
        <CaseSection label={project.experience.label ?? "Website experience"} n="04">
          <h3 className="text-title font-medium">{project.experience.title}</h3>
          {project.experience.description && (
            <p className="mt-5 text-lead text-ink-soft">{project.experience.description}</p>
          )}
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {project.experience.items.map((item, i) => (
              <li
                key={item}
                data-reveal
                style={revealDelay((i % 2) * 80)}
                className="flex gap-4 bg-paper p-6 sm:p-7 sm:last:odd:col-span-2"
              >
                <span className="font-serif text-lg text-accent italic">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-ink-soft">{item}</p>
              </li>
            ))}
          </ul>
        </CaseSection>

        {project.techStack && (
          <CaseSection label="Tech stack" n="05">
            <h3 className="text-title font-medium">Technology Stack</h3>
            <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {project.techStack.map((t, i) => (
                <li key={t.name} data-reveal style={revealDelay((i % 3) * 70)} className="bg-paper p-5 sm:p-6">
                  <p className="text-lg font-medium tracking-tight">{t.name}</p>
                  <p className="eyebrow mt-2">{t.use}</p>
                </li>
              ))}
            </ul>
          </CaseSection>
        )}
      </div>
    </div>
  );
}

function ProductBody({ project }: { project: ProductCaseStudy }) {
  return (
      <div className="container-x mt-24 space-y-24 sm:mt-36 sm:space-y-36">
        <CaseSection label="Overview" n="01">
          <div className="space-y-5 text-lead text-ink-soft">
            {project.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Source>{project.overviewSource}</Source>
        </CaseSection>

        <CaseSection label="My role" n="02">
          {project.role ? (
            <>
              <p className="text-title font-medium">{project.role}</p>
              {project.roleSource && <Source>{project.roleSource}</Source>}
              {project.facts && (
                <dl className="mt-10 divide-y divide-line border-y border-line">
                  {project.facts.map((f) => (
                    <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
                      <dt className="eyebrow pt-1">{f.label}</dt>
                      <dd className="text-ink sm:col-span-2">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-8">
                <Placeholder title="What you personally owned on this project">
                  Add specifics — e.g. which flows and screens you designed, who you worked with, and what you handed off.
                </Placeholder>
              </div>
            </>
          ) : (
            <Placeholder title="Your role, responsibilities, team and timeline">
              {project.roleSource ?? "Describe what you designed, who you worked with, the timeline and your deliverables."}
            </Placeholder>
          )}
        </CaseSection>

        <CaseSection label="The problem" n="03">
          <p className="text-title font-medium">{project.problem.intro}</p>
          {project.problem.points && (
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {project.problem.points.map((pt, i) => {
                const [head, ...rest] = pt.split(" — ");
                const tail = rest.join(" — ");
                return (
                  <li key={i} className="grid gap-2 py-5 sm:grid-cols-12 sm:gap-6">
                    <span className="font-serif text-xl text-muted italic sm:col-span-1">{i + 1}</span>
                    <p className="font-medium sm:col-span-4">{head}</p>
                    <p className="text-ink-soft sm:col-span-7">{tail.charAt(0).toUpperCase() + tail.slice(1)}</p>
                  </li>
                );
              })}
            </ul>
          )}
          <Source>{project.problem.source}</Source>
        </CaseSection>

        <CaseSection label="Design decisions" n="04">
          <p className="max-w-2xl text-ink-soft">
            What the shipped interface does, as seen on the live product. The reasoning behind each choice is yours to add.
          </p>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {project.decisions.map((d, i) => (
              <li key={d.title} data-reveal className="bg-paper p-6 sm:p-8">
                <span className="font-serif text-lg text-accent italic">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-medium tracking-tight">{d.title}</h3>
                <p className="mt-3 text-ink-soft">{d.observed}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Placeholder title="Why these decisions were made">
              Add the reasoning, alternatives you explored, and any research or constraints that shaped them.
            </Placeholder>
          </div>
        </CaseSection>
      </div>
  );
}

const revealDelay = (ms: number) => ({ "--reveal-delay": ms }) as CSSProperties;

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2.5 font-medium leading-snug">{children}</dd>
    </div>
  );
}

function CaseSection({ label, n, children }: { label: string; n: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-line pt-6 lg:grid-cols-12" aria-label={label}>
      <h2 className="eyebrow flex gap-3 self-start lg:sticky lg:top-24 lg:col-span-3">
        <span className="tabular-nums text-ink">{n}</span>
        {label}
      </h2>
      <div data-reveal className="max-w-3xl lg:col-span-8">
        {children}
      </div>
    </section>
  );
}

function Source({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 text-sm text-muted">Source: {children}</p>;
}

function NextProject({ project }: { project: Project }) {
  const cover = coverShot(project);
  return (
    <section aria-label="Next project" className="mt-28 border-t border-line sm:mt-40">
      <Link href={`/work/${project.slug}`} className="group container-x grid gap-8 py-14 sm:py-20 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow">Next case study</p>
          <p className="mt-5 flex items-center gap-5 text-display font-medium">
            <span className="link-line">{project.name}</span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-paper transition-[transform,background-color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-accent sm:size-16">
              <Arrow className="size-4 sm:size-5" />
            </span>
          </p>
          <p className="mt-5 max-w-lg text-ink-soft">{project.summary}</p>
        </div>
        <div className="overflow-hidden rounded-2xl lg:col-span-5" style={{ backgroundColor: project.tint }}>
          <Image
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="w-full translate-y-6 scale-[0.9] rounded-lg transition-transform duration-[1.2s] ease-out-expo group-hover:translate-y-3"
          />
        </div>
      </Link>
    </section>
  );
}
