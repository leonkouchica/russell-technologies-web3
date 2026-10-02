import { Link, useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import { products, services } from "@/lib/site-data";

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
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((I, i) => <a key={i} href="#" aria-label="Social link" className="grid size-7 place-items-center rounded-full bg-navy-foreground/10 text-navy-foreground hover:bg-primary"><I className="size-3.5" /></a>)}
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
            <li><Link to="/blog" className={col}>Blog</Link></li>
            <li><Link to="/contact" className={col}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy-foreground">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/65"><li>Terms of Service</li><li>Privacy Policy</li></ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy-foreground">Subscribe to our newsletter</h3>
          <p className="mt-3 text-sm text-navy-foreground/65">Insights on digital products, automation, AI, and technology execution — delivered occasionally.</p>
          <form
            className="mt-5 flex gap-2"
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
            <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="min-w-0 flex-1 rounded-lg border border-navy-foreground/10 bg-navy-soft px-4 py-2.5 text-sm text-navy-foreground placeholder:text-navy-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Russell Technologies. All rights reserved.</p>
          {isHome ? (
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((I, i) => <a key={i} href="#" aria-label="Social link" className="text-navy-foreground/80 hover:text-navy-foreground"><I className="size-4" /></a>)}
            </div>
          ) : (
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-1.5 hover:text-navy-foreground">Back to top <ArrowUp className="size-3.5" /></button>
          )}
        </div>
      </div>
    </footer>
  );
}
