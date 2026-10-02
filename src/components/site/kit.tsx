import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote, Star } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { siGoogle, siHubspot, siMeta, siShopify } from "simple-icons";

type To = "/contact" | "/services" | "/products" | "/about" | "/blog" | "/clients";

/** Bordered pill label used at the top of page heroes. */
export function PillEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
      <span className="h-px w-5 bg-primary" />
      {children}
    </span>
  );
}

/** Small line + uppercase label used above section titles. */
export function LineEyebrow({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "orange" }) {
  const c = tone === "orange" ? "bg-orange" : "bg-primary";
  const t = tone === "orange" ? "text-navy-foreground/80" : "text-primary";
  return (
    <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] ${t}`}>
      <span className={`h-0.5 w-7 ${c}`} />
      {children}
    </p>
  );
}

export function Btn({ to, children, variant = "solid" }: { to: To; children: ReactNode; variant?: "solid" | "outline" }) {
  const cls =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-primary/60 bg-background text-primary hover:bg-blue-soft";
  return (
    <Link to={to} className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition ${cls}`}>
      {children} <ArrowRight className="size-4" />
    </Link>
  );
}

/** Hero with copy on the left and a photo bleeding off the right edge, plus an optional floating card. */
export function SplitHero({
  eyebrow,
  title,
  accent,
  text,
  image,
  imageAlt,
  actions,
  card,
}: {
  eyebrow: string;
  title: ReactNode;
  accent: string;
  text: string;
  image: string;
  imageAlt: string;
  actions: ReactNode;
  card?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%]">
        <img src={image} alt={imageAlt} width={1408} height={768} className="h-64 w-full object-cover sm:h-80 lg:h-full" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-surface via-surface/30 to-transparent lg:block" />
        {card && <div className="absolute bottom-6 right-4 md:right-8">{card}</div>}
      </div>
      <div className="container-x relative py-12 lg:py-16">
        <div className="max-w-xl">
          <PillEyebrow>{eyebrow}</PillEyebrow>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-[3.4rem]">
            {title} <span className="text-primary">{accent}</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground/80">{text}</p>
          <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
        </div>
      </div>
    </section>
  );
}

export function FloatCard({ icon: Icon, title, text }: { icon: ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <div className="flex max-w-xs items-center gap-4 rounded-xl bg-card p-4 pr-6 shadow-card">
      <div className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-soft text-primary"><Icon className="size-6" /></div>
      <div><p className="text-sm font-bold text-navy">{title}</p><p className="text-xs text-muted-foreground">{text}</p></div>
    </div>
  );
}

export function IconBubble({ icon: Icon, tone = "blue", size = "md" }: { icon: ComponentType<{ className?: string }>; tone?: "blue" | "orange" | "green" | "purple"; size?: "md" | "lg" }) {
  const tones = {
    blue: "bg-blue-soft text-primary",
    orange: "bg-orange-soft text-orange",
    green: "bg-chart-2/12 text-chart-2",
    purple: "bg-chart-4/12 text-chart-4",
  };
  const s = size === "lg" ? "size-14" : "size-11";
  return <div className={`grid ${s} shrink-0 place-items-center rounded-full ${tones[tone]}`}><Icon className={size === "lg" ? "size-7" : "size-5"} /></div>;
}

export function TestimonialCard({ quote, name, role, place, avatar, stars = false }: { quote: string; name: string; role: string; place?: string; avatar: string; stars?: boolean }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="flex gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-soft text-primary"><Quote className="size-5 fill-current" /></div>
        <blockquote className="text-sm leading-relaxed text-foreground/80">“{quote}”</blockquote>
      </div>
      <figcaption className="mt-5 flex items-center gap-3">
        <img src={avatar} alt={name} width={512} height={512} loading="lazy" className="size-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-navy">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
          {place && <p className="text-xs text-muted-foreground">{place}</p>}
          {stars && <div className="mt-1 flex gap-0.5 text-orange">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div>}
        </div>
      </figcaption>
    </figure>
  );
}

function SimpleIcon({ icon, className }: { icon: { path: string; title: string }; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={icon.title} fill="currentColor"><path d={icon.path} /></svg>
  );
}

/** Greyscale strip of partner/brand logos used in "Trusted by" bands. */
export function BrandLogos() {
  const word = "text-lg font-bold tracking-tight";
  return (
    <>
      <span className="flex items-center gap-1.5 text-muted-foreground"><SimpleIcon icon={siGoogle} className="size-5" /><span className={word}>Google</span></span>
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <svg viewBox="0 0 22 22" className="size-5" aria-hidden fill="currentColor"><rect width="10" height="10" /><rect x="12" width="10" height="10" /><rect y="12" width="10" height="10" /><rect x="12" y="12" width="10" height="10" /></svg>
        <span className={`${word} font-semibold`}>Microsoft</span>
      </span>
      <span className="flex flex-col items-center leading-none text-muted-foreground" aria-label="AWS">
        <span className="text-xl font-extrabold">aws</span>
        <svg viewBox="0 0 40 8" className="-mt-0.5 w-9" aria-hidden><path d="M2 2 Q20 10 36 2" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" /><path d="M32 1 L37 2 L34 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
      </span>
      <span
        aria-label="IBM"
        className="text-2xl font-black tracking-wider text-transparent"
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--color-muted-foreground) 0 2.5px, transparent 2.5px 4px)", WebkitBackgroundClip: "text", backgroundClip: "text" }}
      >
        IBM
      </span>
      <span className="flex items-center gap-1.5 text-muted-foreground"><SimpleIcon icon={siShopify} className="size-5" /><span className={word}>shopify</span></span>
      <span className="flex items-center gap-0.5 text-muted-foreground"><span className={word}>HubSp</span><SimpleIcon icon={siHubspot} className="size-4" /><span className={word}>t</span></span>
      <span className="flex items-center gap-1.5 text-muted-foreground"><SimpleIcon icon={siMeta} className="size-6" /><span className={word}>Meta</span></span>
    </>
  );
}

/** Blue gradient call-to-action band; the orange ring sits on the right like the designs. */
export function BlueCta({ eyebrow, title, text, primary = "Book a Demo", secondary = "Contact Us", single = false }: { eyebrow?: string; title: string; text: string; primary?: string; secondary?: string; single?: boolean }) {
  return (
    <section className="pb-0 pt-2">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/85 px-8 py-9 md:px-14">
          <div className="absolute -bottom-24 -right-6 size-56 rounded-full border-[18px] border-orange" aria-hidden />
          <div className="absolute -right-24 top-0 size-64 rounded-full border-[14px] border-primary-foreground/15" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:pr-40">
            <div>
              {eyebrow && <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/90"><span className="h-px w-7 bg-primary-foreground/80" />{eyebrow}</p>}
              <h2 className="mt-2 text-2xl font-extrabold text-primary-foreground md:text-3xl">{title}</h2>
              <p className="mt-2 max-w-xl text-primary-foreground/85">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-background/90">{primary} <ArrowRight className="size-4" /></Link>
              {!single && <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/70 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">{secondary} <ArrowRight className="size-4" /></Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
