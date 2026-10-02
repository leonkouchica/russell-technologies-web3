import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";
import hero from "@/assets/home-hero.jpg";
import caseWoman from "@/assets/case-woman.jpg";
import { clients, metrics, posts, products, services, testimonials } from "@/lib/site-data";
import { CtaBand, OutlineBtn, PostCard, PrimaryBtn, ProductCard, SectionHead, ServiceCard, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/")({
  head: () => meta("Russell Technologies — Digital Solutions That Drive Growth", "Web development, mobile apps, automation and AI solutions, plus products like EduPro, Russell Law, Blueflame and Farmspots."),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="bg-surface">
        <div className="container-x grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow">Technology that moves you forward</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] md:text-6xl">
              Digital Solutions That <span className="text-primary">Drive</span> <span className="text-orange">Growth</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We design and build software, mobile apps, automation and AI solutions that help organizations work smarter and grow faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryBtn to="/contact">Book a Demo <ArrowRight className="size-4" /></PrimaryBtn>
              <OutlineBtn to="/services">Our Services</OutlineBtn>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy">
              {["Trusted by 50+ organizations", "Local support", "Secure & scalable"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img src={hero} alt="Russell Technologies team at work" width={1024} height={1024} className="aspect-square w-full rounded-3xl object-cover shadow-card" />
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
              <div className="grid size-11 place-items-center rounded-xl bg-orange-soft text-orange"><Star className="size-5 fill-current" /></div>
              <div><p className="text-lg font-extrabold text-navy">99%</p><p className="text-xs text-muted-foreground">Client satisfaction</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border">
        <div className="container-x grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-3xl font-extrabold text-navy md:text-4xl">{m.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <p className="text-center text-sm font-semibold text-muted-foreground">Trusted by leading organizations</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {clients.slice(0, 8).map((c) => (
              <div key={c} className="grid h-16 place-items-center rounded-xl border border-border bg-surface px-3 text-center text-sm font-bold text-navy/70">{c}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="What we do" title="Services built for growth" text="End-to-end technology services that solve real business problems." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Our products" title="Products that power industries" text="Ready-to-use platforms for education, law, media and agriculture." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      <section className="section-y bg-navy">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img src={caseWoman} alt="" width={816} height={816} loading="lazy" className="aspect-square w-full max-w-lg rounded-3xl object-cover" />
          <div>
            <p className="eyebrow text-orange">Case study</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-foreground md:text-4xl">How Copperbelt Schools went fully digital with EduPro</h2>
            <p className="mt-5 text-navy-foreground/75">Across 12 schools, administration time dropped dramatically while parents gained real-time access to fees and results.</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["60%", "Less admin time"], ["12", "Schools onboarded"], ["8k+", "Students managed"]].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-navy-soft p-4"><p className="text-2xl font-extrabold text-orange">{v}</p><p className="mt-1 text-xs text-navy-foreground/70">{l}</p></div>
              ))}
            </div>
            <div className="mt-8"><PrimaryBtn to="/clients">View all case studies <ArrowRight className="size-4" /></PrimaryBtn></div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Testimonials" title="What our clients say" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <Quote className="size-8 text-orange" />
                <blockquote className="mt-4 leading-relaxed text-foreground/85">"{t.quote}"</blockquote>
                <figcaption className="mt-6"><p className="font-bold text-navy">{t.name}</p><p className="text-sm text-muted-foreground">{t.role}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead center={false} eyebrow="Latest insights" title="From our blog" />
            <OutlineBtn to="/blog">View all articles</OutlineBtn>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">{posts.slice(0, 3).map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
