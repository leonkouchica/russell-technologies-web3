import { Link, useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.webp";
import { useState } from "react";
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import { products, services } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

const col = "text-sm text-navy-foreground/65 hover:text-navy-foreground";

export function Footer() {
  const [email, setEmail] = useState("");
  // Home design shows a compact footer; every other page shows the brand column + back-to-top.
  const isHome = useLocation({ select: (l) => l.pathname === "/" });
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className={`container-x grid gap-10 py-14 sm:grid-cols-2 ${isHome ? "lg:grid-cols-[1fr_1fr_1fr_1fr_1.8fr]" : "lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_0.8fr_1.8fr]"}`}>
        {!isHome && (
          <div>
            <img src={logo} alt="Russell Technologies" width={115} height={40} loading="lazy" className="h-10 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-[12rem] text-sm text-navy-foreground/65">Building digital systems for a smarter tomorrow.</p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((I, i) => <span key={i} aria-label={`${["Facebook", "Instagram", "X", "LinkedIn", "YouTube"][i]} unavailable`} title="Official profile not provided" className="grid size-7 place-items-center rounded-full bg-navy-foreground/10 text-navy-foreground/65"><I className="size-3.5" /></span>)}
            </div>
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-navy-foreground">Services</h3>
          <ul className="mt-4 space-y-2.5">{services.map((s) => <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className={col}>{s.title}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy-foreground">Products</h3>
          <ul className="mt-4 space-y-2.5">{products.map((p) => <li key={p.slug}><Link to="/products/$slug" params={{ slug: p.slug }} className={`${col} uppercase`}>{p.name}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy-foreground">Company</h3>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/about" className={col}>About</Link></li>
            <li><Link to="/clients" className={col}>Clients</Link></li>
            <li><Link to="/events" className={col}>Events</Link></li>
            <li><Link to="/blog" className={col}>Blog</Link></li>
            <li><Link to="/contact" className={col}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy-foreground">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/terms-of-service" className={col}>Terms of Service</Link></li>
            <li><Link to="/privacy-policy" className={col}>Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy-foreground">Subscribe to our newsletter</h3>
          <p className="mt-3 text-sm text-navy-foreground/65">Insights on digital products, automation, AI, and technology execution — delivered occasionally.</p>
          <form
            className="mt-5 flex flex-wrap gap-2"
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
            <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="min-w-0 basis-36 flex-1 rounded-lg border border-navy-foreground/10 bg-navy-soft px-4 py-2.5 text-sm text-navy-foreground placeholder:text-navy-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary" />
            <Button type="submit" className="h-auto shrink-0 px-5 py-2.5 font-semibold">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Russell Technologies. All rights reserved.</p>
          {isHome ? (
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((I, i) => <span key={i} title="Official profile not provided" className="text-navy-foreground/65"><I className="size-4" /></span>)}
            </div>
          ) : (
            <Button variant="ghost" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })} className="h-auto px-0 text-xs hover:bg-transparent hover:text-navy-foreground">Back to top <ArrowUp className="size-3.5" /></Button>
          )}
        </div>
      </div>
    </footer>
  );
}
