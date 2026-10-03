import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, BarChart3, Building2, Car, CheckCircle2, Flame, Flower2, Gem, Globe2, GraduationCap, Handshake, Landmark, Layers, Leaf, School, Scale, Sprout, Users } from "lucide-react";
import heroImg from "@/assets/clients-handshake.jpg";
import student from "@/assets/student.jpg";
import farmer from "@/assets/farmer.jpg";
import artist from "@/assets/artist.jpg";
import av1 from "@/assets/avatar-1.jpg";
import av2 from "@/assets/avatar-2.jpg";
import av3 from "@/assets/avatar-3.jpg";
import { meta } from "@/components/site/blocks";
import { BlueCta, Btn, FloatCard, LineEyebrow, SplitHero, TestimonialCard } from "@/components/site/kit";

export const Route = createFileRoute("/clients")({
  head: () => meta("Our Clients — Russell Technologies", "Schools, businesses, government institutions and organizations across Africa that trust Russell Technologies."),
  component: Clients,
});

const orgs = [
  [Landmark, "Lagos State", "Government", "text-chart-2"], [GraduationCap, "EDUPRO", "Partner Schools", "text-primary"], [Sprout, "FARMSPOTS", "Agriculture Partners", "text-chart-2"],
  [Flame, "BLUEFLAME", "Artists & Labels", "text-primary"], [Scale, "RUSSELL LAW", "Law Firms & Chambers", "text-navy"], [CheckCircle2, "Talks Ventures", "Business Solutions", "text-orange"],
  [Leaf, "OKFARM", "Agribusiness Partners", "text-chart-2"], [Car, "ParkSwiftly", "Parking & Mobility", "text-primary"], [Flower2, "AprilWind Couture", "Fashion & Retail", "text-chart-4"],
  [Gem, "Funlab Perfumes", "Lifestyle & Beauty", "text-orange"], [Leaf, "TerraNatura Africa", "Natural Products", "text-chart-2"], [School, "Various Schools", "Across Africa", "text-primary"],
] as const;

const stories = [
  { brand: "EDUPRO", t: "Digitizing School Operations", d: "Helping over 500 schools streamline administration, communication, and academic management.", img: student },
  { brand: "FARMSPOTS", t: "Connecting Farmers to Bigger Markets", d: "Building a digital marketplace that empowers farmers and agribusinesses across Africa.", img: farmer },
  { brand: "BLUEFLAME", t: "Empowering African Artists", d: "Providing a modern music platform for artists to reach global audiences and grow their careers.", img: artist },
];

const quotes = [
  { avatar: av1, quote: "EDUPRO has transformed the way we manage our school. It's simple, reliable and has made our operations so much more efficient.", name: "Mrs. Adebisi", role: "School Administrator", place: "Lagos, Nigeria" },
  { avatar: av3, quote: "FARMSPOTS has given our farmers a bigger market and better opportunities. The platform is easy to use and has real impact.", name: "Mr. Chinedu Okafor", role: "Agribusiness Owner", place: "Enugu, Nigeria" },
  { avatar: av2, quote: "BLUEFLAME has made it easier for me to share my music with the world. The support and tools are amazing.", name: "Zara Williams", role: "Recording Artist", place: "Lagos, Nigeria" },
];

function Arrows({ target }: { target: React.RefObject<HTMLDivElement | null> }) {
  const go = (d: number) => target.current?.scrollBy({ left: d * target.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div className="flex gap-2">
      <button onClick={() => go(-1)} aria-label="Previous" className="grid size-9 place-items-center rounded-full bg-blue-soft text-primary"><ArrowLeft className="size-4" /></button>
      <button onClick={() => go(1)} aria-label="Next" className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><ArrowRight className="size-4" /></button>
    </div>
  );
}

function Clients() {
  const logos = useRef<HTMLDivElement>(null);
  const quoteRow = useRef<HTMLDivElement>(null);
  return (
    <>
      <SplitHero
        eyebrow="Our clients" title="Trusted by Forward-Thinking" accent="Organizations." image={heroImg} imageAlt="Russell team shaking hands with a client"
        text="We partner with schools, businesses, government institutions, and innovative organizations across Africa and beyond to deliver reliable digital solutions that create real impact."
        actions={<><Btn to="/contact">Work With Us</Btn><Btn to="/contact" variant="outline">Contact Our Team</Btn></>}
        card={<FloatCard icon={Handshake} title="Building Long-Term Partnerships" text="Technology. People. Progress." />}
      />

      <section className="bg-navy py-10">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <LineEyebrow tone="orange">Our clients in numbers</LineEyebrow>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-foreground md:text-4xl">Real Partnerships. Measurable Impact.</h2>
            <p className="mt-3 text-navy-foreground/75">We are proud to work with organizations that trust us to support their digital transformation journeys.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {([[Users, "50+", "Happy Clients"], [Globe2, "5+", "Countries"], [Layers, "10+", "Industries"], [BarChart3, "95%", "Client Retention"]] as const).map(([I, v, l]) => (
              <div key={l} className="rounded-xl border border-navy-foreground/10 bg-navy-soft p-5 text-center">
                <div className="mx-auto grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"><I className="size-5" /></div>
                <p className="mt-3 text-2xl font-extrabold text-navy-foreground">{v}</p><p className="text-xs text-navy-foreground/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <div className="grid items-end gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <div><LineEyebrow>Our clients</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold">Organizations That Trust Us.</h2></div>
            <p className="text-sm text-muted-foreground">From educational institutions to innovative businesses, our clients choose us for our commitment to quality, reliability, and results.</p>
            <Arrows target={logos} />
          </div>
          <div ref={logos} className="mt-8 grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto pb-2 [scrollbar-width:none] auto-cols-[minmax(11rem,1fr)]">
            {orgs.map(([I, n, s, c]) => (
              <div key={n} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                <I className={`size-8 shrink-0 ${c}`} />
                <div><p className="text-sm font-extrabold text-navy">{n}</p><p className="text-[11px] text-muted-foreground">{s}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="container-x">
          <div className="grid items-end gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <div><LineEyebrow>Client success stories</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold">Real Results. Real Impact.</h2></div>
            <p className="text-sm text-muted-foreground">See how we've helped our clients solve challenges, improve operations, and achieve their goals.</p>
            <Btn to="/services" variant="outline">View All Case Studies</Btn>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {stories.map((s) => (
              <article key={s.brand} className="relative overflow-hidden rounded-xl border border-border bg-card shadow-card">
                <img src={s.img} alt="" width={992} height={672} loading="lazy" className="absolute inset-y-0 right-0 h-full w-1/2 object-cover" />
                <div className="absolute inset-y-0 right-0 w-[60%] bg-gradient-to-r from-card to-transparent" />
                <div className="relative w-[62%] p-5">
                  <p className="text-[11px] font-bold text-navy">{s.brand}</p>
                  <h3 className="mt-3 text-lg font-extrabold leading-snug">{s.t}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
                  <Link to="/products" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">Read Case Study <ArrowRight className="size-3.5" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <div className="grid items-end gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <div><LineEyebrow>What our clients say</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold">Trusted by Leaders Across Industries.</h2></div>
            <p className="text-sm text-muted-foreground">Our clients' success inspires us to do more. Here's what some of them have to say about working with Russell Technologies.</p>
            <Arrows target={quoteRow} />
          </div>
          <div ref={quoteRow} className="mt-8 grid grid-flow-col gap-5 overflow-x-auto pb-2 [scrollbar-width:none] auto-cols-[minmax(18rem,1fr)]">
            {quotes.map((q) => <TestimonialCard key={q.name} {...q} stars />)}
          </div>
        </div>
      </section>
      <div className="pb-10"><BlueCta eyebrow="Let's build together" title="Join Our Growing List of Satisfied Clients." text="Whether you're a school, business, or institution, we're ready to help you achieve more with technology." /></div>
      <span className="hidden"><Building2 /></span>
    </>
  );
}
