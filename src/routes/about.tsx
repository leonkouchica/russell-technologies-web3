import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Building2, Eye, Globe2, Layers, Lightbulb, Rocket, ShieldCheck, Target, TrendingUp, Users, UsersRound } from "lucide-react";
import heroImg from "@/assets/about-hero.jpg";
import office from "@/assets/about-office.jpg";
import team from "@/assets/about-team.jpg";
import mission from "@/assets/mission.jpg";
import africa from "@/assets/africa-map.png";
import { meta } from "@/components/site/blocks";
import { BlueCta, Btn, FloatCard, IconBubble, LineEyebrow, SplitHero } from "@/components/site/kit";

export const Route = createFileRoute("/about")({
  head: () => meta("About Us — Russell Technologies", "Our story, values, mission and the team building digital systems for a smarter tomorrow across Africa."),
  component: About,
});

function About() {
  return (
    <>
      <SplitHero
        eyebrow="About us" title="Building Digital Systems for a" accent="Smarter Tomorrow." image={heroImg} imageAlt="Russell Technologies team at work"
        text="Russell Technologies is a technology company focused on building innovative digital solutions that solve real problems, create value, and empower people and businesses across Africa and beyond."
        actions={<><Btn to="/services">Our Services</Btn><Btn to="/contact" variant="outline">Contact Us</Btn></>}
        card={<FloatCard icon={UsersRound} title="A People-Centered" text="Technology Company" />}
      />

      <section className="bg-navy py-12">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <LineEyebrow tone="orange">Our journey in numbers</LineEyebrow>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-foreground md:text-4xl">Impact That Matters.</h2>
            <p className="mt-4 max-w-md text-navy-foreground/75">We are proud of the progress we've made and the trust we've earned from clients, partners and users across Africa and beyond.</p>
            <div className="mt-6"><Btn to="/clients">Our Success Stories</Btn></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {([[Users, "50+", "Happy Clients", "bg-primary"], [Layers, "10+", "Digital Products", "bg-primary"], [Globe2, "5+", "African Countries", "bg-primary"], [UsersRound, "100K+", "End Users Reached", "bg-chart-2"]] as const).map(([I, v, l, c]) => (
              <div key={l} className="flex items-center gap-4 rounded-xl border border-navy-foreground/10 bg-navy-soft p-5">
                <div className={`grid size-12 place-items-center rounded-full ${c} text-primary-foreground`}><I className="size-6" /></div>
                <div><p className="text-2xl font-extrabold text-navy-foreground">{v}</p><p className="text-xs text-navy-foreground/70">{l}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <LineEyebrow>Our story</LineEyebrow>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">From a Vision to Real Impact.</h2>
            <p className="mt-4 text-muted-foreground">Russell Technologies was founded with a simple belief — that technology can make life easier, businesses stronger, and communities more connected.</p>
            <p className="mt-4 text-muted-foreground">What started as a small team with big ideas has grown into a trusted technology partner, delivering solutions that power schools, legal professionals, musicians, farmers, and businesses across Africa.</p>
          </div>
          <div className="relative">
            <img src={office} alt="Russell Technologies office reception" width={1216} height={640} loading="lazy" className="aspect-[16/9] w-full rounded-2xl object-cover shadow-card" />
            <div className="absolute -bottom-4 right-0 md:-right-4"><FloatCard icon={Rocket} title="Our Vision" text="A more connected, innovative and inclusive Africa powered by technology." /></div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="container-x">
          <div className="grid items-end gap-4 lg:grid-cols-2">
            <div><LineEyebrow>Our values</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold md:text-4xl">The Principles That Guide Us.</h2></div>
            <p className="text-muted-foreground">Our values shape how we work, how we serve our clients, and how we build solutions that create lasting impact.</p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {([[Lightbulb, "Innovation", "We embrace new ideas and technologies to solve real-world problems.", "blue"], [Users, "People First", "We design solutions that empower people and improve lives.", "green"], [ShieldCheck, "Integrity", "We do what is right and build trust in every relationship.", "orange"], [BarChart3, "Excellence", "We are committed to delivering high-quality solutions and services.", "purple"]] as const).map(([I, t, d, tone]) => (
              <div key={t} className="rounded-xl border border-border bg-card p-6 shadow-card"><IconBubble icon={I} tone={tone} /><h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy">
        <img src={mission} alt="" width={1024} height={768} loading="lazy" className="absolute inset-y-0 right-0 hidden h-full w-[38%] object-cover lg:block" />
        <div className="absolute inset-y-0 right-0 hidden w-[45%] bg-gradient-to-r from-navy to-transparent lg:block" />
        <div className="container-x relative py-12">
          <LineEyebrow tone="orange">Our purpose</LineEyebrow>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-foreground">Our Mission & Vision</h2>
          <div className="mt-6 grid max-w-3xl gap-5 md:grid-cols-2">
            {([[Target, "Our Mission", "To build innovative digital solutions that solve real problems, create value, and empower people and businesses.", "bg-primary"], [Eye, "Our Vision", "To be a leading technology company in Africa, known for impactful solutions that connect people, businesses, and opportunities.", "bg-chart-2"]] as const).map(([I, t, d, c]) => (
              <div key={t} className="flex gap-4 rounded-xl border border-navy-foreground/10 bg-navy-soft p-6">
                <div className={`grid size-12 shrink-0 place-items-center rounded-full ${c} text-primary-foreground`}><I className="size-6" /></div>
                <div><h3 className="text-lg font-bold text-navy-foreground">{t}</h3><p className="mt-1 text-xs leading-relaxed text-navy-foreground/75">{d}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-6 lg:absolute lg:bottom-10 lg:right-8 lg:mt-0"><FloatCard icon={TrendingUp} title="Driving Sustainable Growth" text="Through Technology" /></div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <LineEyebrow>Our team</LineEyebrow>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">A Passionate Team Behind the Innovation.</h2>
            <p className="mt-4 text-muted-foreground">Our team is made up of experienced developers, designers, strategists, and industry experts who are passionate about using technology to create meaningful change.</p>
            <div className="mt-6"><Btn to="/contact">Join Our Team</Btn></div>
          </div>
          <div className="relative">
            <img src={team} alt="The Russell Technologies team" width={1216} height={640} loading="lazy" className="aspect-[16/9] w-full rounded-2xl object-cover" />
            <div className="absolute -bottom-4 right-0"><FloatCard icon={UsersRound} title="Collaborative." text="Creative. Impact Driven." /></div>
          </div>
        </div>
      </section>

      <section className="pb-12 pt-4">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[1fr_0.9fr_1fr]">
          <div>
            <LineEyebrow>Our global impact</LineEyebrow>
            <h2 className="mt-2 text-3xl font-extrabold">Creating Opportunities Across Africa and Beyond.</h2>
            <p className="mt-4 text-muted-foreground">Through our products and services, we are helping individuals, businesses, and communities access better opportunities, improve productivity, and build a brighter future.</p>
            <div className="mt-6"><Btn to="/clients">See Our Impact</Btn></div>
          </div>
          <img src={africa} alt="Map of Africa showing our reach" width={816} height={816} loading="lazy" className="mx-auto w-full max-w-xs" />
          <ul className="space-y-5">
            {([[Users, "Empowering Individuals", "through education, access, and skills.", "green"], [Building2, "Supporting Businesses", "with innovative digital tools.", "purple"], [Globe2, "Connecting Communities", "across Africa and beyond.", "blue"], [BarChart3, "Driving Sustainable Growth", "for a stronger, inclusive future.", "orange"]] as const).map(([I, t, d, tone]) => (
              <li key={t} className="flex items-center gap-4"><IconBubble icon={I} tone={tone} /><div><p className="text-sm font-bold text-navy">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div></li>
            ))}
          </ul>
        </div>
      </section>
      <div className="pb-10"><BlueCta eyebrow="Let's build together" title="Partner with Us for a Smarter Tomorrow." text="Whether you're a business, institution, or individual, we're ready to help you achieve more with technology." /></div>
    </>
  );
}
