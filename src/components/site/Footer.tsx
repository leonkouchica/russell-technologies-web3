import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { contact, products, services } from "@/lib/site-data";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="inline-block rounded-lg bg-background px-3 py-2">
            <img src={logo} alt="Russell Technologies" width={108} height={40} loading="lazy" className="h-9 w-auto" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-foreground/70">
            We build digital products and solutions that help organizations work smarter and grow faster.
          </p>
          <form
            className="mt-6 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                toast.error("Please enter a valid email address.");
                return;
              }
              toast.success("Thanks for subscribing!");
              setEmail("");
            }}
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="min-w-0 flex-1 rounded-lg border border-navy-foreground/15 bg-navy-soft px-4 py-2.5 text-sm text-navy-foreground placeholder:text-navy-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Subscribe</button>
          </form>
        </div>
        <FooterCol title="Services" base="/services/$slug" links={services.map((s) => [s.slug, s.title] as [string, string])} />
        <FooterCol title="Products" base="/products/$slug" links={products.map((p) => [p.slug, p.name] as [string, string])} />
        <div>
          <h3 className="text-sm font-bold text-navy-foreground">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/70">
            <li className="flex gap-2"><Mail className="size-4 shrink-0 text-orange" />{contact.email}</li>
            <li className="flex gap-2"><Phone className="size-4 shrink-0 text-orange" />{contact.phone}</li>
            <li className="flex gap-2"><MapPin className="size-4 shrink-0 text-orange" />{contact.address}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[Facebook, Linkedin, Twitter, Instagram].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid size-9 place-items-center rounded-full bg-navy-soft hover:bg-primary"><I className="size-4" /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Russell Technologies. All rights reserved.</p>
          <div className="flex gap-5"><Link to="/about">About</Link><Link to="/blog">Blog</Link><Link to="/contact">Contact</Link></div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, base, links }: { title: string; base: "/services/$slug" | "/products/$slug"; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-navy-foreground">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-navy-foreground/70">
        {links.map(([to, l]) => (
          <li key={to}><Link to={base} params={{ slug: to }} className="hover:text-navy-foreground">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}
