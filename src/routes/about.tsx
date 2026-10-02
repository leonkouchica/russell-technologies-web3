import { createFileRoute } from "@tanstack/react-router";
import { Eye, Handshake, Lightbulb, ShieldCheck, Target, Users } from "lucide-react";
import heroImg from "@/assets/about-hero.jpg";
import office from "@/assets/about-office.jpg";
import team from "@/assets/about-team.jpg";
import mission from "@/assets/mission.jpg";
import { metrics } from "@/lib/site-data";
import { CtaBand, PageHero, PrimaryBtn, SectionHead, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/about")({
  head: () => meta("About Us — Russell Technologies", "Our story, mission, vision and the values behind Russell Technologies."),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>Building technology that <span className="text-primary">empowers</span> people</>} text="Russell Technologies is a software company helping organizations across Africa solve problems with practical, reliable technology." image={heroImg}>
        <PrimaryBtn to="/contact">Work with us</PrimaryBtn>
      </PageHero>
      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img src={office} alt="Our office" width={1216} height={640} loading="lazy" className="aspect-[16/10] w-full rounded-2xl object-cover shadow-card" />
          <div>
            <SectionHead center={false} eyebrow="Our story" title="From a small team to a trusted partner" />
            <p className="mt-5 leading-relaxed text-muted-foreground">We started with a simple belief: great software should be accessible to every organization. Over a decade later, we have delivered more than 150 projects and built products used by schools, law firms, artists and farmers.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {metrics.map((m) => <div key={m.label}><p className="text-2xl font-extrabold text-navy">{m.value}</p><p className="text-xs text-muted-foreground">{m.label}</p></div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="grid gap-5">
            {([[Target, "Our mission", "To deliver innovative, reliable technology that helps organizations grow and serve people better."], [Eye, "Our vision", "To be Africa's most trusted technology partner for digital transformation."]] as const).map(([Icon, t, d]) => (
              <div key={t} className="flex gap-4 rounded-2xl bg-card p-6 shadow-card">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-soft text-primary"><Icon className="size-6" /></div>
                <div><h3 className="text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
              </div>
            ))}
          </div>
          <img src={mission} alt="" width={1024} height={768} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
        </div>
      </section>
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Our values" title="What guides us" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {([[Lightbulb, "Innovation"], [ShieldCheck, "Integrity"], [Users, "Customer focus"], [Handshake, "Partnership"]] as const).map(([Icon, t]) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-orange-soft text-orange"><Icon className="size-6" /></div>
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-navy">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-orange">Our team</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-foreground md:text-4xl">Engineers, designers and problem solvers</h2>
            <p className="mt-5 text-navy-foreground/75">Our multidisciplinary team brings deep expertise in software, product design, data and AI — and a commitment to your success.</p>
          </div>
          <img src={team} alt="Our team" width={1216} height={640} loading="lazy" className="aspect-[16/10] w-full rounded-2xl object-cover" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
