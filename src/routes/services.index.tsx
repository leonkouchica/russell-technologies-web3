import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BarChart3, Bot, CheckCircle2, Code2, FileText, Gauge, Headphones, Layers, Lock, Play, Rocket, Search, Settings, Smartphone, Smile, Target, Timer, TrendingUp, Wrench,
} from "lucide-react";
import heroImg from "@/assets/services-hero.webp";
import building from "@/assets/building.webp";
import logistics from "@/assets/logistics.webp";
import healthcare from "@/assets/healthcare.webp";
import classroom from "@/assets/classroom.webp";
import { services } from "@/lib/site-data";
import { CtaBand, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/services/")({
  head: () => meta("Services — Russell Technologies", "Web development, mobile applications, automation systems and AI solutions that move your business forward."),
  component: ServicesPage,
});

const Eyebrow = ({ children, dark }: { children: string; dark?: boolean }) => (
  <p className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] ${dark ? "text-navy-foreground/70" : "text-primary"}`}><span className="h-0.5 w-6 bg-orange" />{children}</p>
);
const icons = [Code2, Smartphone, Settings, Bot];
const tones = ["text-primary", "text-primary", "text-orange", "text-chart-4"];

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Eyebrow>Our services</Eyebrow>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-6xl">Technology that moves your business <span className="text-primary">forward.</span></h1>
            <p className="mt-6 max-w-lg text-foreground/75">We design, build, and integrate digital solutions that solve real business problems — from customer experiences to internal operations, automation, and AI.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Discuss Your Project <ArrowRight className="size-4" /></Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-background px-6 py-3.5 text-sm font-semibold text-primary hover:bg-blue-soft"><Play className="size-4" />Our Approach</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 size-56 rounded-full border-[14px] border-orange border-b-transparent border-r-transparent" aria-hidden />
            <img src={heroImg} alt="Engineer working on code" width={1408} height={768} className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
            <div className="absolute -bottom-6 left-6 rounded-xl bg-card p-4 shadow-card">
              <p className="text-sm font-bold text-navy">Digital Solutions<br />Built for Impact</p>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                {([[Layers, "Scalable Systems"], [Lock, "Secure Infrastructure"], [Target, "Real Business Outcomes"], [Headphones, "End-to-End Support"]] as const).map(([I, t]) => <li key={t} className="flex items-center gap-2"><I className="size-4 text-orange" />{t}</li>)}
              </ul>
            </div>
            <div className="absolute -right-2 top-1/2 hidden items-center gap-2 rounded-xl bg-card px-4 py-3 text-xs font-semibold text-navy shadow-card sm:flex"><Rocket className="size-5 text-orange" />From idea<br />to implementation</div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><Eyebrow>Our core services</Eyebrow><h2 className="mt-2 text-3xl font-extrabold md:text-4xl">What We Build</h2></div>
            <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Start a project <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = icons[i]!;
              return (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex flex-col rounded-2xl border border-border bg-card p-3 shadow-card transition hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-xl">
                    <img src={s.image} alt={s.title} width={944} height={704} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <span className="absolute left-3 top-3 text-xs font-bold text-primary/70">0{i + 1}</span>
                    <span className={`absolute left-8 top-4 grid size-10 place-items-center rounded-full bg-card shadow-card ${tones[i]}`}><Icon className="size-5" /></span>
                  </div>
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                    <ul className="mt-4 flex-1 space-y-2 text-sm text-foreground/80">
                      {s.features.slice(0, 4).map((f) => <li key={f} className="flex items-center gap-2"><CheckCircle2 className={`size-4 shrink-0 ${tones[i]}`} />{f}</li>)}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 lg:py-20">
        <div className="container-x">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr_auto]">
            <div><Eyebrow>How we deliver</Eyebrow><h2 className="mt-2 text-3xl font-extrabold md:text-4xl">A structured approach to real results.</h2></div>
            <p className="text-sm text-muted-foreground">We combine strategy, design, engineering, and domain expertise to deliver solutions that are scalable, secure, and built around your business goals.</p>
            <Link to="/about" className="inline-flex w-fit items-center gap-2 rounded-lg border border-primary/40 bg-background px-5 py-2.5 text-sm font-semibold text-primary">Our Process <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {([[Search, "Discover", "Understand your goals, challenges, and opportunities.", "bg-blue-soft text-primary"], [FileText, "Plan", "Define the right solution, architecture, and roadmap.", "bg-chart-2/15 text-chart-2"], [Code2, "Build", "Design, develop, and integrate your solution.", "bg-orange-soft text-orange"], [Rocket, "Deploy", "Launch, train, and ensure smooth adoption.", "bg-chart-4/15 text-chart-4"], [Headphones, "Support", "Keep your systems running, secure, and improving.", "bg-blue-soft text-primary"]] as const).map(([I, t, d, c], i) => (
              <div key={t} className="relative">
                <span className={`grid size-14 place-items-center rounded-full ${c}`}><I className="size-6" /></span>
                {i < 4 && <ArrowRight className="absolute left-24 top-4 hidden size-5 text-border lg:block" />}
                <p className="mt-4 text-xs font-semibold text-muted-foreground">0{i + 1}</p>
                <h3 className="font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 lg:py-16">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-2">
            <div><Eyebrow dark>Our impact</Eyebrow><h2 className="mt-2 text-3xl font-extrabold text-navy-foreground md:text-4xl">Numbers that reflect real progress.</h2></div>
            <p className="self-center text-sm text-navy-foreground/70">We measure success by the value we create for our clients — more efficient operations, better customer experiences, and sustainable growth.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:divide-x lg:divide-navy-foreground/15">
            {([[BarChart3, "250+", "Projects Delivered"], [Smile, "98%", "Client Satisfaction"], [Gauge, "60%", "Average Performance Improvement"], [Headphones, "24/7", "Support & Maintenance"]] as const).map(([I, v, l]) => (
              <div key={l} className="flex items-center gap-4 lg:px-6 lg:first:pl-0">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-navy-foreground/20 text-primary"><I className="size-5" /></span>
                <div><p className="text-3xl font-extrabold text-navy-foreground">{v}</p><p className="text-sm text-navy-foreground/70">{l}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><Eyebrow>Featured case study</Eyebrow><h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Real problems.<br />Real outcomes.</h2></div>
            <Link to="/clients" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">View all case studies <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_20rem]">
            <div className="grid gap-6 rounded-2xl border border-border bg-card p-5 shadow-card md:grid-cols-[12rem_1fr_auto]">
              <img src={building} alt="" width={752} height={896} loading="lazy" className="h-full max-h-64 w-full rounded-xl object-cover" />
              <div className="self-center">
                <span className="rounded-md bg-blue-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">Financial services</span>
                <h3 className="mt-3 text-xl font-bold">From manual processing to automated operations.</h3>
                <p className="mt-3 text-sm text-muted-foreground">We helped a financial services company automate loan processing, reduce manual work, and improve compliance visibility across multiple teams.</p>
                <Link to="/clients" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Read the full story <ArrowRight className="size-4" /></Link>
              </div>
              <ul className="space-y-5 self-center md:border-l md:border-border md:pl-6">
                {([[Timer, "85%", "Faster processing", "text-orange"], [TrendingUp, "₦2.4B", "Revenue increase", "text-orange"], [Wrench, "40%", "Reduction in operational costs", "text-chart-2"]] as const).map(([I, v, l, c]) => (
                  <li key={l} className="flex items-center gap-3"><I className={`size-5 ${c}`} /><div><p className="text-lg font-extrabold text-navy">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div></li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              {[[logistics, "Logistics", "Streamlining fleet operations with real-time visibility."], [healthcare, "Healthcare", "Improving patient throughput with automation."], [classroom, "Education", "Modernizing school operations with EDUPRO."]].map(([img, t, d]) => (
                <div key={t} className="flex gap-3 rounded-xl border border-border bg-card p-2 shadow-card">
                  <img src={img} alt="" width={160} height={120} loading="lazy" className="h-20 w-24 shrink-0 rounded-lg object-cover" />
                  <div className="py-1"><p className="text-sm font-bold text-navy">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Let's Build What's Next" />
    </>
  );
}
