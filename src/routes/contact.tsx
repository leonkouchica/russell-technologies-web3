import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import heroImg from "@/assets/contact-hero.jpg";
import { contact, products, services } from "@/lib/site-data";
import { PageHero, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact Us — Russell Technologies", "Book a demo or talk to our team about your web, mobile, automation or AI project."),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  interest: z.string().min(1, "Please choose a topic"),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});

const field = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact us" title={<>Let's build something <span className="text-primary">great</span> together</>} text="Tell us about your project or book a free product demo. We usually reply within one business day." image={heroImg} />
      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4">
            {([[Mail, "Email", contact.email], [Phone, "Phone", contact.phone], [MapPin, "Office", contact.address], [Clock, "Hours", contact.hours]] as const).map(([Icon, t, v]) => (
              <div key={t} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-soft text-primary"><Icon className="size-5" /></div>
                <div className="min-w-0"><p className="text-sm text-muted-foreground">{t}</p><p className="truncate font-bold text-navy">{v}</p></div>
              </div>
            ))}
          </div>
          <form
            noValidate
            className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = Object.fromEntries(new FormData(e.currentTarget));
              const r = schema.safeParse(fd);
              if (!r.success) {
                setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
                return;
              }
              setErrors({});
              setSending(true);
              const form = e.currentTarget;
              setTimeout(() => { setSending(false); form.reset(); toast.success("Thanks! We'll be in touch shortly."); }, 700);
            }}
          >
            <h2 className="text-2xl font-extrabold">Send us a message</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" error={errors.name}><input id="name" name="name" className={field} /></Field>
              <Field label="Email" name="email" error={errors.email}><input id="email" name="email" type="email" className={field} /></Field>
              <Field label="Phone (optional)" name="phone"><input id="phone" name="phone" className={field} /></Field>
              <Field label="I'm interested in" name="interest" error={errors.interest}>
                <select id="interest" name="interest" defaultValue="" className={field}>
                  <option value="" disabled>Select a topic</option>
                  {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                  {products.map((p) => <option key={p.slug}>{p.name} demo</option>)}
                  <option>Other</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message" name="message" error={errors.message}><textarea id="message" name="message" rows={5} className={field} /></Field>
              </div>
            </div>
            <button disabled={sending} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
              <Send className="size-4" />{sending ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
