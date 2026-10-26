import Image from "next/image";
import { tools } from "@/content/site";

/** CSS-only infinite marquee; the list is rendered twice and shifted by -50%. */
export function ToolMarquee() {
  return (
    <div className="marquee relative overflow-hidden py-9 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] sm:py-11">
      <ul aria-label="Tools I work with" className="marquee-track flex w-max">
        {[0, 1].map((copy) =>
          tools.map((tool) => (
            <li
              key={`${copy}-${tool.name}`}
              aria-hidden={copy === 1 || undefined}
              className={`flex shrink-0 items-center gap-3.5 px-7 sm:px-11 ${copy === 1 ? "marquee-dup" : ""}`}
            >
              <Image src={tool.logo} alt="" width={36} height={36} className="size-8 object-contain sm:size-9" unoptimized />
              <span className="text-lg font-medium tracking-tight whitespace-nowrap text-ink sm:text-xl">{tool.name}</span>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
