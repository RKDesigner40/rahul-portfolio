import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70dvh] flex-col justify-center pt-28">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-display font-medium">
        This page <span className="font-serif font-normal italic">isn&rsquo;t here.</span>
      </h1>
      <Link href="/" className="mt-10 inline-flex h-12 w-fit items-center rounded-full bg-ink px-6 font-medium text-paper hover:bg-accent">
        Back to the homepage
      </Link>
    </section>
  );
}
