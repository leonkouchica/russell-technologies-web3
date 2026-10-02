import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Lightbulb, PenTool, Rocket, Wrench } from "lucide-react";
import heroImg from "@/assets/services-hero.jpg";
import { services } from "@/lib/site-data";
import { CtaBand, PageHero, PrimaryBtn, SectionHead, ServiceCard, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/services/")({
  head: () => meta("Services — Russell Technologies", "Web development, mobile applications, automation and AI solutions tailored to your business."),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title={<>Technology services that <span className="text-primary">deliver results</span></>} text="From websites and mobile apps to automation and AI, we help organizations build the digital tools they need." image={heroImg}>
        <PrimaryBtn to="/contact">Start a project <ArrowRight className="size-4" /></PrimaryBtn>
      </PageHero>
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="What we offer" title="Four ways we help you grow" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="How we work" title="A proven delivery process" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[[Lightbulb, "Discover", "We learn your goals, users and constraints."], [PenTool, "Design", "We shape the experience and the architecture."], [Wrench, "Build", "We develop, test and iterate in short cycles."], [Rocket, "Launch", "We deploy, train your team and keep improving."]].map(([I, t, d], i) => {
              const Icon = I as typeof Lightbulb;
              return (
                <div key={t as string} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-center justify-between"><div className="grid size-12 place-items-center rounded-xl bg-blue-soft text-primary"><Icon className="size-6" /></div><span className="text-3xl font-extrabold text-border">0{i + 1}</span></div>
                  <h3 className="mt-5 text-lg font-bold">{t as string}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
