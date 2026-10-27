import Link from "next/link";
import { profile } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      {/* Extra bottom (mobile) / right (sm+) padding keeps links clear of the floating WhatsApp button. */}
      <div className="container-x flex flex-col gap-6 pt-8 pb-28 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:pb-8 sm:pr-28">
        <p>
          © 2026 {profile.name} · Freelance UI/UX Designer, Kerala, India
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
            <a className="link-line hover:text-ink" href={profile.links.resume} download>
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
