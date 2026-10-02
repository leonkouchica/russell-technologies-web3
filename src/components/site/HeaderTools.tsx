import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { posts, products, services } from "@/lib/site-data";

type Hit = { label: string; kind: string; to: string; params?: { slug: string } };

const pages: Hit[] = [
  { label: "Home", kind: "Page", to: "/" },
  { label: "About Us", kind: "Page", to: "/about" },
  { label: "Clients", kind: "Page", to: "/clients" },
  { label: "Blog", kind: "Page", to: "/blog" },
  { label: "Contact", kind: "Page", to: "/contact" },
  ...services.map((s) => ({ label: s.title, kind: "Service", to: "/services/$slug", params: { slug: s.slug } })),
  ...products.map((p) => ({ label: p.name, kind: "Product", to: "/products/$slug", params: { slug: p.slug } })),
  ...posts.map((p) => ({ label: p.title, kind: "Article", to: "/blog/$slug", params: { slug: p.slug } })),
];

/** Search popover + light/dark switch shown beside "Book a Demo". */
export function HeaderTools() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [dark, setDark] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDark(localStorage.getItem("rt-theme") === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  const hits = q.trim() ? pages.filter((p) => p.label.toLowerCase().includes(q.toLowerCase())).slice(0, 7) : pages.slice(0, 5);

  return (
    <div className="flex items-center gap-3" ref={box}>
      <div className="relative">
        <button onClick={() => setOpen(!open)} aria-label="Search the site" aria-expanded={open} className="grid size-9 place-items-center rounded-full text-navy hover:bg-muted">
          <Search className="size-4" />
        </button>
        {open && (
          <div className="absolute right-0 top-full z-50 mt-3 w-80 rounded-xl border border-border bg-popover p-3 shadow-card">
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pages, products, articles…" aria-label="Search" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <ul className="mt-2 max-h-72 overflow-auto">
              {hits.length === 0 && <li className="px-3 py-2 text-sm text-muted-foreground">No results</li>}
              {hits.map((h) => (
                <li key={h.kind + h.label}>
                  <Link to={h.to as never} params={h.params as never} onClick={() => setOpen(false)} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
                    <span className="line-clamp-1 font-medium text-foreground">{h.label}</span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{h.kind}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={() => { const d = !dark; setDark(d); localStorage.setItem("rt-theme", d ? "dark" : "light"); }}
        role="switch"
        aria-checked={dark}
        aria-label="Dark mode"
        className="relative flex h-7 w-12 items-center rounded-full bg-blue-soft px-1"
      >
        <span className={`grid size-5 place-items-center rounded-full bg-card text-primary ring-[3px] ring-primary transition-transform ${dark ? "translate-x-5" : ""}`}>
          {dark ? <Moon className="size-2.5" /> : <Sun className="size-2.5" />}
        </span>
        <span className={`absolute size-1 rounded-full bg-primary ${dark ? "left-2" : "right-2"}`} />
      </button>
    </div>
  );
}
