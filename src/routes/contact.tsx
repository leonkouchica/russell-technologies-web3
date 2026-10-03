import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Building2, Clock, Mail, MapPin, MessagesSquare, Phone, UsersRound } from "lucide-react";
import heroImg from "@/assets/contact-agent.jpg";
import { contact } from "@/lib/site-data";
import { meta } from "@/components/site/blocks";
import { BlueCta, Btn, FloatCard, IconBubble, LineEyebrow, SplitHero } from "@/components/site/kit";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact Us — Russell Technologies", "Talk to Russell Technologies about a project, product demo or partnership. Our team responds within 24 hours."),
  component: Contact,
});

const schema = z.object({
  first: z.string().trim().min(1, "Enter your first name").max(60),
  last: z.string().trim().min(1, "Enter your last name").max(60),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  org: z.string().trim().max(120).optional(),
  interest: z.string().optional(),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
});

const faqs = [
  ["How can I request a demo for your products?", "Click “Book a Demo” anywhere on the site or send us a message — we'll schedule a walkthrough within two working days."],
  ["Do you work with schools and businesses outside Nigeria?", "Yes. We work with clients across Africa and beyond, and support remote onboarding."],
  ["What services does Russell Technologies offer?", "Web development, mobile applications, automation and AI solutions, plus our EDUPRO, RUSSELL LAW, BLUEFLAME and FARMSPOTS products."],
  ["How long does it take to get started?", "Most product setups go live in 1–3 weeks. Custom projects start with a discovery call and a clear timeline."],
  ["Can I get technical support after implementation?", "Yes — every project includes ongoing support, training and maintenance options."],
] as const;

const field = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  return (
    <>
      <SplitHero
        eyebrow="Contact us" title="Let's Build Something Greater" accent="Together." image={heroImg} imageAlt="Russell Technologies support agent"
        text="Have a question, a project in mind, or want to learn more about our products and services? We'd love to hear from you. Our team is ready to help."
        actions={<><Btn to="/contact">Book a Demo</Btn><a href="#message" className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-blue-soft">Talk to Our Team <ArrowRight className="size-4" /></a></>}
        card={<FloatCard icon={UsersRound} title="We're Here to Help" text="Our team typically responds within 24 hours." />}
      />

      <section className="py-10">
        <div className="container-x">
          <LineEyebrow>Get in touch</LineEyebrow>
          <h2 className="mt-2 text-3xl font-extrabold">Choose the Best Way to Reach Us.</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {([[Mail, "Email Us", contact.email, "We'll respond within 24 hours.", "blue", `mailto:${contact.email}`], [Phone, "Call Us", contact.phone, contact.hours, "green", `tel:${contact.phone.replace(/\s/g, "")}`], [MessagesSquare, "Send a Message", "", "Use the contact form below and our team will get back to you.", "purple", "#message"], [Building2, "Visit Our Office", contact.city, "Let's discuss how we can work together.", "orange", "#office"]] as const).map(([I, t, v, d, tone, href]) => (
              <a key={t} href={href} className="rounded-xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5">
                <IconBubble icon={I} tone={tone} /><h3 className="mt-3 font-bold">{t}</h3>{v && <p className="text-sm font-semibold text-primary">{v}</p>}<p className="text-sm text-muted-foreground">{d}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-surface lg:grid-cols-[1.4fr_1fr]">
        <div id="message" className="px-5 py-10 md:px-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-10">
          <LineEyebrow>Send us a message</LineEyebrow>
          <h2 className="mt-2 text-3xl font-extrabold">Tell Us About Your Project.</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fill out the form below and our team will get back to you as soon as possible.</p>
          <form
            noValidate
            className="mt-6 grid gap-4 sm:grid-cols-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = Object.fromEntries(new FormData(e.currentTarget));
              const r = schema.safeParse(fd);
              if (!r.success) { const m: Record<string, string> = {}; r.error.issues.forEach((i) => { m[String(i.path[0])] = i.message; }); setErrors(m); return; }
              setErrors({}); setSending(true);
              await new Promise((res) => setTimeout(res, 600));
              setSending(false); e.currentTarget?.reset?.();
              toast.success("Thanks! Your message has been received — we'll reply within 24 hours.");
            }}
          >
            {([["first", "First Name", "John", true], ["last", "Last Name", "Doe", true], ["email", "Email Address", "john@company.com", true]] as const).map(([n, l, ph, req]) => (
              <div key={n}><label htmlFor={n} className="text-xs font-semibold text-navy">{l}{req && <span className="text-destructive"> *</span>}</label><input id={n} name={n} type={n === "email" ? "email" : "text"} placeholder={ph} className={`mt-1.5 ${field}`} aria-invalid={!!errors[n]} />{errors[n] && <p className="mt-1 text-xs text-destructive">{errors[n]}</p>}</div>
            ))}
            <div><label htmlFor="phone" className="text-xs font-semibold text-navy">Phone Number</label><div className="mt-1.5 flex"><span className="flex items-center rounded-l-md border border-r-0 border-input bg-background px-2 text-sm" aria-hidden>🇳🇬</span><input id="phone" name="phone" type="tel" placeholder="+234 812 345 6789" className={`${field} rounded-l-none`} /></div></div>
            <div><label htmlFor="org" className="text-xs font-semibold text-navy">Organization / Company</label><input id="org" name="org" placeholder="Your company name" className={`mt-1.5 ${field}`} /></div>
            <div><label htmlFor="interest" className="text-xs font-semibold text-navy">What are you interested in?</label>
              <select id="interest" name="interest" defaultValue="" className={`mt-1.5 ${field}`}><option value="" disabled>Select an option</option>{["Web Development", "Mobile Applications", "Automation", "AI Solutions", "EDUPRO", "RUSSELL LAW", "BLUEFLAME", "FARMSPOTS", "Other"].map((o) => <option key={o}>{o}</option>)}</select></div>
            <div className="sm:col-span-2"><label htmlFor="message-f" className="text-xs font-semibold text-navy">Your Message<span className="text-destructive"> *</span></label><textarea id="message-f" name="message" rows={5} placeholder="Tell us about your project, questions, or how we can help..." className={`mt-1.5 ${field}`} aria-invalid={!!errors["message"]} />{errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}</div>
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <button disabled={sending} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">{sending ? "Sending…" : "Send Message"} <ArrowRight className="size-4" /></button>
              <p className="text-[11px] text-muted-foreground">By submitting this form, you agree to our <span className="font-semibold text-navy">Privacy Policy</span>. We'll never share your information with third parties.</p>
            </div>
          </form>
        </div>
        <div id="office" className="bg-navy px-5 py-10 md:px-8 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <LineEyebrow tone="orange">Our offices</LineEyebrow>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-foreground">We're Located in Lagos, Nigeria.</h2>
          <p className="mt-3 text-sm text-navy-foreground/75">Visit our office or get in touch through any of the channels below. We look forward to working with you.</p>
          <div className="mt-5 overflow-hidden rounded-xl">
            <iframe title="Russell Technologies office map" src="https://www.openstreetmap.org/export/embed.html?bbox=3.43%2C6.42%2C3.49%2C6.46&layer=mapnik&marker=6.4400%2C3.4600" className="h-48 w-full border-0" loading="lazy" />
          </div>
          <div className="mt-6 flex gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><MapPin className="size-5" /></div><div><h3 className="font-bold text-navy-foreground">Head Office</h3><p className="text-xs text-navy-foreground/75">Russell Technologies<br />{contact.address}</p></div></div>
          <div className="mt-6 grid grid-cols-1 gap-4 text-xs text-navy-foreground/80 sm:grid-cols-3">
            <div><Phone className="size-4 text-primary" /><p className="mt-1 font-bold text-navy-foreground">Phone</p>{contact.phone}</div>
            <div><Mail className="size-4 text-primary" /><p className="mt-1 font-bold text-navy-foreground">Email</p>{contact.email}</div>
            <div><Clock className="size-4 text-orange" /><p className="mt-1 font-bold text-navy-foreground">Working Hours</p>{contact.hours}</div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-x grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-3"><div><LineEyebrow>Frequently asked questions</LineEyebrow><h2 className="mt-2 text-3xl font-extrabold">Quick Answers to Common Questions.</h2></div></div>
            <Accordion type="single" collapsible className="mt-5 space-y-2">
              {faqs.map(([q, a]) => (
                <AccordionItem key={q} value={q} className="rounded-lg border border-border bg-card px-4 shadow-card">
                  <AccordionTrigger className="text-sm font-semibold text-navy hover:no-underline">{q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-surface p-8 text-center">
            <div className="relative h-20 w-28"><div className="absolute left-0 top-0 grid h-14 w-20 place-items-center rounded-xl bg-primary text-primary-foreground"><MessagesSquare className="size-7" /></div><div className="absolute bottom-0 right-0 h-12 w-16 rounded-xl bg-orange" /></div>
            <h3 className="mt-5 text-xl font-extrabold">Still Have Questions?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Our team is here to help. Reach out to us and we'll get back to you as soon as possible.</p>
            <Link to="/contact" hash="message" className="mt-5 inline-flex items-center gap-2 rounded-md border border-primary/60 px-6 py-2.5 text-sm font-semibold text-primary hover:bg-blue-soft">Talk to Our Team <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>
      <div className="pb-10"><BlueCta eyebrow="Let's work together" title="Ready to Transform Your Organization?" text="Whether you're a school, business, or institution, we're ready to help you achieve more with technology." /></div>
    </>
  );
}
