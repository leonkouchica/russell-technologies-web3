import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import { products } from "@/lib/site-data";
import { CtaBand, OutlineBtn, PageHero, PrimaryBtn, ProductCard, SectionHead, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    loaderData ? meta(`${loaderData.product.name} — ${loaderData.product.tag} | Russell Technologies`, loaderData.product.short) : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  component: ProductDetail,
});

function ProductDetail() {
  const { product: p } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={p.tag} title={p.name} text={p.intro} image={p.image}>
        <PrimaryBtn to="/contact">Book a demo <ArrowRight className="size-4" /></PrimaryBtn>
        <OutlineBtn to="/products">All products</OutlineBtn>
      </PageHero>
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Features" title={`Everything you need in ${p.name}`} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6 shadow-card">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" /><span className="font-semibold text-navy">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <SectionHead center={false} eyebrow="Who it's for" title={`${p.name} is built for`} text="Configured for the way your organization works, with training and local support included." />
          <div className="grid grid-cols-2 gap-4">
            {p.audience.map((a) => (
              <div key={a} className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card"><Users className="size-5 shrink-0 text-orange" /><span className="font-semibold text-navy">{a}</span></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="More products" title="Explore the suite" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">{products.filter((x) => x.slug !== p.slug).map((x) => <ProductCard key={x.slug} p={x} />)}</div>
        </div>
      </section>
      <CtaBand title={`See ${p.name} in action`} text="Book a free demo and we'll walk you through it." />
    </>
  );
}
