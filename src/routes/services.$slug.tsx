import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/site-data";
import { CtaBand, OutlineBtn, PageHero, PrimaryBtn, SectionHead, ServiceCard, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) =>
    loaderData ? meta(`${loaderData.service.title} — Russell Technologies`, loaderData.service.short) : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Services" title={s.title} text={s.intro} image={s.image}>
        <PrimaryBtn to="/contact">Get a quote <ArrowRight className="size-4" /></PrimaryBtn>
        <OutlineBtn to="/services">All services</OutlineBtn>
      </PageHero>
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead center={false} eyebrow="What's included" title={`Our ${s.title.toLowerCase()} capabilities`} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" /><span className="font-medium text-navy">{f}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead center={false} eyebrow="Our process" title="How we deliver" />
            <ol className="mt-8 space-y-4">
              {s.process.map((p, i) => (
                <li key={p} className="flex items-center gap-4 rounded-xl bg-surface p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange text-sm font-bold text-orange-foreground">{i + 1}</span>
                  <span className="font-semibold text-navy">{p}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm font-semibold text-navy">Technologies we use</p>
            <div className="mt-3 flex flex-wrap gap-2">{s.tech.map((t) => <span key={t} className="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-primary">{t}</span>)}</div>
          </div>
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="Explore more" title="Other services" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">{services.filter((x) => x.slug !== s.slug).map((x) => <ServiceCard key={x.slug} s={x} />)}</div>
        </div>
      </section>
      <CtaBand title={`Let's build your ${s.title.toLowerCase()} project`} />
    </>
  );
}
