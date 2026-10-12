import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { HeaderTools } from "./HeaderTools";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { products, services } from "@/lib/site-data";

const linkCls = "text-sm font-semibold text-foreground/80 hover:text-primary transition-colors";
const activeCls = { className: "text-primary" };

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-x flex h-18 items-center justify-between gap-6 py-3">
        <Link to="/" className="shrink-0" aria-label="Russell Technologies home">
          <img src={logo} alt="Russell Technologies" width={115} height={40} className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          <Link to="/" className={linkCls} activeProps={activeCls} activeOptions={{ exact: true }}>Home</Link>
          <Dropdown label="Services" to="/services" items={services.map((s) => ({ to: "/services/$slug", params: { slug: s.slug }, label: s.title }))} />
          <Dropdown label="Products" to="/products" items={products.map((p) => ({ to: "/products/$slug", params: { slug: p.slug }, label: p.name }))} />
          <Dropdown label="Company" to="/about" items={[{ to: "/about", label: "About Us" }, { to: "/clients", label: "Clients" }, { to: "/events", label: "Events" }]} />
          <Link to="/blog" className={linkCls} activeProps={activeCls}>Blog</Link>
          <Link to="/contact" className={linkCls} activeProps={activeCls}>Contact</Link>
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <HeaderTools />
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Book a Demo <ArrowRight className="size-4" />
          </Link>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0 text-navy lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile navigation" className="container-x flex flex-col gap-1 py-4" onClick={() => setOpen(false)}>
            {([["/", "Home"], ["/services", "Services"], ["/products", "Products"], ["/about", "About"], ["/clients", "Clients"], ["/events", "Events"], ["/blog", "Blog"], ["/contact", "Contact"]] as const).map(([to, l]) => (
              <Link key={to} to={to} className="rounded-md px-3 py-2.5 font-semibold text-navy hover:bg-muted">{l}</Link>
            ))}
            <div className="grid grid-cols-2 gap-1 border-y border-border py-2">
              {products.map((p) => <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="rounded-md px-3 py-2.5 text-sm font-semibold text-navy hover:bg-muted">{p.name}</Link>)}
            </div>
            <Link to="/contact" className="mt-2 rounded-lg bg-primary px-5 py-3 text-center font-semibold text-primary-foreground">Book a Demo</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

type Item = { to: "/services/$slug" | "/products/$slug" | "/about" | "/clients" | "/events"; params?: { slug: string }; label: string };
function Dropdown({ label, to, items }: { label: string; to: "/services" | "/products" | "/about"; items: Item[] }) {
  return (
    <div className="group relative">
      <Link to={to} className={`${linkCls} inline-flex items-center gap-1`} activeProps={activeCls}>
        {label} <ChevronDown className="size-4 transition group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="w-56 rounded-xl border border-border bg-popover p-2 shadow-card">
          {items.map((i) => (
            <Link key={i.label} to={i.to} params={i.params as never} className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground">{i.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
