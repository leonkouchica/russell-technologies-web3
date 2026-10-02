import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import heroImg from "@/assets/blog-hero.jpg";
import { posts } from "@/lib/site-data";
import { CtaBand, PostCard, meta } from "@/components/site/blocks";

export const Route = createFileRoute("/blog/")({
  head: () => meta("Blog & Insights — Russell Technologies", "Articles on digital transformation, education, legal tech, agriculture, AI and automation."),
  component: Blog,
});

function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(posts.map((p) => p.category))];
  const featured = posts[0]!;
  const list = useMemo(
    () => posts.filter((p) => (cat === "All" || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase())),
    [q, cat],
  );
  return (
    <>
      <section className="bg-surface">
        <div className="container-x py-14 text-center lg:py-20">
          <p className="eyebrow">Blog & insights</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Ideas for a <span className="text-primary">digital</span> future</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Insights, stories and practical guides from our team.</p>
          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="blog-search" className="sr-only">Search articles</label>
            <input id="blog-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="w-full rounded-xl border border-input bg-background py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
      </section>
      <section className="section-y">
        <div className="container-x">
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:grid-cols-2">
            <img src={heroImg} alt="" width={1408} height={768} className="aspect-[16/10] h-full w-full object-cover" />
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="eyebrow text-orange">Featured</span>
              <h2 className="mt-3 text-2xl font-extrabold group-hover:text-primary md:text-3xl">{featured.title}</h2>
              <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">Read article <ArrowRight className="size-4" /></span>
            </div>
          </Link>
          <div className="mt-12 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-navy hover:bg-accent"}`}>{c}</button>
            ))}
          </div>
          {list.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PostCard key={p.slug} p={p} />)}</div>
          ) : (
            <p className="mt-12 rounded-2xl bg-surface p-10 text-center text-muted-foreground">No articles match your search.</p>
          )}
        </div>
      </section>
      <CtaBand title="Get insights in your inbox" text="Subscribe to our newsletter in the footer, or talk to us about your project." />
    </>
  );
}
