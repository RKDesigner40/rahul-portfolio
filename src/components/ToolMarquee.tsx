import Image from "next/image";
import { tools } from "@/content/site";

/**
 * CSS-only infinite marquee; the list is rendered twice and shifted by -50%.
 * Logos are shown as monochrome white: `brightness-0 invert` turns each into a
 * white silhouette; tile logos (Photoshop, Firefly) use *-mono.svg files with
 * the letters knocked out so they don't flatten into blank squares.
 */
export function ToolMarquee() {
  return (
    <div className="marquee relative overflow-hidden py-9 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] sm:py-11">
      <ul aria-label="Tools I work with" className="marquee-track flex w-max">
        {[0, 1].map((copy) =>
          tools.map((tool) => (
            <li
              key={`${copy}-${tool.name}`}
              aria-hidden={copy === 1 || undefined}
              className={`flex shrink-0 items-center gap-3.5 px-7 opacity-70 sm:px-11 ${copy === 1 ? "marquee-dup" : ""}`}
            >
              <Image
                src={tool.logo}
                alt=""
                width={36}
                height={36}
                className="size-8 object-contain brightness-0 invert sm:size-9"
                unoptimized
              />
              <span className="text-lg font-medium tracking-tight whitespace-nowrap text-white sm:text-xl">{tool.name}</span>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
