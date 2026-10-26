import Link from "next/link";
import { profile } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {profile.name} · {profile.role}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a className="link-line hover:text-ink" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link-line hover:text-ink" href={profile.links.behance} target="_blank" rel="noreferrer">
              Behance
            </a>
          </li>
          <li>
            <a className="link-line hover:text-ink" href={profile.links.resume} target="_blank" rel="noreferrer">
              Résumé
            </a>
          </li>
          <li>
            <Link className="link-line hover:text-ink" href="/#top">
              Back to top ↑
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
