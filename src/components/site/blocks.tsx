import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { ReactNode } from "react";
import type { Post, Product, Service } from "@/lib/site-data";

export function PageHero({ eyebrow, title, text, image, children }: { eyebrow: string; title: ReactNode; text: string; image: string; children?: ReactNode }) {
  return (
    <section className="bg-surface">
      <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{text}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        <img src={image} alt="" width={1408} height={768} className="aspect-[16/10] w-full rounded-2xl object-cover shadow-card" />
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

type To = "/contact" | "/services" | "/products" | "/about" | "/blog" | "/clients";
export function PrimaryBtn({ to, children }: { to: To; children: ReactNode }) {
  return <Link to={to} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">{children}</Link>;
}
export function OutlineBtn({ to, children }: { to: To; children: ReactNode }) {
  return <Link to={to} className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-6 py-3 text-sm font-semibold text-navy transition hover:border-primary hover:text-primary">{children}</Link>;
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1">
      <img src={s.image} alt={s.title} width={944} height={704} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold">{s.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link to="/products/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1">
      <img src={p.image} alt={p.name} width={992} height={672} loading="lazy" className="aspect-[3/2] w-full object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{p.tag}</span>
        <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Explore {p.name} <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

export function PostCard({ p }: { p: Post }) {
  return (
    <Link to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1">
      <img src={p.image} alt="" width={992} height={672} loading="lazy" className="aspect-[16/10] w-full object-cover" />
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-primary">{p.category}</span>
        <h3 className="mt-3 text-lg font-bold leading-snug group-hover:text-primary">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
        <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" />{p.date}</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{p.read}</span>
        </div>
      </div>
    </Link>
  );
}

export function CtaBand({ title = "Let's Build Your Next System", text = "Whether you need a website, an app, automation, or AI — let's create change at scale." }: { title?: string; text?: string }) {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-10 md:px-14">
          <div className="absolute -left-8 -bottom-20 size-44 rounded-full border-[16px] border-orange" aria-hidden />
          <div className="absolute -right-10 -top-20 size-72 rounded-full bg-navy/30 blur-2xl" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:pl-24">
            <div>
              <h2 className="text-2xl font-extrabold text-primary-foreground md:text-3xl">{title}</h2>
              <p className="mt-2 max-w-md text-primary-foreground/85">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-navy hover:bg-background/90">Book a Demo <ArrowRight className="size-4" /></Link>
              <Link to="/contact" className="inline-flex items-center rounded-lg border border-primary-foreground/50 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
