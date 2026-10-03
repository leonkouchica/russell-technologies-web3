import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Building2, CheckCircle2, Flame, Globe2, GraduationCap, Layers, LayoutGrid, Leaf, Lock, Rocket, Scale, ShieldCheck, Sprout, Target, Timer, TrendingUp, Users, UserCheck } from "lucide-react";
import devices from "@/assets/products-devices.jpg";
import classroom from "@/assets/classroom.jpg";
import prodLaw from "@/assets/prod-law.jpg";
import prodBlue from "@/assets/prod-blueflame.jpg";
import prodFarm from "@/assets/prod-farmspots.jpg";
import student from "@/assets/student.jpg";
import gavel from "@/assets/gavel.jpg";
import farmer from "@/assets/farmer.jpg";
import building from "@/assets/building.jpg";
import av1 from "@/assets/avatar-1.jpg";
import av2 from "@/assets/avatar-2.jpg";
import av3 from "@/assets/avatar-3.jpg";
import { meta } from "@/components/site/blocks";
import { BlueCta, Btn, LineEyebrow, PillEyebrow, TestimonialCard } from "@/components/site/kit";

export const Route = createFileRoute("/products/")({
  head: () => meta("Products — Russell Technologies", "EDUPRO, RUSSELL LAW, BLUEFLAME and FARMSPOTS — software built for schools, law firms, creators and agriculture."),
  component: ProductsPage,
});

const cards = [
  { slug: "edupro", name: "EDUPRO", sub: "Education Management System", icon: GraduationCap, img: classroom, text: "A complete school management system for primary and secondary schools — simplifying operations, engaging students, and empowering educators.", feats: ["Student Management", "Admissions & Enrollment", "Fees & Payments", "Communication & Reporting"], tint: "from-orange-soft", ic: "text-primary", btn: "bg-primary hover:bg-primary/90", cta: "Explore EDUPRO" },
  { slug: "russell-law", name: "RUSSELL LAW", sub: "Legal Technology Platform", icon: Scale, img: prodLaw, text: "An all-in-one solution for law firms, law students, and legal professionals — manage cases, documents, billing, learning, and professional networking.", feats: ["Case Management", "Document Handling", "Billing & Invoicing", "Legal Networking"], tint: "from-chart-4/10", ic: "text-chart-4", btn: "bg-chart-4 hover:bg-chart-4/90", cta: "Explore RUSSELL LAW" },
  { slug: "blueflame", name: "BLUEFLAME", sub: "Next-Gen Product Platform", icon: Flame, img: prodBlue, text: "A future Russell Technologies product currently in design and scope development. Final features and positioning will be announced soon.", feats: ["Product Discovery", "Scope Definition", "Prototype Planning", "Launch Readiness"], tint: "from-blue-soft", ic: "text-primary", btn: "bg-primary/60 hover:bg-primary/70", cta: "Learn About BLUEFLAME", badge: "In development" },
  { slug: "farmspots", name: "FARMSPOTS", sub: "Agriculture Marketplace", icon: Sprout, img: prodFarm, text: "An online marketplace connecting farmers, buyers, and distributors with verified non-GMO food supply, farmland verification, and agriculture education.", feats: ["Verified Food Supply", "Farmland Verification", "Farm Product Marketplace", "Education & Podcast"], tint: "from-chart-2/10", ic: "text-chart-2", btn: "bg-chart-2 hover:bg-chart-2/90", cta: "Explore FARMSPOTS" },
] as const;

function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <div className="container-x grid items-center gap-8 py-12 lg:grid-cols-[1fr_1.25fr] lg:py-14">
          <div>
            <PillEyebrow>Our products</PillEyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-[3.4rem]">Software for Real-World <span className="text-primary">Impact.</span></h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground/80">Our products are designed to solve real business challenges — helping schools, law firms, businesses, and the agriculture ecosystem work smarter, faster and more efficiently.</p>
            <div className="mt-8 flex flex-wrap gap-4"><Btn to="/products">Explore Our Products</Btn><Btn to="/contact" variant="outline">Talk to Our Team</Btn></div>
          </div>
          <div className="relative">
            <img src={devices} alt="Russell products on laptop, tablet and phone" width={1408} height={768} className="w-full rounded-2xl object-cover" />
            <div className="absolute left-4 top-2 flex items-center gap-3 rounded-xl bg-card p-3 shadow-card"><div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><LayoutGrid className="size-4" /></div><div><p className="text-xs font-bold text-navy">4 Products</p><p className="text-[11px] text-muted-foreground">Multiple Industries</p></div></div>
            <div className="absolute right-2 top-8 flex items-center gap-3 rounded-xl bg-card p-3 shadow-card"><Globe2 className="size-7 text-primary" /><div><p className="text-xs font-bold text-navy">Built in Africa</p><p className="text-[11px] text-muted-foreground">For Global Impact</p></div></div>
            <div className="absolute -bottom-3 right-2 hidden gap-2 sm:flex">
              {([[ShieldCheck, "Reliable"], [Lock, "Secure"], [BarChart3, "Scalable"], [UserCheck, "User Focused"]] as const).map(([I, l]) => <span key={l} className="flex items-center gap-1.5 rounded-lg bg-card px-3 py-2 text-xs font-semibold text-navy shadow-card"><I className="size-4 text-primary" />{l}</span>)}
            </div>
          </div>
        </div>
        <div className="container-x pb-10">
          <div className="grid grid-cols-2 gap-6 rounded-xl border border-border bg-card p-6 shadow-card md:grid-cols-4 md:divide-x md:divide-border">
            {([[LayoutGrid, "4", "Core Products"], [Users, "10K+", "Active Users"], [Timer, "High", "System Uptime"], [Building2, "Multi-Industry", "Solutions"]] as const).map(([I, v, l]) => (
              <div key={l} className="flex items-center gap-4 md:pl-6 first:md:pl-0"><div className="grid size-12 place-items-center rounded-xl bg-blue-soft text-primary"><I className="size-6" /></div><div><p className="text-lg font-extrabold text-navy">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-x">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr_auto]">
            <div><LineEyebrow>Our products</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Innovative Solutions for Diverse Industries.</h2></div>
            <p className="text-sm text-muted-foreground">Each product is built with a deep understanding of industry needs, combining modern technology with practical solutions that create measurable value.</p>
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Compare Products <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <article key={c.slug} className={`flex flex-col rounded-2xl border border-border bg-gradient-to-b ${c.tint} to-card p-6 shadow-card`}>
                <div className={`grid size-12 place-items-center rounded-full bg-card shadow-card ${c.ic}`}><c.icon className="size-6" /></div>
                <h3 className="mt-5 flex flex-wrap items-center gap-2 text-xl font-extrabold">{c.name}{"badge" in c && <span className="rounded-full bg-blue-soft px-2 py-0.5 text-[9px] font-bold uppercase text-primary">{c.badge}</span>}</h3>
                <p className={`text-xs font-medium ${"badge" in c ? "text-primary" : "text-muted-foreground"}`}>{c.sub}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                <img src={c.img} alt={`${c.name} screenshot`} width={992} height={672} loading="lazy" className="mt-5 aspect-[16/10] w-full rounded-lg object-cover" />
                <ul className="mt-5 flex-1 space-y-2.5">{c.feats.map((f) => <li key={f} className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className={`size-4 ${c.ic}`} />{f}</li>)}</ul>
                <Link to="/products/$slug" params={{ slug: c.slug }} className={`mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold text-primary-foreground ${c.btn}`}>{c.cta} <ArrowRight className="size-4" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <LineEyebrow>Why Russell products</LineEyebrow>
            <h2 className="mt-2 text-3xl font-extrabold">Built for Real Impact.</h2>
            <p className="mt-3 text-muted-foreground">Our products are designed with a clear focus — solving real problems, improving efficiency, and creating value for the people and industries we serve.</p>
            <div className="mt-6"><Btn to="/about" variant="outline">Our Product Approach</Btn></div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-border">
            {([[Target, "Real Problems", "Built to solve industry-specific challenges."], [Layers, "Modern Technology", "Secure, scalable and reliable systems."], [Users, "User Focused", "Designed for real users and real workflows."], [TrendingUp, "Measurable Value", "Tools that improve efficiency and drive growth."]] as const).map(([I, t, d]) => (
              <div key={t} className="md:px-4"><div className="grid size-14 place-items-center rounded-full bg-blue-soft text-primary"><I className="size-7" /></div><h3 className="mt-4 text-sm font-bold">{t}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-12">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <LineEyebrow tone="orange">Built across industries</LineEyebrow>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-foreground">One Technology Partner. Multiple Possibilities.</h2>
            <p className="mt-4 text-navy-foreground/75">From education to legal services, agriculture to emerging industries, our products help organizations operate better and create lasting value.</p>
            <Link to="/clients" className="mt-6 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-navy">See All Industries <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {([[student, GraduationCap, "Education", "Schools & Institutions"], [gavel, Scale, "Legal Services", "Firms & Professionals"], [farmer, Leaf, "Agriculture", "Farmers & Distributors"], [building, Building2, "Businesses", "Enterprises & SMEs"]] as const).map(([img, I, t, s]) => (
              <div key={t} className="relative overflow-hidden rounded-xl">
                <img src={img} alt={t} width={640} height={768} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute bottom-3 left-3"><I className="mb-2 size-6 text-navy-foreground/80" /><p className="text-sm font-bold text-navy-foreground">{t}</p><p className="text-[11px] text-navy-foreground/75">{s}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="container-x">
          <div className="grid items-end gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <div><LineEyebrow>Trusted by users</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold">What Our Users Say</h2></div>
            <p className="text-sm text-muted-foreground">Real feedback from schools, legal professionals, farmers, and businesses using our products to achieve their goals.</p>
            <Link to="/clients" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">View all testimonials <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <TestimonialCard avatar={av1} quote="EDUPRO has simplified our school operations and improved communication with parents. It's a game changer!" name="Mrs. Adebisi" role="School Administrator" />
            <TestimonialCard avatar={av2} quote="RUSSELL LAW has transformed how we manage cases and documents. The platform is intuitive and reliable." name="Tunde A." role="Managing Partner, Law Firm" />
            <TestimonialCard avatar={av3} quote="FARMSPOTS gives us a trusted platform to reach more buyers and showcase our produce. It's exactly what we needed." name="Ibrahim S." role="Farmer, Oyo State" />
          </div>
        </div>
      </section>
      <div className="bg-surface pb-10"><BlueCta title="Let's Build Better Solutions Together" text="Whether you want to explore our products, request a demo, or discuss a custom solution — our team is ready to help." /></div>
      <span className="hidden"><Rocket /></span>
    </>
  );
}
