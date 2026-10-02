import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import heroImg from "@/assets/clients-hero.jpg";
import student from "@/assets/student.jpg";
import gavel from "@/assets/gavel.jpg";
import farmer from "@/assets/farmer.jpg";
import building from "@/assets/building.jpg";
import logistics from "@/assets/logistics.jpg";
import healthcare from "@/assets/healthcare.jpg";
import { clients, testimonials } from "@/lib/site-data";
import { CtaBand, PageHero, PrimaryBtn, SectionHead, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/clients")({
  head: () => meta("Clients & Case Studies — Russell Technologies", "Organizations across education, legal, agriculture, government, logistics and healthcare that trust Russell Technologies."),
  component: Clients,
});

const industries = [
  { name: "Education", img: student, w: 896, h: 752 },
  { name: "Legal", img: gavel, w: 992, h: 672 },
  { name: "Agriculture", img: farmer, w: 992, h: 672 },
  { name: "Government", img: building, w: 752, h: 896 },
  { name: "Logistics", img: logistics, w: 912, h: 736 },
  { name: "Healthcare", img: healthcare, w: 912, h: 736 },
];

const cases = [
  { client: "Copperbelt Schools", product: "EduPro", result: "60% less admin time across 12 schools", img: student },
  { client: "Banda & Co. Advocates", product: "Russell Law", result: "Zero missed court deadlines in 18 months", img: gavel },
  { client: "AgriLink Cooperative", product: "Farmspots", result: "35% higher farmer income through direct sales", img: farmer },
];

function Clients() {
  return (
    <>
      <PageHero eyebrow="Our clients" title={<>Trusted by organizations that <span className="text-primary">lead</span></>} text="We partner with schools, firms, cooperatives, businesses and public institutions to deliver measurable results." image={heroImg}>
        <PrimaryBtn to="/contact">Become a client <ArrowRight className="size-4" /></PrimaryBtn>
      </PageHero>
      <section className="py-14">
        <div className="container-x grid grid-cols-2 gap-4 sm:grid-cols-4">
          {clients.map((c) => <div key={c} className="grid h-20 place-items-center rounded-xl border border-border bg-surface px-3 text-center text-sm font-bold text-navy/70">{c}</div>)}
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="Industries" title="Industries we serve" />
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-3">
            {industries.map((i) => (
              <div key={i.name} className="group relative overflow-hidden rounded-2xl">
                <img src={i.img} alt={i.name} width={i.w} height={i.h} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 to-transparent" />
                <p className="absolute bottom-4 left-5 text-lg font-bold text-navy-foreground">{i.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Case studies" title="Results that speak" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cases.map((c) => (
              <article key={c.client} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <img src={c.img} alt="" width={992} height={672} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-6">
                  <span className="eyebrow">{c.product}</span>
                  <h3 className="mt-2 text-lg font-bold">{c.client}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.result}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-card p-7 shadow-card">
              <Quote className="size-8 text-orange" />
              <blockquote className="mt-4 leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6"><p className="font-bold text-navy">{t.name}</p><p className="text-sm text-muted-foreground">{t.role}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
