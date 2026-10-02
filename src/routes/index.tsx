import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, BarChart3, Bot, ChevronLeft, ChevronRight, Compass, Cpu, Droplet, FileCheck2, GraduationCap,
  HeartPulse, Landmark, LayoutGrid, LifeBuoy, PenTool, Play, Scale, ScanLine, ShieldCheck, Sprout, Star, Truck, Workflow, Award, Boxes,
} from "lucide-react";
import hero from "@/assets/home-hero.jpg";
import caseWoman from "@/assets/case-woman.jpg";
import meeting from "@/assets/meeting.jpg";
import logo from "@/assets/logo.png";
import { posts, products, services, testimonials } from "@/lib/site-data";
import { CtaBand, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/")({
  head: () => meta("Russell Technologies — We Build the Systems Behind Modern Business", "Websites, mobile apps, automation and AI solutions, plus EduPro, Russell Law, Blueflame and Farmspots."),
  component: Home,
});

const Eyebrow = ({ children, dark }: { children: string; dark?: boolean }) => (
  <p className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] ${dark ? "text-navy-foreground/70" : "text-primary"}`}>
    <span className="h-0.5 w-5 bg-orange" />{children}
  </p>
);

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface">
        <div className="container-x grid items-center gap-10 pb-10 pt-12 lg:grid-cols-[1fr_1.05fr] lg:pt-16">
          <div>
            <p className="text-xs font-bold uppercase leading-relaxed tracking-[0.18em] text-navy">Digital infrastructure<br />for a smarter tomorrow</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-[3.6rem]">
              We build the systems behind <span className="text-primary">modern business.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/75 md:text-lg">
              From websites and mobile applications to automation systems and AI solutions, we help organizations turn complex operations into scalable digital infrastructure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card hover:bg-primary/90">Book a Strategy Call <ArrowRight className="size-4" /></Link>
              <Link to="/clients" className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-background px-6 py-3.5 text-sm font-semibold text-primary hover:bg-blue-soft">Explore Our Work <ArrowRight className="size-4" /></Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-6 -top-6 size-48 rounded-full border-[14px] border-orange/80 border-b-transparent border-l-transparent" aria-hidden />
            <img src={hero} alt="Russell Technologies consultant" width={1024} height={1024} className="relative aspect-[5/4] w-full rounded-3xl object-cover object-top shadow-card" />
            <div className="absolute -left-4 top-6 hidden rounded-xl bg-card p-3 shadow-card sm:block">
              <p className="text-[11px] font-semibold text-navy">System Performance</p>
              <p className="text-lg font-extrabold text-navy">99.9% <span className="text-[10px] font-medium text-muted-foreground">Uptime</span></p>
              <div className="mt-1 flex h-8 items-end gap-1">{[3, 4, 3, 5, 4, 6, 5, 7, 8].map((h, i) => <span key={i} className="w-1.5 rounded-sm bg-primary" style={{ height: `${h * 12}%` }} />)}</div>
            </div>
            <div className="absolute -bottom-6 left-1/4 hidden w-56 rounded-xl bg-card p-3 shadow-card sm:block">
              <p className="text-[11px] font-semibold text-navy">Growth Overview</p>
              <div className="mt-2 flex h-14 items-end gap-1.5">{[3, 4, 4, 5, 6, 7, 9].map((h, i) => <span key={i} className="flex-1 rounded-sm bg-primary" style={{ height: `${h * 11}%` }} />)}</div>
            </div>
            <div className="absolute -right-3 bottom-10 hidden space-y-2 rounded-xl bg-card p-3 text-[11px] font-semibold text-navy shadow-card md:block">
              {[[Workflow, "Automate Processes", "text-primary"], [BarChart3, "Improve Efficiency", "text-orange"], [Compass, "Make Better Decisions", "text-orange"]].map(([I, t, c]) => {
                const Icon = I as typeof Workflow;
                return <p key={t as string} className="flex items-center gap-2"><Icon className={`size-4 ${c as string}`} />{t as string}</p>;
              })}
            </div>
          </div>
        </div>
        <div className="container-x pb-10 pt-6"><div className="grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4">
          {([[Boxes, "50+", "Projects Delivered"], [Award, "12", "Industries Served"], [ShieldCheck, "99.9%", "System Uptime"], [Star, "4.9", "Client Rating"]] as const).map(([Icon, v, l]) => (
            <div key={l} className="flex items-center gap-3">
              <Icon className="size-7 shrink-0 text-primary" strokeWidth={1.6} />
              <div><p className="text-lg font-extrabold text-navy">{v}</p><p className="text-[11px] text-muted-foreground">{l}</p></div>
            </div>
          ))}
        </div></div>
        <div className="border-y border-border bg-background">
          <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5">
            <p className="text-xs font-semibold text-navy">Trusted by forward-thinking companies</p>
            {["Google", "Microsoft", "aws", "IBM", "shopify", "HubSpot", "Meta"].map((c) => <span key={c} className="text-lg font-bold text-muted-foreground/80">{c}</span>)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <Eyebrow>What we do</Eyebrow>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">From ideas to impact.</h2>
              <p className="mt-3 text-muted-foreground">We design, build, and deploy digital solutions that solve real business problems and create long-term value.</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">View all services <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex flex-col rounded-2xl border border-border bg-card p-3 shadow-card transition hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-xl">
                  <img src={s.image} alt={s.title} width={944} height={704} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                  <span className="absolute left-3 top-3 grid size-9 place-items-center rounded-lg bg-card/90 text-primary"><ScanLine className="size-4" /></span>
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
                    <span className="text-xl font-extrabold text-border">0{i + 1}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-lg">
              <Eyebrow dark>Our products</Eyebrow>
              <h2 className="mt-2 text-3xl font-extrabold text-navy-foreground md:text-4xl">Software designed for real-world impact.</h2>
              <p className="mt-3 text-navy-foreground/70">Sector-focused platforms that solve operational problems across education, legal services, agriculture, and business workflows.</p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">View all products <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => {
              const Icon = { edupro: GraduationCap, "russell-law": Scale, blueflame: Droplet, farmspots: Sprout }[p.slug];
              const tone = { edupro: "bg-primary", "russell-law": "bg-orange", blueflame: "bg-primary", farmspots: "bg-chart-2" }[p.slug];
              return (
                <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group flex flex-col rounded-2xl bg-card p-4 transition hover:-translate-y-1">
                  <div className="flex items-start gap-3">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone} text-primary-foreground`}><Icon className="size-5" /></span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 font-extrabold uppercase text-navy">{p.name}{p.slug === "blueflame" && <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold normal-case text-primary-foreground">Coming Soon</span>}</p>
                      <p className="text-xs text-muted-foreground">{p.tag}</p>
                    </div>
                  </div>
                  <img src={p.image} alt={`${p.name} screenshot`} width={992} height={672} loading="lazy" className="mt-4 aspect-[16/10] w-full rounded-lg object-cover object-top" />
                  <p className="mt-4 flex-1 text-sm text-muted-foreground">{p.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">{p.slug === "blueflame" ? "Learn more" : `Explore ${p.name.toUpperCase()}`} <ArrowRight className="size-4" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <Eyebrow>Why choose Russell Technologies</Eyebrow>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">A complete digital ecosystem for your business.</h2>
              <p className="mt-3 text-muted-foreground">We combine strategy, design, engineering, and AI to build systems that improve efficiency, enhance customer experiences, and drive growth.</p>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Our Approach <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative">
              <img src={meeting} alt="Team collaborating" width={992} height={672} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <span className="absolute bottom-6 left-6 grid size-12 place-items-center rounded-full bg-orange text-orange-foreground shadow-card"><Play className="size-5 fill-current" /></span>
              <ul className="absolute -right-3 bottom-4 space-y-2 rounded-xl bg-card p-4 text-xs font-semibold text-navy shadow-card">
                {["Ideas", "Strategy", "Development", "Growth"].map((t) => <li key={t} className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" />{t}</li>)}
              </ul>
            </div>
            <div className="relative grid gap-5 sm:grid-cols-2">
              <div className="absolute left-1/2 top-1/2 z-10 hidden size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card shadow-card sm:grid">
                <img src={logo} alt="" width={115} height={40} className="h-8 w-auto" />
              </div>
              {([[LayoutGrid, "Strategy & Consulting", "Understand your goals and opportunities", "bg-primary"], [PenTool, "Design & Engineering", "Build scalable and secure solutions", "bg-orange"], [Cpu, "Automation & AI", "Turn data into intelligent action", "bg-chart-2"], [LifeBuoy, "Support & Optimization", "Keep your systems running and improving", "bg-chart-4"]] as const).map(([Icon, t, d, c]) => (
                <div key={t} className="flex items-center gap-4 rounded-full bg-card px-5 py-5 shadow-card">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full ${c} text-primary-foreground`}><Icon className="size-5" /></span>
                  <div><p className="text-sm font-bold text-navy">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CaseStudies />

      {/* TESTIMONIALS + INSIGHTS */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Testimonials />
          <div className="lg:border-l lg:border-border lg:pl-10">
            <div className="flex items-end justify-between gap-4">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Latest insights</p><h2 className="mt-2 text-2xl font-extrabold">Insights for a smarter digital future</h2></div>
              <Link to="/blog" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">View all articles <ArrowRight className="size-4" /></Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {posts.slice(3, 6).map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-xl bg-card shadow-card">
                  <img src={p.image} alt="" width={992} height={672} loading="lazy" className="aspect-[16/8] w-full object-cover" />
                  <div className="p-4">
                    <p className="text-sm font-bold leading-snug text-navy group-hover:text-primary">{p.title}</p>
                    <div className="mt-3 flex items-center justify-between gap-2 text-[11px] text-muted-foreground"><span className="rounded-md bg-blue-soft px-2 py-1 font-semibold text-primary">{p.category}</span>{p.date}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

const sectors = [
  { name: "Financial Services", icon: Landmark, a: "85%", al: "Faster loan processing", b: "₦2.4B", bl: "Revenue increase" },
  { name: "Logistics", icon: Truck, a: "40%", al: "Faster deliveries", b: "3x", bl: "Order capacity" },
  { name: "Healthcare", icon: HeartPulse, a: "60%", al: "Less paperwork", b: "24/7", bl: "Patient access" },
];

function CaseStudies() {
  const [i, setI] = useState(0);
  const s = sectors[i]!;
  return (
    <section className="relative overflow-hidden bg-navy py-16 lg:py-20">
      <img src={caseWoman} alt="" width={816} height={816} loading="lazy" className="absolute bottom-0 right-0 hidden h-full w-1/4 object-cover opacity-80 lg:block" />
      <div className="container-x relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow dark>Real results. Real impact.</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-foreground md:text-4xl">How we help organizations move from problem to outcome.</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <ul className="space-y-3">
              {sectors.map((x, k) => (
                <li key={x.name}>
                  <button onClick={() => setI(k)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${k === i ? "bg-navy-soft text-navy-foreground" : "text-navy-foreground/60 hover:text-navy-foreground"}`}>
                    <x.icon className={`size-5 ${k === i ? "text-orange" : "text-primary"}`} />{x.name}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-2xl font-extrabold text-orange">{s.a}</p><p className="text-xs text-navy-foreground/60">{s.al}</p>
              <p className="mt-4 text-2xl font-extrabold text-navy-foreground">{s.b}</p><p className="text-xs text-navy-foreground/60">{s.bl}</p>
              <Link to="/clients" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read case study <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 lg:pr-[22%]">
          <div className="w-full rounded-2xl border border-navy-foreground/10 bg-navy-soft/60 p-6">
            {([[FileCheck2, "Application", "bg-primary"], [ScanLine, "Verification", "bg-primary"], [ShieldCheck, "Approval", "bg-chart-2"], [Bot, "Completion", "bg-chart-2"]] as const).map(([Icon, t, c], k) => (
              <div key={t}>
                <div className="flex items-center gap-3">
                  <span className={`grid size-10 place-items-center rounded-full ${c} text-primary-foreground`}><Icon className="size-4" /></span>
                  <p className="text-sm font-semibold text-navy-foreground">{t}</p>
                </div>
                {k < 3 && <span className="ml-5 block h-6 w-px bg-primary/50" />}
              </div>
            ))}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => setI((i + 2) % 3)} aria-label="Previous" className="grid size-9 place-items-center rounded-full border border-navy-foreground/20 text-navy-foreground"><ChevronLeft className="size-4" /></button>
            <button onClick={() => setI((i + 1) % 3)} aria-label="Next" className="grid size-9 place-items-center rounded-full border border-navy-foreground/20 text-navy-foreground"><ChevronRight className="size-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;
  return (
    <div>
      <div className="flex items-end justify-between">
        <div><p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary"><span className="h-0.5 w-5 bg-navy" />Testimonials</p><h2 className="mt-2 text-2xl font-extrabold">What Our Clients Say</h2></div>
        <div className="flex gap-2">
          <button onClick={() => setI((i + testimonials.length - 1) % testimonials.length)} aria-label="Previous testimonial" className="grid size-9 place-items-center rounded-full bg-card text-primary shadow-card"><ChevronLeft className="size-4" /></button>
          <button onClick={() => setI((i + 1) % testimonials.length)} aria-label="Next testimonial" className="grid size-9 place-items-center rounded-full bg-card text-primary shadow-card"><ChevronRight className="size-4" /></button>
        </div>
      </div>
      <figure className="mt-6 rounded-2xl bg-card p-6 shadow-card">
        <div className="flex gap-0.5 text-orange">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-4 fill-current" />)}</div>
        <blockquote className="mt-4 leading-relaxed text-foreground/85">"{t.quote}"</blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-navy text-sm font-bold text-navy-foreground">{t.name.split(" ").map((n) => n[0]).join("")}</span>
          <div><p className="text-sm font-bold text-navy">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div>
        </figcaption>
      </figure>
    </div>
  );
}
