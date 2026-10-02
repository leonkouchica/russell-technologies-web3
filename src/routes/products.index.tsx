import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Headphones, Lock, Settings2, Smartphone } from "lucide-react";
import heroImg from "@/assets/products-hero.jpg";
import { products } from "@/lib/site-data";
import { CtaBand, PageHero, PrimaryBtn, ProductCard, SectionHead, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/products/")({
  head: () => meta("Products — Russell Technologies", "EduPro, Russell Law, Blueflame and Farmspots — ready-to-use platforms for education, law, media and agriculture."),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Our products" title={<>Platforms built for <span className="text-orange">real industries</span></>} text="Proven software products that help schools, law firms, artists and farmers work smarter." image={heroImg}>
        <PrimaryBtn to="/contact">Request a demo <ArrowRight className="size-4" /></PrimaryBtn>
      </PageHero>
      <section className="section-y">
        <div className="container-x">
          <SectionHead eyebrow="Product suite" title="Choose the right product" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </div>
      </section>
      <section className="section-y bg-surface">
        <div className="container-x">
          <SectionHead eyebrow="Why our products" title="Built to work for you" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {([[Lock, "Secure", "Enterprise-grade security and backups."], [Smartphone, "Mobile ready", "Works on any device, anywhere."], [Settings2, "Customizable", "Configured to your workflows."], [Headphones, "Local support", "Training and support from our team."]] as const).map(([Icon, t, d]) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid size-12 place-items-center rounded-xl bg-orange-soft text-orange"><Icon className="size-6" /></div>
                <h3 className="mt-5 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
